import csv
import asyncio
import os
from dotenv import load_dotenv
from google import genai
from scraper import scrape_linkedin_profile

load_dotenv()
api_key = os.environ.get("GEMINI_API_KEY")

if not api_key or api_key.startswith("AIzaSy-your"):
    print("WARNING: Please add your real Gemini API key to .env")
    exit(1)

try:
    client = genai.Client(api_key=api_key)
except Exception as e:
    print(f"Failed to initialize Gemini Client: {e}")
    exit(1)

def generate_message(profile_data: dict) -> str:
    prompt = f"""
    You are an expert at writing hyper-personalized, authentic LinkedIn connection requests.
    Keep it under 300 characters. Reference something specific from their headline.
    No robotic words like 'synergy', 'transformative', 'delve'.
    
    Name: {profile_data.get('name', 'N/A')}
    Headline: {profile_data.get('headline', 'N/A')}
    
    Output ONLY the exact message template. Do not include your own thoughts or explanations.
    """
    try:
        response = client.models.generate_content(
            model='gemini-2.5-flash',
            contents=prompt,
        )
        return response.text.replace("\n", " ").strip()
    except Exception as e:
        return f"API ERROR"

async def run_bulk_campaign():
    input_file = os.path.join("data", "leads.csv")
    output_file = os.path.join("data", "generated_campaign.csv")
    
    if not os.path.exists(input_file):
        print(f"Error: Could not find '{input_file}'. Please make sure it exists.")
        return
        
    print("==================================================")
    print("      Starting LinkedIn Bulk Lead Generator       ")
    print("==================================================\n")
    
    # Read URLs
    leads = []
    with open(input_file, mode='r', encoding='utf-8') as f:
        reader = csv.DictReader(f)
        for row in reader:
            if 'url' in row and row['url'].strip():
                leads.append(row['url'].strip())
                
    print(f"Found {len(leads)} leads to process...")
    
    results = []
    
    for i, url in enumerate(leads):
        print(f"\n[{i+1}/{len(leads)}] Processing: {url}")
        profile_info = await scrape_linkedin_profile(url)
        message = generate_message(profile_info)
        
        results.append({
            "url": url,
            "name": profile_info.get("name", "N/A"),
            "headline": profile_info.get("headline", "N/A"),
            "generated_message": message
        })
        
        # If not the last item, wait to be polite to LinkedIn servers
        if i < len(leads) - 1:
            print("[Action Layer] Waiting 5 seconds before the next lead to keep account safe...")
            await asyncio.sleep(5)
        
    # Write output to CSV
    try:
        with open(output_file, mode='w', encoding='utf-8-sig', newline='') as f:
            writer = csv.DictWriter(f, fieldnames=["url", "name", "headline", "generated_message"])
            writer.writeheader()
            for r in results:
                writer.writerow(r)
        print("\n==================================================")
        print(f"✅ Success! Processed {len(results)} leads.")
        print(f"Check the file: {output_file}")
        print("==================================================\n")
    except Exception as e:
        print(f"Failed to write output file: {e}")

if __name__ == "__main__":
    asyncio.run(run_bulk_campaign())
