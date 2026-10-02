from backend.services.sync import latest_reply_from


def test_latest_reply_from_picks_newest_message_from_lead():
    messages = [
        {"sender": "Adham", "text": "Hi Jane, great to connect"},
        {"sender": "Jane  Doe", "text": "Thanks!"},
        {"sender": "Jane Doe", "text": "Happy to chat next week."},
        {"sender": "Adham", "text": "Perfect, Tuesday?"},
    ]
    assert latest_reply_from(messages, "jane doe") == "Happy to chat next week."


def test_latest_reply_from_returns_none_without_reply():
    messages = [{"sender": "Adham", "text": "Hi Jane"}]
    assert latest_reply_from(messages, "Jane Doe") is None
