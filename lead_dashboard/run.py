"""Start the dashboard: `python run.py`, then open http://127.0.0.1:8000

Auto-reload is deliberately off: on Windows it switches uvicorn to an event
loop that cannot launch Playwright's browser.
"""

import uvicorn

if __name__ == "__main__":
    # 127.0.0.1 keeps the dashboard (and your LinkedIn session) off the network.
    uvicorn.run("backend.main:app", host="127.0.0.1", port=8000)
