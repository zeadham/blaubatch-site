import asyncio
from playwright.async_api import async_playwright
import os

async def create_linkedin_post(post_text: str):
    user_data_dir = os.path.join(os.getcwd(), 'browser_data')
    print("\n[Action Layer] Launching browser to create a post...")

    async with async_playwright() as p:
        browser = await p.chromium.launch_persistent_context(
            user_data_dir=user_data_dir,
            headless=False,
            args=["--disable-blink-features=AutomationControlled"]
        )
        
        page = await browser.new_page()
        await page.goto("https://www.linkedin.com/feed/", wait_until="domcontentloaded")
        
        # Check login
        await asyncio.sleep(3)
        if "feed" not in page.url:
            print("\n*** LOGIN REQUIRED ***")
            print("You are not logged in yet.")
            print("Please log into LinkedIn in the browser window now...")
            print("You have 90 seconds to enter your credentials.")
            print("**********************\n")
            try:
                await page.wait_for_url("**/feed/**", timeout=90000)
            except:
                print("Could not verify login.")

        print("[Action Layer] Searching for the 'Start a post' button...")
        try:
            # Playwright is smart enough to find the button containing this exact text
            start_button = page.locator("button:has-text('Start a post')").first
            await start_button.wait_for(state="visible", timeout=10000)
            await start_button.click()
            
            print("[Action Layer] Initiating typing sequence...")
            await asyncio.sleep(2)
            
            # LinkedIn's compose box is a textbox
            editor = page.locator("div[role='textbox']").first
            await editor.wait_for(state="visible", timeout=5000)
            await editor.click()
            
            # Type the text character by character (delay=10ms)
            await page.keyboard.type(post_text, delay=10)
            
            print("\n=======================================================")
            print("                ✅ DONE TYPING!                        ")
            print("=======================================================")
            print("1. Look at the browser window to review your post.")
            print("2. Add any images or emojis you want.")
            print("3. Click the blue 'Post' button yourself!")
            print("=======================================================\n")
            
        except Exception as e:
            print(f"[Action Layer] Something changed on LinkedIn's website and I couldn't find the textbox: {e}")
            print("Please manually click 'Start a post' and paste the text.")
            
        # Keep the browser open until the user says they are done
        # Note: Since this runs in an async loop, standard input needs to be awaited or run via executor
        # We'll use a simple loop print to let them know
        print("\nPress Ctrl+C in this black window when you are done to close the browser.")
        try:
            # Keeps the script alive indefinitely until standard Ctrl+C cancellation
            while True:
                await asyncio.sleep(1)
        except asyncio.CancelledError:
            pass
        except KeyboardInterrupt:
            pass
            
        await browser.close()
