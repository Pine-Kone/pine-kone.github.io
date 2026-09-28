# Bike Commute Ride Log

`rides.json` is the ride log behind the Bike Commute Tracker page (`/hobby/bike-commute/`). Every number on that page - miles this year, all-time miles, days and legs, landmark comparisons, and the Road to the Moon - is calculated from this file. Add a ride here and the page updates itself; no HTML or JS changes needed.

> JSON files can't hold comments, so the notes live here instead.

## Logging a ride

Add one line per ride inside the `[ ]` brackets:

```json
{ "date": "2026-09-28", "miles": 5.9, "trip-type": "round-trip" }
```

| Field       | What it means |
|-------------|---------------|
| `date`      | The day of the ride, as `YYYY-MM-DD`. |
| `miles`     | The **one-way** distance of the trip. |
| `trip-type` | `"round-trip"` (there and back) or `"one-way"` (only one direction). |

## How the miles are counted

- `"round-trip"` doubles the miles: `5.9` counts as **11.8 mi** and **2 legs**.
- `"one-way"` counts the miles once: `5.9` counts as **5.9 mi** and **1 leg**.
- If `trip-type` is left off, the ride is treated as one-way.

## Examples

- Biked to work and back home: one `"round-trip"` line.
- Biked to work, got a ride home: one `"one-way"` line.
- Different route or distance on one leg (a detour, a stop on the way home): log each leg as its own `"one-way"` line with that leg's miles. Two lines on the same date is fine.

## Formatting reminders

- Every line except the last needs a comma at the end.
- Use straight double quotes (`"`), not curly quotes - watch for this when editing on a phone.
- Order doesn't matter; the page sorts rides by date.
