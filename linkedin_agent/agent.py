import asyncio
import os
from dotenv import load_dotenv
from google import genai
from scraper import scrape_linkedin_profile

# 1. Load the hidden keys from .env file
load_dotenv()

# Ensure the user has added their actual key
api_key = os.environ.get("GEMINI_API_KEY")

if not api_key or api_key.startswith("AIzaSy-your"):
    print("WARNING: Please add your real Gemini API key to the .env file in this directory.")
    print("Get your API key (Free!) at: https://aistudio.google.com/app/apikey")
    exit(1)

# 2. Initialize the AI Brain (Gemini)
try:
    client = genai.Client(api_key=api_key)
except Exception as e:
    print(f"Failed to initialize Gemini Client: {e}")
    exit(1)

def generate_personalized_message(profile_data: dict) -> str:
    """Takes the scraped dictionary and asks Gemini to write a message."""
    print("\n[Brain Layer] Sending profile info to Gemini LLM over API...")
    
    prompt = f"""
    You are an expert at writing hyper-personalized, authentic LinkedIn connection requests.
    Your goal is to write a short, friendly, and non-salesy connection request based on the user's profile.
    
    The message must:
    1. Be under 300 characters total (absolute LinkedIn limit).
    2. Reference something specific and complimentary from their headline or role.
    3. NOT sound robotic. Do NOT use words like "synergy", "transformative", "tapestry", or "delve".
    
    Here is the profile data we scraped:
    Name: {profile_data.get('name', 'N/A')}
    Headline: {profile_data.get('headline', 'N/A')}
    
    Output ONLY what the message should be. Do not include any intro (like 'Here is the message') or your own thoughts.
    """
    
    try:
        response = client.models.generate_content(
            model='gemini-2.5-flash',
            contents=prompt,
        )
        return response.text
    except Exception as e:
        return f"Error connecting to Gemini API: {e}. Check your API key or internet."

async def main():
    print("==================================================")
    print("Welcome to your LinkedIn Agent! (Powered by Gemini)")
    print("==================================================\n")
    
    target_url = input("Enter the LinkedIn profile URL you want to engage with: ").strip()
    
    if not (target_url.startswith("http://") or target_url.startswith("https://")):
        print("Invalid URL format. Check your URL.")
        return
        
    profile_info = await scrape_linkedin_profile(target_url)
    
    message = generate_personalized_message(profile_info)
    
    print("\n=======================================================")
    print("--- Agent Output - Suggested Connection Request: ---")
    print("=======================================================")
    print(message)
    print("=======================================================\n")
    print(f"Character Count: {len(message)} / 300")
    print("\nAction Required -> Review the message above. If it looks good, manually copy it to LinkedIn to send!")

if __name__ == "__main__":
    asyncio.run(main())
