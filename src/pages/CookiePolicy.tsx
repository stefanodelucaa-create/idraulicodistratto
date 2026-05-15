import { LegalLayout } from "@/components/legal/LegalLayout";

export default function CookiePolicy() {
  return (
    <LegalLayout title="Cookie Policy">
      <section>
        <p>
          La presente Cookie Policy descrive le tipologie di cookie utilizzati su questo sito
          e le modalità con cui l'utente può gestirne le preferenze.
        </p>
      </section>

      <section>
        <h2>1. Cosa sono i cookie</h2>
        <p>
          I cookie sono piccoli file di testo che i siti visitati inviano al dispositivo
          dell'utente, dove vengono memorizzati per essere ritrasmessi agli stessi siti
          alla visita successiva.
        </p>
      </section>

      <section>
        <h2>2. Cookie tecnici e di sessione</h2>
        <p>
          Sono <strong>strettamente necessari</strong> al corretto funzionamento del sito,
          alla gestione dell'autenticazione e del carrello d'acquisto. Per questi cookie
          non è richiesto il consenso preventivo dell'utente.
        </p>
      </section>

      <section>
        <h2>3. Cookie analytics</h2>
        <p>
          Utilizziamo <strong>Google Tag Manager</strong> e <strong>Google Analytics</strong>{" "}
          per raccogliere informazioni in forma aggregata sull'uso del sito (numero di
          visite, pagine viste, durata della sessione). I dati vengono trattati in forma
          anonimizzata al fine di migliorare l'esperienza utente.
        </p>
      </section>

      <section>
        <h2>4. Cookie pubblicitari</h2>
        <p>
          <strong>Non utilizziamo cookie pubblicitari comportamentali di terze parti</strong>{" "}
          per finalità di profilazione.
        </p>
      </section>

      <section>
        <h2>5. Gestione del consenso</h2>
        <p>
          Al primo accesso al sito viene mostrato un <strong>banner di consenso</strong> che
          consente all'utente di accettare o rifiutare i cookie non strettamente necessari.
          Le preferenze possono essere modificate in qualsiasi momento.
        </p>
      </section>

      <section>
        <h2>6. Disabilitazione dei cookie dal browser</h2>
        <p>
          L'utente può inoltre gestire o disattivare i cookie direttamente dalle impostazioni
          del proprio browser (Chrome, Firefox, Safari, Edge). La disattivazione di alcuni
          cookie potrebbe limitare la corretta fruizione di alcune funzionalità del sito.
        </p>
      </section>

      <section>
        <h2>7. Titolare del trattamento</h2>
        <p>
          PrimeVector Limited – Unit 1603, 16th Floor, The L. Plaza, 367-375 Queen's Road
          Central, Sheung Wan, Hong Kong – Tax ID: 78308723.
        </p>
      </section>
    </LegalLayout>
  );
}
