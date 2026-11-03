from backend import database


def test_normalize_profile_url():
    assert (
        database.normalize_profile_url("linkedin.com/in/Jane-Doe?trk=abc")
        == "https://www.linkedin.com/in/jane-doe/"
    )
    assert (
        database.normalize_profile_url("https://www.linkedin.com/in/jane-doe/details/experience/")
        == "https://www.linkedin.com/in/jane-doe/"
    )
    assert database.normalize_profile_url("https://example.com/jane") is None
    assert database.normalize_profile_url("https://www.linkedin.com/in/") is None


def test_add_leads_skips_duplicates_and_invalid():
    result = database.add_leads([
        "https://www.linkedin.com/in/jane-doe/",
        "https://linkedin.com/in/JANE-DOE",
        "not a url",
        "",
    ])
    assert result == {"added": 1, "duplicates": 1, "invalid": ["not a url"]}


def test_analytics_counts_each_status():
    database.add_leads([f"https://www.linkedin.com/in/lead-{i}" for i in range(5)])
    leads = database.get_leads_by_status("pending")
    database.mark_sent(leads[0]["id"])
    database.mark_sent(leads[1]["id"])
    database.mark_accepted(leads[1]["id"])
    database.mark_sent(leads[2]["id"])
    database.mark_replied(leads[2]["id"], "Thanks for reaching out!")
    database.mark_failed(leads[3]["id"], "No Connect button")

    assert database.get_analytics() == {
        "total": 5, "pending": 1, "sent": 1, "accepted": 1, "replied": 1, "emailed": 0,
    }


def test_analytics_on_empty_database_returns_zeros():
    assert database.get_analytics() == {
        "total": 0, "pending": 0, "sent": 0, "accepted": 0, "replied": 0, "emailed": 0,
    }


def test_status_transitions_are_guarded():
    database.add_leads(["https://www.linkedin.com/in/jane-doe"])
    lead_id = database.list_leads()[0]["id"]

    # A pending lead cannot be accepted or reply: we never contacted them.
    assert database.mark_accepted(lead_id) is False
    assert database.mark_replied(lead_id, "hi") is False

    database.mark_sent(lead_id)
    assert database.mark_replied(lead_id, "Hello!") is True
    # Seeing the same reply again is not a change.
    assert database.mark_replied(lead_id, "Hello!") is False
    # A newer reply replaces the old one.
    assert database.mark_replied(lead_id, "Are you free Tuesday?") is True

    lead = database.list_leads()[0]
    assert lead["status"] == "replied"
    assert lead["reply_text"] == "Are you free Tuesday?"
    assert lead["accepted_at"] is not None


def test_retry_failed_requeues_leads():
    database.add_leads(["https://www.linkedin.com/in/jane-doe"])
    lead_id = database.list_leads()[0]["id"]
    database.mark_failed(lead_id, "boom")

    assert database.retry_failed() == 1
    lead = database.list_leads()[0]
    assert lead["status"] == "pending"
    assert lead["error"] is None
