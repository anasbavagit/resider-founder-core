

## Shorten the Founder Alignment Request Form

**Current state:** The form has 10 fields across 7 rows — that's a lot of friction for a founder just trying to book a call. Many of these details (industry, stage, UAE status, description) can be gathered during the actual alignment call.

### Proposed Streamlined Form

**Keep (4 fields, 2 rows):**
1. **Full Name** * — required
2. **Email** * — required  
3. **Phone / WhatsApp** — optional, but useful for quick contact
4. **Support needed** — the 6 execution layer chips (quick taps, no typing)

**Remove from initial form:**
- Company or Project Name
- Stage (Idea/Pre-launch/Launching/Operating)
- Industry
- Are you already in the UAE?
- Briefly describe what you're building
- Preferred contact method

These are all better discussed on the alignment call itself. The form becomes: name, email, phone, tap your needs, submit. A founder can complete it in under 15 seconds.

### Layout

```text
Row 1:  [Full Name *]     [Email *]
Row 2:  [Phone / WhatsApp]
Row 3:  [Support chips: Structuring | Licensing | Compliance | Operations | Banking | Early Execution]
Row 4:  [Request Alignment] button
```

### Technical Details

- **Single file change:** `src/components/FounderForm.tsx` — remove the 6 fields and their grid wrappers
- **Database:** No migration needed. The `founder_submissions` table columns stay as-is (nullable columns will just be `null`)
- The confirmation state stays unchanged

