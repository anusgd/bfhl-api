# BFHL API (Serverless on Vercel)

Vercel deployed link:https://vercel.com/jana15priya12-1685s-projects/bfhl-api

Implements the `/bfhl` POST endpoint per the Full‑Stack Question Paper. Returns:
- `is_success`
- `user_id` = `{full_name_ddmmyyyy}` (full name lowercase with underscores)
- `email`, `roll_number`
- `odd_numbers` (all numbers returned as **strings**)
- `even_numbers`
- `alphabets` (uppercase)
- `special_characters`
- `sum` (string)
- `concat_string` (all alphabetical characters from input, reversed, alternating caps)

> Hosting requirement and route `/bfhl` come from the spec. 

## Quick Deploy (Vercel)

1. Push this folder to a **public GitHub repo**.
2. On Vercel: **New Project → Import Git Repository**.
3. No build step needed. Ensure **Node 18** (default) and the included `vercel.json`.
4. (Optional) Set environment variables for personalization:
   - `FULL_NAME` (e.g., `nivetha nachiappan`)
   - `DOB_DDMMYYYY` (e.g., `01011999`)
   - `EMAIL`, `ROLL_NUMBER`
5. Once deployed, the endpoint will be:
   - `https://<your-vercel-app>.vercel.app/bfhl`

## Request

```json
{ "data": ["a","1","334","4","R","$"] }
```

## Response (example)

```json
{
  "is_success": true,
  "user_id": "john_doe_17091999",
  "email": "john@xyz.com",
  "roll_number": "ABCD123",
  "odd_numbers": ["1"],
  "even_numbers": ["334","4"],
  "alphabets": ["A","R"],
  "special_characters": ["$"],
  "sum": "339",
  "concat_string": "Ra"
}
```

## cURL

```bash
curl -X POST https://<your-vercel-app>.vercel.app/bfhl   -H "Content-Type: application/json"   -d '{"data":["2","a","y","4","&","-","*","5","92","b"]}'
```
