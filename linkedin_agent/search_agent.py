import asyncio
import os
import csv
import urllib.parse
from playwright.async_api import async_playwright

async def run_search_agent():
    print("==================================================")
    print("      Starting the Autonomous Search Agent        ")
    print("==================================================\n")
    
    keyword = input("Enter a search keyword (e.g., 'Founders in Seattle'): ").strip()
    
    if not keyword:
        print("Search keyword cannot be empty!")
        return

    # Create the secure LinkedIn search URL
    encoded_keyword = urllib.parse.quote(keyword)
    search_url = f"https://www.linkedin.com/search/results/people/?keywords={encoded_keyword}"
    
    user_data_dir = os.path.join(os.getcwd(), 'browser_data')
    output_file = os.path.join("data", "leads.csv")

    print(f"\n[Action Layer] Launching browser to search for: '{keyword}'...")

    async with async_playwright() as p:
        browser = await p.chromium.launch_persistent_context(
            user_data_dir=user_data_dir,
            headless=False,
            args=["--disable-blink-features=AutomationControlled"]
        )
        
        page = await browser.new_page()
        
        # Navigate and check login
        await page.goto("https://www.linkedin.com/feed/", wait_until="domcontentloaded")
        await asyncio.sleep(3)
        if "feed" not in page.url:
            print("\n*** LOGIN REQUIRED ***")
            print("Please log into LinkedIn in the browser window now...")
            print("You have 90 seconds to do this.")
            try:
                await page.wait_for_url("**/feed/**", timeout=90000)
            except:
                print("Could not verify login. Continuing anyway, but search will likely fail.")

        # Go to the actual search results page
        print("[Action Layer] Navigating to search results...")
        await page.goto(search_url, wait_until="networkidle")
        await asyncio.sleep(4)
        
        print("[Action Layer] Scrolling down slowly to trick LinkedIn into loading all profiles...")
        # Scroll in small increments so lazy-loaded links render
        for i in range(6):
            await page.evaluate("window.scrollBy(0, 600)")
            await asyncio.sleep(1.5)
            
        print("[Action Layer] Extracting target profile URLs...")
        
        # Locate all 'a' tags holding the profile links in search results
        locators = await page.locator("a.app-aware-link").all()
        
        raw_urls = []
        for loc in locators:
            href = await loc.get_attribute("href")
            if href and "linkedin.com/in/" in href:
                raw_urls.append(href)
                
        # Clean URLs (remove tracking query params) and remove duplicates
        clean_urls = set()
        for url in raw_urls:
            # Drop the tracking "?miniProfileUrn=..." part of the link
            clean_url = url.split("?")[0].strip()
            # Only add standard profiles
            if len(clean_url) > 25: 
                clean_urls.add(clean_url)
                
        # Save to CSV
        if not clean_urls:
            print("[Warning] Could not find any profile URLs. Try a different search term or check if LinkedIn threw a Captcha.")
        else:
            # We enforce a maximum of 15 leads ripped per search to protect the account
            final_list = list(clean_urls)[:15]
            
            # Ensure the data directory exists
            os.makedirs("data", exist_ok=True)
            
            with open(output_file, mode='w', encoding='utf-8', newline='') as f:
                writer = csv.DictWriter(f, fieldnames=["url"])
                writer.writeheader()
                for url in final_list: 
                    writer.writerow({"url": url})
                    
            print(f"\n==================================================")
            print(f"✅ Success! Found {len(final_list)} target leads.")
            print(f"Automatically Overwrote '{output_file}' with the new fresh list.")
            print(f"You can now instantly run 'run_bulk_agent.bat' to process them!")
            print(f"==================================================\n")
            
        await browser.close()

if __name__ == "__main__":
    try:
        asyncio.run(run_search_agent())
    except KeyboardInterrupt:
        print("\nSearch cancelled.")
