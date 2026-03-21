const Footer = () =>
<footer className="section-padding py-12 border-t border-border">
    <div className="max-container flex flex-col md:flex-row items-center justify-between gap-4">
      <span className="heading-display text-foreground text-xl">Resider.io</span>
      <p className="text-sm text-muted-foreground">
        © {new Date().getFullYear()} Resider. Founder infrastructure for the UAE.
      </p>
      <div className="flex gap-6">
        <a href="#founder-form" className="text-sm text-muted-foreground hover:text-foreground transition-colors">
          For Founders
        </a>
        <a href="#expert-form" className="text-sm text-muted-foreground hover:text-foreground transition-colors">
          For Experts
        </a>
      </div>
    </div>
  </footer>;


export default Footer;