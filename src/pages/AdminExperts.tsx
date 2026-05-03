import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";

type Row = {
  id: string;
  created_at: string;
  name: string | null;
  email: string;
  phone: string | null;
  industry: string | null;
  status: string;
  linkedin: string | null;
  role: string | null;
  expertise: string | null;
  years_experience: number | null;
  expert_type: string | null;
  summary: string | null;
  why_join: string | null;
  admin_notes: string | null;
  id_document_url: string | null;
  credential_document_url: string | null;
  auth_user_id: string | null;
};

const STATUSES = ["waitlist", "contacted", "invited", "completed", "approved", "rejected"];

const AdminExperts = () => {
  const navigate = useNavigate();
  const [authChecked, setAuthChecked] = useState(false);
  const [isAdmin, setIsAdmin] = useState(false);
  const [rows, setRows] = useState<Row[]>([]);
  const [filter, setFilter] = useState<string>("all");
  const [selected, setSelected] = useState<Row | null>(null);

  useEffect(() => {
    (async () => {
      const { data: userData } = await supabase.auth.getUser();
      const uid = userData.user?.id;
      if (!uid) {
        navigate("/auth");
        return;
      }
      const { data: roles } = await supabase
        .from("user_roles")
        .select("role")
        .eq("user_id", uid);
      const admin = roles?.some((r) => r.role === "admin") ?? false;
      setIsAdmin(admin);
      setAuthChecked(true);
      if (admin) loadRows();
    })();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const loadRows = async () => {
    const { data, error } = await supabase
      .from("expert_submissions")
      .select("*")
      .order("created_at", { ascending: false });
    if (error) {
      toast.error(error.message);
      return;
    }
    setRows((data || []) as Row[]);
  };

  const updateStatus = async (id: string, status: string, admin_notes?: string) => {
    const { error } = await supabase
      .from("expert_submissions")
      .update({
        status,
        admin_notes: admin_notes ?? undefined,
        reviewed_at: new Date().toISOString(),
      })
      .eq("id", id);
    if (error) {
      toast.error(error.message);
      return;
    }
    toast.success(`Marked as ${status}`);
    loadRows();
    setSelected(null);
  };

  const sendInvite = async (email: string) => {
    const { error } = await supabase.auth.signInWithOtp({
      email,
      options: { emailRedirectTo: `${window.location.origin}/experts/complete-profile` },
    });
    if (error) {
      toast.error(error.message);
      return;
    }
    toast.success(`Magic-link invite sent to ${email}`);
  };

  const getDocUrl = async (path: string) => {
    const { data, error } = await supabase.storage
      .from("expert-documents")
      .createSignedUrl(path, 3600);
    if (error || !data) {
      toast.error("Could not load document");
      return;
    }
    window.open(data.signedUrl, "_blank");
  };

  if (!authChecked) {
    return (
      <div className="min-h-screen bg-background text-foreground">
        <Navbar />
        <div className="pt-32 text-center text-muted-foreground">Loading…</div>
      </div>
    );
  }

  if (!isAdmin) {
    return (
      <div className="min-h-screen bg-background text-foreground">
        <Navbar />
        <div className="pt-24 max-w-lg mx-auto text-center px-5">
          <h1 className="font-serif text-3xl mb-3">Admin access required</h1>
          <p className="text-sm text-muted-foreground mb-6">
            Your account does not have admin privileges.
          </p>
          <Button onClick={() => supabase.auth.signOut().then(() => navigate("/auth"))}>
            Sign out
          </Button>
        </div>
      </div>
    );
  }

  const filtered = filter === "all" ? rows : rows.filter((r) => r.status === filter);

  return (
    <div className="min-h-screen bg-background text-foreground">
      <Navbar />
      <div className="pt-24 pb-16">
        <div className="max-w-6xl mx-auto px-5">
          <div className="flex items-center justify-between mb-6">
            <div>
              <h1 className="font-serif text-3xl">Expert applications</h1>
              <p className="text-sm text-muted-foreground">
                {rows.length} total · {rows.filter((r) => r.status === "waitlist").length} on waitlist
              </p>
            </div>
            <Button variant="outline" onClick={() => supabase.auth.signOut().then(() => navigate("/auth"))}>
              Sign out
            </Button>
          </div>

          <div className="flex flex-wrap gap-2 mb-5">
            {["all", ...STATUSES].map((s) => (
              <button
                key={s}
                onClick={() => setFilter(s)}
                className={`text-xs px-3 py-1.5 rounded-full border transition-colors ${
                  filter === s
                    ? "bg-accent text-accent-foreground border-accent"
                    : "bg-card border-border hover:bg-secondary"
                }`}
              >
                {s} ({s === "all" ? rows.length : rows.filter((r) => r.status === s).length})
              </button>
            ))}
          </div>

          <div className="rounded-xl border border-border bg-card overflow-hidden">
            <table className="w-full text-sm">
              <thead className="bg-secondary">
                <tr className="text-left text-xs uppercase tracking-wider text-muted-foreground">
                  <th className="p-3">Name</th>
                  <th className="p-3">Email</th>
                  <th className="p-3">Industry</th>
                  <th className="p-3">Status</th>
                  <th className="p-3">Submitted</th>
                  <th className="p-3" />
                </tr>
              </thead>
              <tbody>
                {filtered.map((r) => (
                  <tr key={r.id} className="border-t border-border hover:bg-secondary/40">
                    <td className="p-3 font-medium">{r.name || "—"}</td>
                    <td className="p-3 text-muted-foreground">{r.email}</td>
                    <td className="p-3 text-muted-foreground">{r.industry || "—"}</td>
                    <td className="p-3">
                      <span className="text-xs px-2 py-0.5 rounded-full bg-secondary border border-border">
                        {r.status}
                      </span>
                    </td>
                    <td className="p-3 text-xs text-muted-foreground">
                      {new Date(r.created_at).toLocaleDateString()}
                    </td>
                    <td className="p-3 text-right">
                      <Button size="sm" variant="outline" onClick={() => setSelected(r)}>
                        View
                      </Button>
                    </td>
                  </tr>
                ))}
                {filtered.length === 0 && (
                  <tr>
                    <td colSpan={6} className="p-8 text-center text-muted-foreground text-sm">
                      No applications.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>

      {selected && (
        <ReviewDrawer
          row={selected}
          onClose={() => setSelected(null)}
          onUpdateStatus={updateStatus}
          onSendInvite={sendInvite}
          onOpenDoc={getDocUrl}
        />
      )}
      <Footer />
    </div>
  );
};

const ReviewDrawer = ({
  row,
  onClose,
  onUpdateStatus,
  onSendInvite,
  onOpenDoc,
}: {
  row: Row;
  onClose: () => void;
  onUpdateStatus: (id: string, status: string, notes?: string) => void;
  onSendInvite: (email: string) => void;
  onOpenDoc: (path: string) => void;
}) => {
  const [notes, setNotes] = useState(row.admin_notes || "");
  return (
    <div className="fixed inset-0 z-50 bg-black/50 flex justify-end" onClick={onClose}>
      <div
        className="w-full max-w-lg h-full bg-background overflow-y-auto p-6"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex justify-between items-start mb-5">
          <div>
            <h2 className="font-serif text-2xl">{row.name || row.email}</h2>
            <p className="text-xs text-muted-foreground">{row.email} · {row.phone || "no phone"}</p>
          </div>
          <button onClick={onClose} className="text-muted-foreground hover:text-foreground">✕</button>
        </div>

        <div className="space-y-3 text-sm mb-6">
          <Field label="Status" value={row.status} />
          <Field label="Industry" value={row.industry} />
          <Field label="LinkedIn" value={row.linkedin} />
          <Field label="Role" value={row.role} />
          <Field label="Expertise" value={row.expertise} />
          <Field label="Years experience" value={row.years_experience?.toString()} />
          <Field label="Expert type" value={row.expert_type} />
          <Field label="Summary" value={row.summary} multiline />
          <Field label="Why join" value={row.why_join} multiline />
        </div>

        <div className="flex gap-2 mb-6">
          {row.id_document_url && (
            <Button size="sm" variant="outline" onClick={() => onOpenDoc(row.id_document_url!)}>
              View ID
            </Button>
          )}
          {row.credential_document_url && (
            <Button size="sm" variant="outline" onClick={() => onOpenDoc(row.credential_document_url!)}>
              View Credentials
            </Button>
          )}
        </div>

        <div className="mb-5">
          <label className="block text-xs font-semibold mb-1.5">Internal notes</label>
          <textarea
            value={notes}
            onChange={(e) => setNotes(e.target.value)}
            rows={3}
            className="w-full rounded-lg border border-border bg-card px-3 py-2 text-sm"
          />
        </div>

        <div className="space-y-2">
          <p className="text-xs font-semibold text-muted-foreground uppercase tracking-wider">Actions</p>
          <div className="grid grid-cols-2 gap-2">
            <Button size="sm" variant="outline" onClick={() => onUpdateStatus(row.id, "contacted", notes)}>
              Mark contacted
            </Button>
            <Button
              size="sm"
              variant="accent"
              onClick={async () => {
                await onSendInvite(row.email);
                onUpdateStatus(row.id, "invited", notes);
              }}
            >
              Send invite
            </Button>
            <Button size="sm" variant="default" onClick={() => onUpdateStatus(row.id, "approved", notes)}>
              Approve
            </Button>
            <Button size="sm" variant="destructive" onClick={() => onUpdateStatus(row.id, "rejected", notes)}>
              Reject
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

const Field = ({ label, value, multiline }: { label: string; value: string | null | undefined; multiline?: boolean }) => (
  <div>
    <p className="text-xs uppercase tracking-wider text-muted-foreground">{label}</p>
    <p className={`text-foreground ${multiline ? "whitespace-pre-wrap" : ""}`}>{value || "—"}</p>
  </div>
);

export default AdminExperts;
