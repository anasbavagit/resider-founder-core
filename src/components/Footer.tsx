const Footer = () =>
<footer className="section-padding py-12 border-t border-border">
    <div className="max-container flex flex-col md:flex-row items-center justify-between gap-4">
      <span className="heading-display text-foreground text-2xl">Resider.io</span>
      <p className="text-sm text-muted-foreground">
        © {new Date().getFullYear()} Resider.io Founder infrastructure for the UAE.
      </p>
      <div className="flex flex-wrap gap-6">
        <a href="/how-it-works" className="text-sm text-muted-foreground hover:text-foreground transition-colors">
          How It Works
        </a>
        <a href="/expertise" className="text-sm text-muted-foreground hover:text-foreground transition-colors">
          Expertise
        </a>
        <a href="/#founder-form" className="text-sm text-muted-foreground hover:text-foreground transition-colors">
          For Founders
        </a>
        <a href="/experts" className="text-sm text-muted-foreground hover:text-foreground transition-colors">
          For Experts
        </a>
        <a href="/about" className="text-sm text-muted-foreground hover:text-foreground transition-colors">
          About
        </a>
        <a href="/#problem" className="text-sm text-muted-foreground hover:text-foreground transition-colors">
          Problem
        </a>
        <a href="/#solution" className="text-sm text-muted-foreground hover:text-foreground transition-colors">
          Solution
        </a>
      </div>
    </div>
  </footer>;


export default Footer;
