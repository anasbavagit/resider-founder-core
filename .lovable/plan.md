

## Remove Expert Network Section

Remove the "Expert network — A curated network built on execution depth" section from the homepage/Experts page.

### Change

**`src/pages/Experts.tsx`** — remove the `<ExpertNetwork />` component usage and its import.

The remaining Experts page flow becomes:
1. `ExpertStandards` (standards & trust)
2. `ExpertForm` (signup)

### Notes

- `src/components/ExpertNetwork.tsx` will be left in place (unused) in case you want to reintroduce it later. Say the word if you'd prefer it deleted.
- No other pages reference `ExpertNetwork`, so no further cleanup is required.

