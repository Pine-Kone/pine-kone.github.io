"""Adds one entry to a site data file. Run by .github/workflows/log-progress.yml.

Reads its inputs from environment variables:
  KIND   bike-ride | cpa-study | ot-reading
  VALUE  miles (bike-ride), hours (cpa-study), or chapters like "Job 4-6" (ot-reading)
  TRIP   round-trip | one-way (bike-ride only)
  DATE   YYYY-MM-DD, blank = today in Mountain Time
  NOTE   optional note
Writes a one-line commit message to /tmp/commit-message.txt.
"""
import datetime
import json
import os
import sys
from zoneinfo import ZoneInfo

RIDES = "files/bike-commute/rides.json"
HANS = "files/beast-challenge/hans.json"


def fail(msg):
    print("::error::" + msg)
    sys.exit(1)


def number(text, what):
    try:
        n = float(text)
    except (TypeError, ValueError):
        fail(f"{what} must be a number, got {text!r}")
    if n <= 0:
        fail(f"{what} must be more than 0")
    return int(n) if n.is_integer() else round(n, 2)


def entry_date(text):
    text = (text or "").strip()
    if not text:
        return datetime.datetime.now(ZoneInfo("America/Denver")).date().isoformat()
    try:
        return datetime.date.fromisoformat(text).isoformat()
    except ValueError:
        fail(f"date must look like YYYY-MM-DD, got {text!r}")


def write_rides(rides):
    # Keep rides.json's one-ride-per-line style.
    lines = ["  { " + ", ".join(f"{json.dumps(k)}: {json.dumps(v, ensure_ascii=False)}" for k, v in r.items()) + " }"
             for r in rides]
    with open(RIDES, "w", encoding="utf-8") as f:
        f.write("[\n" + ",\n".join(lines) + "\n]\n")


def challenge(data, cid):
    for c in data.get("challenges", []):
        if c.get("id") == cid:
            return c
    fail(f"no challenge with id {cid!r} in {HANS}")


def main():
    kind = os.environ.get("KIND", "").strip()
    value = os.environ.get("VALUE", "").strip()
    note = os.environ.get("NOTE", "").strip()
    date = entry_date(os.environ.get("DATE"))

    if kind == "bike-ride":
        miles = number(value, "miles")
        trip = os.environ.get("TRIP", "round-trip").strip() or "round-trip"
        if trip not in ("round-trip", "one-way"):
            fail(f"trip must be round-trip or one-way, got {trip!r}")
        with open(RIDES, encoding="utf-8") as f:
            rides = json.load(f)
        ride = {"date": date, "miles": miles, "trip-type": trip}
        if note:
            ride["note"] = note
        rides.append(ride)
        rides.sort(key=lambda r: r.get("date", ""))
        write_rides(rides)
        message = f"Log bike ride: {date} {trip} {miles} mi"

    elif kind in ("cpa-study", "ot-reading"):
        with open(HANS, encoding="utf-8") as f:
            data = json.load(f)
        c = challenge(data, kind)
        if kind == "cpa-study":
            hours = number(value, "hours")
            item = {"date": date, "value": hours}
            message = f"Log CPA study: {date} {hours} h"
        else:
            parts = [p.strip() for p in value.split(",") if p.strip()]
            if not parts:
                fail("list at least one chapter, like 'Job 4-6'")
            item = {"date": date, "read": parts[0] if len(parts) == 1 else parts}
            message = f"Log Old Testament reading: {date} {value}"
        if note:
            item["note"] = note
        c.setdefault("log", []).append(item)
        c["log"].sort(key=lambda e: e.get("date", ""))
        with open(HANS, "w", encoding="utf-8") as f:
            json.dump(data, f, indent=2, ensure_ascii=False)
            f.write("\n")

    else:
        fail(f"unknown kind {kind!r}")

    with open("/tmp/commit-message.txt", "w", encoding="utf-8") as f:
        f.write(message + "\n")
    print(message)


if __name__ == "__main__":
    main()
