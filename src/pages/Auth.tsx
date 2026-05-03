import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";

const Auth = () => {
  const navigate = useNavigate();
  const [mode, setMode] = useState<"magic" | "password">("magic");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const { data: sub } = supabase.auth.onAuthStateChange((_event, session) => {
      if (session) routeForUser();
    });
    supabase.auth.getSession().then(({ data }) => {
      if (data.session) routeForUser();
    });
    return () => sub.subscription.unsubscribe();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const routeForUser = async () => {
    const { data: userData } = await supabase.auth.getUser();
    const uid = userData.user?.id;
    if (!uid) return;
    const { data: roles } = await supabase
      .from("user_roles")
      .select("role")
      .eq("user_id", uid);
    if (roles?.some((r) => r.role === "admin")) {
      navigate("/admin/experts");
    } else {
      navigate("/experts/complete-profile");
    }
  };

  const handleMagicLink = async () => {
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.trim())) {
      toast.error("Enter a valid email");
      return;
    }
    setLoading(true);
    const { error } = await supabase.auth.signInWithOtp({
      email: email.trim(),
      options: { emailRedirectTo: `${window.location.origin}/experts/complete-profile` },
    });
    setLoading(false);
    if (error) {
      toast.error(error.message);
      return;
    }
    toast.success("Check your email for the sign-in link.");
  };

  const handlePasswordSignIn = async () => {
    setLoading(true);
    const { error } = await supabase.auth.signInWithPassword({
      email: email.trim(),
      password,
    });
    setLoading(false);
    if (error) {
      toast.error(error.message);
      return;
    }
  };

  const inputClass =
    "w-full rounded-lg border border-border bg-card px-4 py-3 text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-accent/40 focus:border-accent/50 transition-all";

  return (
    <div className="min-h-screen bg-background text-foreground">
      <Navbar />
      <div className="pt-24 pb-16">
        <div className="max-w-md mx-auto px-5">
          <div className="text-center mb-8">
            <h1 className="font-serif text-3xl mb-2">Sign in</h1>
            <p className="text-sm text-muted-foreground">
              {mode === "magic"
                ? "Receive a one-time sign-in link by email."
                : "Admin access only."}
            </p>
          </div>

          <div className="rounded-2xl border border-border bg-card p-6 space-y-4">
            <div>
              <label className="block text-xs font-semibold mb-1.5">Email</label>
              <input
                type="email"
                className={inputClass}
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="you@email.com"
              />
            </div>

            {mode === "password" && (
              <div>
                <label className="block text-xs font-semibold mb-1.5">Password</label>
                <input
                  type="password"
                  className={inputClass}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
              </div>
            )}

            <Button
              variant="accent"
              size="lg"
              className="w-full"
              disabled={loading}
              onClick={mode === "magic" ? handleMagicLink : handlePasswordSignIn}
            >
              {loading
                ? "Please wait…"
                : mode === "magic"
                  ? "Email me a sign-in link"
                  : "Sign in"}
            </Button>

            <button
              type="button"
              onClick={() => setMode(mode === "magic" ? "password" : "magic")}
              className="w-full text-xs text-muted-foreground hover:text-foreground transition-colors pt-2"
            >
              {mode === "magic"
                ? "Admin? Sign in with password"
                : "← Back to email link"}
            </button>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default Auth;
