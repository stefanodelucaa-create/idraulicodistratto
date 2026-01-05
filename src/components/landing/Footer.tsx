import { Link } from "react-router-dom";

export const Footer = () => {
  return (
    <footer className="py-8 bg-background border-t border-border">
      <div className="container">
        <div className="flex flex-col md:flex-row items-center justify-between gap-4 text-sm text-muted-foreground">
          <p>© {new Date().getFullYear()} Manuale dell'Idraulico Distratto. Tutti i diritti riservati.</p>
          <div className="flex items-center gap-6">
            <Link to="/privacy-policy" className="hover:text-foreground transition-colors">
              Privacy Policy
            </Link>
            <Link to="/termini-condizioni" className="hover:text-foreground transition-colors">
              Termini e Condizioni
            </Link>
            <Link to="/contatti" className="hover:text-foreground transition-colors">
              Contatti
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
};
