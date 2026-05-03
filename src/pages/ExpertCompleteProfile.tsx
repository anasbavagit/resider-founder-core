import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { CheckCircle, Upload } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";

type Submission = {
  id: string;
  name: string | null;
  email: string;
  status: string;
  auth_user_id: string | null;
  linkedin: string | null;
  role: string | null;
  expertise: string | null;
  industry: string | null;
  years_experience: number | null;
  expert_type: string | null;
  summary: string | null;
  why_join: string | null;
  id_document_url: string | null;
  credential_document_url: string | null;
};

const expertTypes = ["Operator", "Consultant", "Hybrid"];
const inputClass =
  "w-full rounded-lg border border-border bg-card px-4 py-3 text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-accent/40 focus:border-accent/50 transition-all";

const ExpertCompleteProfile = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);
  const [userId, setUserId] = useState<string | null>(null);
  const [submission, setSubmission] = useState<Submission | null>(null);
  const [submitting, setSubmitting] = useState(false);
  const [uploadingId, setUploadingId] = useState(false);
  const [uploadingCred, setUploadingCred] = useState(false);

  useEffect(() => {
    (async () => {
      const { data: userData } = await supabase.auth.getUser();
      const user = userData.user;
      if (!user) {
        navigate("/auth");
        return;
      }
      setUserId(user.id);

      // Try existing submission linked to this user
      let { data: existing } = await supabase
        .from("expert_submissions")
        .select("*")
        .eq("auth_user_id", user.id)
        .maybeSingle();

      // If not linked yet, try to claim by matching email (admin invites this email)
      if (!existing && user.email) {
        const { data: byEmail } = await supabase
          .from("expert_submissions")
          .select("*")
          .eq("email", user.email)
          .is("auth_user_id", null)
          .maybeSingle();
        if (byEmail) {
          const { data: updated } = await supabase
            .from("expert_submissions")
            .update({ auth_user_id: user.id })
            .eq("id", byEmail.id)
            .select("*")
            .maybeSingle();
          existing = updated || byEmail;
        }
      }

      setSubmission(existing as Submission | null);
      setLoading(false);
    })();
  }, [navigate]);

  const handleUpload = async (
    file: File,
    field: "id_document_url" | "credential_document_url",
  ) => {
    if (!userId || !submission) return;
    const setUploading = field === "id_document_url" ? setUploadingId : setUploadingCred;
    setUploading(true);
    const path = `${userId}/${field}-${Date.now()}-${file.name}`;
    const { error: upErr } = await supabase.storage
      .from("expert-documents")
      .upload(path, file, { upsert: true });
    if (upErr) {
      toast.error(upErr.message);
      setUploading(false);
      return;
    }
    const { error: updErr } = await supabase
      .from("expert_submissions")
      .update({ [field]: path })
      .eq("id", submission.id);
    setUploading(false);
    if (updErr) {
      toast.error(updErr.message);
      return;
    }
    setSubmission({ ...submission, [field]: path });
    toast.success("Document uploaded");
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!submission) return;
    const form = new FormData(e.currentTarget);
    setSubmitting(true);
    const yearsRaw = (form.get("years") as string)?.trim();
    const { error } = await supabase
      .from("expert_submissions")
      .update({
        linkedin: (form.get("linkedin") as string)?.trim() || null,
        role: (form.get("role") as string)?.trim() || null,
        expertise: (form.get("expertise") as string)?.trim() || null,
        industry: (form.get("industry") as string)?.trim() || submission.industry,
        years_experience: yearsRaw ? parseInt(yearsRaw, 10) : null,
        expert_type: (form.get("expert_type") as string) || null,
        summary: (form.get("summary") as string)?.trim() || null,
        why_join: (form.get("why_join") as string)?.trim() || null,
        status: "completed",
      })
      .eq("id", submission.id);
    setSubmitting(false);
    if (error) {
      toast.error(error.message);
      return;
    }
    toast.success("Profile submitted for review");
    setSubmission({ ...submission, status: "completed" });
  };

  const signOut = async () => {
    await supabase.auth.signOut();
    navigate("/auth");
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-background text-foreground">
        <Navbar />
        <div className="pt-32 text-center text-muted-foreground">Loading…</div>
      </div>
    );
  }

  if (!submission) {
    return (
      <div className="min-h-screen bg-background text-foreground">
        <Navbar />
        <div className="pt-24 pb-16 max-w-xl mx-auto px-5 text-center">
          <h1 className="font-serif text-3xl mb-3">No application found</h1>
          <p className="text-sm text-muted-foreground mb-6">
            We couldn't find an invited application for this email. If you believe
            this is an error, please contact our team.
          </p>
          <Button variant="accent" onClick={signOut}>Sign out</Button>
        </div>
        <Footer />
      </div>
    );
  }

  if (submission.status === "completed" || submission.status === "approved") {
    return (
      <div className="min-h-screen bg-background text-foreground">
        <Navbar />
        <div className="pt-24 pb-16 max-w-xl mx-auto px-5 text-center">
          <CheckCircle size={48} className="mx-auto text-accent mb-4" />
          <h1 className="font-serif text-3xl mb-3">
            {submission.status === "approved"
              ? "Welcome to the network."
              : "Profile under review."}
          </h1>
          <p className="text-sm text-muted-foreground mb-6">
            {submission.status === "approved"
              ? "Your profile has been approved by our team."
              : "Our team is reviewing your full profile and credentials. We'll be in touch once the review is complete."}
          </p>
          <Button variant="outline" onClick={signOut}>Sign out</Button>
        </div>
        <Footer />
      </div>
    );
  }

  if (submission.status === "rejected") {
    return (
      <div className="min-h-screen bg-background text-foreground">
        <Navbar />
        <div className="pt-24 pb-16 max-w-xl mx-auto px-5 text-center">
          <h1 className="font-serif text-3xl mb-3">Application closed</h1>
          <p className="text-sm text-muted-foreground mb-6">
            Thank you for your interest. Your application was not a fit at this
            time.
          </p>
          <Button variant="outline" onClick={signOut}>Sign out</Button>
        </div>
        <Footer />
      </div>
    );
  }

  // status: invited or contacted/waitlist (allow profile completion once invited)
  return (
    <div className="min-h-screen bg-background text-foreground">
      <Navbar />
      <div className="pt-24 pb-16">
        <div className="max-w-2xl mx-auto px-5">
          <div className="text-center mb-8">
            <span className="inline-block text-xs font-semibold tracking-[0.15em] uppercase text-accent mb-3">
              Stage 2 · Profile & verification
            </span>
            <h1 className="font-serif text-[clamp(1.75rem,4vw,2.5rem)] mb-3">
              Complete your expert profile
            </h1>
            <p className="text-sm text-muted-foreground max-w-md mx-auto">
              Welcome, {submission.name || submission.email}. Add the details and
              proof our admin team needs to finalize your approval.
            </p>
          </div>

          <form
            onSubmit={handleSubmit}
            className="rounded-2xl border border-border bg-card p-6 sm:p-8 space-y-5"
          >
            <div className="grid sm:grid-cols-2 gap-5">
              <div>
                <label className="block text-xs font-semibold mb-1.5">LinkedIn URL</label>
                <input name="linkedin" defaultValue={submission.linkedin || ""} className={inputClass} placeholder="linkedin.com/in/..." />
              </div>
              <div>
                <label className="block text-xs font-semibold mb-1.5">Current Role / Title</label>
                <input name="role" defaultValue={submission.role || ""} className={inputClass} placeholder="e.g., COO, Compliance Lead" />
              </div>
            </div>

            <div className="grid sm:grid-cols-2 gap-5">
              <div>
                <label className="block text-xs font-semibold mb-1.5">Area of Expertise</label>
                <input name="expertise" defaultValue={submission.expertise || ""} className={inputClass} placeholder="e.g., Banking, Licensing" />
              </div>
              <div>
                <label className="block text-xs font-semibold mb-1.5">Industry Focus</label>
                <input name="industry" defaultValue={submission.industry || ""} className={inputClass} />
              </div>
            </div>

            <div className="grid sm:grid-cols-2 gap-5">
              <div>
                <label className="block text-xs font-semibold mb-1.5">Years of Experience</label>
                <input name="years" type="number" min={0} defaultValue={submission.years_experience ?? ""} className={inputClass} />
              </div>
              <div>
                <label className="block text-xs font-semibold mb-1.5">Expert Type</label>
                <select name="expert_type" defaultValue={submission.expert_type || ""} className={inputClass}>
                  <option value="">Select…</option>
                  {expertTypes.map((t) => (
                    <option key={t} value={t}>{t}</option>
                  ))}
                </select>
              </div>
            </div>

            <div>
              <label className="block text-xs font-semibold mb-1.5">Summary of experience</label>
              <textarea name="summary" defaultValue={submission.summary || ""} rows={3} className={inputClass} />
            </div>

            <div>
              <label className="block text-xs font-semibold mb-1.5">Why join Resider?</label>
              <textarea name="why_join" defaultValue={submission.why_join || ""} rows={3} className={inputClass} />
            </div>

            {/* Document uploads */}
            <div className="grid sm:grid-cols-2 gap-5 pt-2">
              <DocUpload
                label="Proof of identity (Emirates ID / passport)"
                fileUrl={submission.id_document_url}
                uploading={uploadingId}
                onFile={(f) => handleUpload(f, "id_document_url")}
              />
              <DocUpload
                label="Proof of credentials (license, certs, portfolio)"
                fileUrl={submission.credential_document_url}
                uploading={uploadingCred}
                onFile={(f) => handleUpload(f, "credential_document_url")}
              />
            </div>

            <Button type="submit" variant="accent" size="lg" className="w-full" disabled={submitting}>
              {submitting ? "Submitting…" : "Submit for admin review"}
            </Button>
          </form>

          <div className="text-center mt-6">
            <button onClick={signOut} className="text-xs text-muted-foreground hover:text-foreground">
              Sign out
            </button>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};

const DocUpload = ({
  label,
  fileUrl,
  uploading,
  onFile,
}: {
  label: string;
  fileUrl: string | null;
  uploading: boolean;
  onFile: (f: File) => void;
}) => (
  <label className="block cursor-pointer">
    <span className="block text-xs font-semibold mb-1.5">{label}</span>
    <div className="rounded-lg border border-dashed border-border bg-secondary/40 px-4 py-6 text-center hover:bg-secondary transition-colors">
      <Upload size={18} className="mx-auto text-muted-foreground mb-2" />
      <span className="text-xs text-muted-foreground block">
        {uploading
          ? "Uploading…"
          : fileUrl
            ? "✓ Uploaded — click to replace"
            : "Click to upload (PDF or image)"}
      </span>
    </div>
    <input
      type="file"
      accept="application/pdf,image/*"
      className="hidden"
      onChange={(e) => {
        const f = e.target.files?.[0];
        if (f) onFile(f);
      }}
    />
  </label>
);

export default ExpertCompleteProfile;
