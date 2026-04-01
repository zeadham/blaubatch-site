import asyncio
import os
from dotenv import load_dotenv
from google import genai
from poster import create_linkedin_post

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

def brainstorm_post(topic: str) -> str:
    print("\n[Brain Layer] Thinking about a great post for this topic...")
    
    prompt = f"""
    You are an expert LinkedIn ghostwriter. Your goal is to write a highly engaging, professional LinkedIn post about the following topic.
    
    TOPIC: "{topic}"
    
    Guidelines:
    1. Hook the reader immediately in the first line.
    2. Keep sentences short and punchy. Use spacing to make it readable.
    3. NO cheap clickbait or robotic 'AI' words like 'transformative', 'navigating the landscape', or 'delve'.
    4. Include 2-3 relevant emojis.
    5. End with an engaging question to drive comments.
    6. Include 3-4 hashtags at the very bottom.
    
    Output ONLY the exact text of the post. No intro/outro commentary.
    """
    
    try:
        response = client.models.generate_content(
            model='gemini-2.5-flash',
            contents=prompt,
        )
        return response.text.strip()
    except Exception as e:
        return f"API ERROR: {e}"

async def run_content_engine():
    print("==================================================")
    print("      Starting the LinkedIn Content Engine        ")
    print("==================================================\n")
    
    print("What do you want to post about today?")
    print("Example: '3 lessons I learned from building my startup' or 'Why Python is better than Java'")
    topic = input("Enter topic: ").strip()
    
    if not topic:
        print("You must enter a topic!")
        return
        
    # Generate the draft
    post_text = brainstorm_post(topic)
    
    print("\n------------------ DRAFT ------------------")
    print(post_text)
    print("-------------------------------------------\n")
    
    print("If you don't like it, press Ctrl+C to cancel.")
    print("Otherwise, I will open the browser and type this out for you!")
    input("Press ENTER to proceed to the browser...")
    
    # Send it to Playwright to type out
    await create_linkedin_post(post_text)

if __name__ == "__main__":
    try:
        asyncio.run(run_content_engine())
    except KeyboardInterrupt:
        print("\nContent Engine cancelled.")
