import { Link } from "react-router-dom";
import { ArrowLeft } from "lucide-react";
import { SiteFooter } from "@/components/SiteFooter";
import { ReactNode } from "react";

interface LegalLayoutProps {
  title: string;
  children: ReactNode;
}

export const LegalLayout = ({ title, children }: LegalLayoutProps) => {
  return (
    <div className="min-h-screen bg-black text-gray-200 flex flex-col">
      <div className="flex-1">
        <div className="max-w-3xl mx-auto px-5 md:px-10 py-10 md:py-16">
          <Link
            to="/"
            className="inline-flex items-center gap-2 text-red-400 hover:text-red-300 transition-colors mb-8 text-sm"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>Torna alla Home</span>
          </Link>

          <h1 className="font-bold text-3xl md:text-4xl text-white mb-2">{title}</h1>
          <p className="text-sm text-gray-500 mb-10">
            Ultimo aggiornamento: {new Date().toLocaleDateString("it-IT")}
          </p>

          <div className="space-y-6 text-gray-300 leading-relaxed [&_h2]:text-xl [&_h2]:font-semibold [&_h2]:text-white [&_h2]:mt-8 [&_h2]:mb-3 [&_a]:text-red-400 [&_a:hover]:underline [&_strong]:text-white [&_ul]:list-disc [&_ul]:pl-6 [&_ul]:space-y-2 [&_ul]:mt-2 [&_ol]:list-decimal [&_ol]:pl-6 [&_ol]:space-y-2 [&_ol]:mt-2">
            {children}
          </div>
        </div>
      </div>
      <SiteFooter />
    </div>
  );
};

export default LegalLayout;
