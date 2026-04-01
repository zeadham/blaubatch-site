import asyncio
from playwright.async_api import async_playwright
import os

async def scrape_linkedin_profile(profile_url: str):
    """
    Automates a browser to navigate to a LinkedIn profile,
    handles initial login if needed, and safely extracts data.
    """
    # Path to store the browser profile/session cookies
    user_data_dir = os.path.join(os.getcwd(), 'browser_data')
    
    # Optional dictionary to hold whatever we find
    profile_data = {"url": profile_url}

    print("\n[Action Layer] Launching browser...")
    
    async with async_playwright() as p:
        # Launching persistent context means it remembers cookies.
        # Headless=False lets you see the browser window.
        browser = await p.chromium.launch_persistent_context(
            user_data_dir=user_data_dir,
            headless=False,
            # Arguments to seem less like a bot
            args=["--disable-blink-features=AutomationControlled"]
        )
        
        page = await browser.new_page()
        
        print("[Action Layer] Checking login status...")
        await page.goto("https://www.linkedin.com/", wait_until="domcontentloaded")
        
        # Short wait to let the page redirect if already logged in
        await asyncio.sleep(3)
        
        # If the URL hasn't changed to feed, we probably need to log in
        if "feed" not in page.url and "inbox" not in page.url:
            print("\n*** LOGIN REQUIRED ***")
            print("You are not logged in yet.")
            print("Please log into LinkedIn in the browser window now...")
            print("You have 90 seconds to enter your credentials and pass 2FA if needed.")
            print("**********************\n")
            
            await page.goto("https://www.linkedin.com/login", wait_until="domcontentloaded")
            
            # Wait for the user to manually log in
            try:
                # We wait until the feed page loads to know login was successful
                await page.wait_for_url("**/feed/**", timeout=90000)
                print("[Action Layer] Login successful! Session saved for future runs.")
            except Exception as e:
                print("[Action Layer] Did not detect successful login within 90 seconds.")
                print("[Action Layer] Continuing anyway, but scraping will likely fail.")
        else:
            print("[Action Layer] Already logged in. Using saved session.")
            
        print(f"[Action Layer] Navigating to target: {profile_url}")
        
        # Human-like delay before visiting the profile
        await asyncio.sleep(2)
        await page.goto(profile_url, wait_until="networkidle")
        
        # Give the profile page extra time to load dynamic elements
        print("[Action Layer] Reading profile...")
        await asyncio.sleep(4)
        
        # --- Extractor ---
        # Note: LinkedIn changes these class names occasionally. 
        # Using try-except blocks ensures the script doesn't crash if an element is missing.
        
        # Extract Full Name
        try:
            name_element = page.locator("h1.text-heading-xlarge").first
            profile_data["name"] = await name_element.text_content(timeout=3000)
        except:
            profile_data["name"] = "Name not found"
            
        # Extract Headline
        try:
            headline_element = page.locator("div.text-body-medium.break-words").first
            profile_data["headline"] = await headline_element.text_content(timeout=3000)
        except:
            profile_data["headline"] = "Headline not found"
            
        # Clean up the scraped text (remove extra whitespace/newlines)
        profile_data = {k: str(v).strip().replace('\n', ' ') for k, v in profile_data.items()}

        print("\n--- Raw Scraped Data ---")
        for key, value in profile_data.items():
            print(f"> {key.capitalize()}: {value}")
        print("------------------------\n")
        
        await browser.close()
        return profile_data

if __name__ == "__main__":
    # Test block to run the scraper by itself
    # Replace this with any public valid LinkedIn profile you want to test on
    test_url = "https://www.linkedin.com/in/williamhgates" 
    asyncio.run(scrape_linkedin_profile(test_url))
