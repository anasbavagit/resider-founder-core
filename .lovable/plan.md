

## Update Founder Form Support Options to Match Execution Layers

**Problem:** The current form lists 9 support options (Residency, Business Setup, Structuring, Licensing, Compliance, Banking, Operations, Early Execution, Industry Expert Access) which don't align with the standard 6 execution layers.

**Change:** Update `supportOptions` in `src/components/FounderForm.tsx` to use exactly the 6 execution layers:

1. Structuring
2. Licensing
3. Compliance
4. Operations
5. Banking
6. Early Execution

This is a single-line array change — no other files affected.

