
## Expert Onboarding Flow — Two-Stage, Approval-Gated

Reposition the expert join flow as a **waitlist / approval process** instead of a single long form. Experts express interest in a short conversational intake, wait for a manual callback, then receive credentials to complete a full verified profile that admins approve.

---

### Stage 1 — Interest Intake (replaces current ExpertSignupForm)

Replace the current 11-field form on `/experts/signup` with a **dynamic, one-question-at-a-time conversational form**. Only 4 fields, revealed sequentially with smooth transitions:

1. **Full name** → continue
2. **Professional email** → continue
3. **Phone number (WhatsApp preferred)** → continue
4. **Specific industry of expertise** (free text + suggested chips: Fintech, Healthcare, Real Estate, Legal, Banking, Compliance, Operations, Other) → submit

After submit → **confirmation screen**:
> "You're on the waitlist. Our team will reach out personally for a short qualification call before any profile is created. We review every applicant manually to protect the network's standards."

Stored in `expert_submissions` (existing table — most fields stay null at this stage). Add a `status` column: `waitlist` (default) → `contacted` → `invited` → `completed` → `approved` / `rejected`.

---

### Stage 2 — Profile Completion (post-callback, credentialed)

After the manual callback, an admin marks the applicant as `invited`. The applicant receives a magic-link email (Lovable Cloud auth) granting access to a **gated profile completion page** at `/experts/complete-profile`.

Profile completion captures:
- LinkedIn URL
- Current role & company
- Years of experience
- Expert type (Operator / Consultant / Hybrid)
- Detailed expertise summary
- Industries served
- **Proof of identity upload** (Emirates ID / passport — file storage)
- **Proof of credentials** (license, certifications, portfolio — file storage)
- Short bio / why join

On submit → status becomes `completed` and the application enters admin review.

---

### Stage 3 — Admin Review

A simple admin-only page at `/admin/experts` lists all applications by status. Admin can:
- View submitted info and uploaded documents
- Mark as `approved` or `rejected`
- Add internal notes

Approved experts are surfaced in the network. (Public expert directory is out of scope for this plan.)

---

### Updated Flow Summary

```text
Expert clicks "Join as Early Expert"
        │
        ▼
Stage 1: 4-question dynamic intake  ──►  status = waitlist
        │
        ▼
Confirmation: "Wait for callback"
        │
        ▼ (manual call by Resider team — admin marks `invited`)
        │
Magic-link email sent to expert
        │
        ▼
Stage 2: Full profile + ID/credential upload  ──►  status = completed
        │
        ▼
Stage 3: Admin reviews → approved / rejected
```

---

### Technical Details

**Database migration** (`expert_submissions`):
- Add `status` text column, default `waitlist`
- Add `auth_user_id` uuid (links to auth user once invited)
- Add `id_document_url`, `credential_document_url` text columns
- Add `admin_notes` text, `reviewed_at` timestamp
- Update RLS: anon insert (Stage 1), authenticated user can update only their own row (Stage 2), admin role can select/update all

**New `user_roles` table + `has_role()` security definer function** for admin gating (per project user-roles policy — never store role on profile).

**Storage bucket**: `expert-documents` (private), RLS so only the owner and admins can read.

**New components**:
- `ExpertIntakeForm.tsx` — dynamic 4-step intake (replaces `ExpertSignupForm.tsx`)
- `ExpertProfileCompletion.tsx` — gated full-profile form with file uploads
- `pages/ExpertCompleteProfile.tsx` — auth-gated route
- `pages/AdminExperts.tsx` — admin review dashboard

**Auth**: enable email magic-link sign-in (no password needed for experts). Admin login via email/password.

**Routes added**:
- `/experts/complete-profile` (auth-gated)
- `/admin/experts` (admin-role-gated)
- `/auth` (sign-in page for experts and admins)

**Out of scope for this iteration**: automated email-triggered invite sending (admin manually clicks "Send invite" which generates the magic link). Public expert directory.

---

### Open Questions

- Should the admin "Send invite" action auto-send the magic-link email via an edge function, or is it OK to copy/paste the link in v1?
- Who is the first admin user — should I seed a specific email address as admin in the migration, or do you want to set it manually after signup?
