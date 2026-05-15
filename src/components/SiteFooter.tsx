import { Link } from "react-router-dom";

export const SiteFooter = () => {
  return (
    <footer className="bg-black text-gray-300 border-t border-gray-800">
      <div className="max-w-5xl mx-auto px-4 py-10 text-center text-xs sm:text-sm space-y-5 leading-relaxed">
        <div className="space-y-1">
          <p className="font-semibold text-white">PrimeVector Limited</p>
          <p>Unit 1603, 16th Floor, The L. Plaza, 367-375 Queen's Road Central, Sheung Wan, Hong Kong</p>
          <p>Tax ID: 78308723</p>
        </div>

        <p className="max-w-3xl mx-auto text-gray-400">
          I contenuti di questo sito hanno scopo esclusivamente educativo e informativo.
          Non costituiscono consulenza medica, psicologica o terapeutica.
        </p>

        <nav className="flex flex-wrap items-center justify-center gap-x-4 gap-y-2 text-gray-300">
          <Link to="/privacy-policy" className="hover:text-white transition-colors">Privacy Policy</Link>
          <span className="text-gray-600">|</span>
          <Link to="/termini-e-condizioni" className="hover:text-white transition-colors">Termini e Condizioni</Link>
          <span className="text-gray-600">|</span>
          <Link to="/cookie-policy" className="hover:text-white transition-colors">Cookie Policy</Link>
          <span className="text-gray-600">|</span>
          <Link to="/disclaimer" className="hover:text-white transition-colors">Disclaimer</Link>
        </nav>

        <p className="text-gray-500">© 2025 PrimeVector Limited. Tutti i diritti riservati.</p>
      </div>
    </footer>
  );
};

export default SiteFooter;
