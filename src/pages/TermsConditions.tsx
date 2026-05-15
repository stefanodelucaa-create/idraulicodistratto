import { LegalLayout } from "@/components/legal/LegalLayout";

export default function TermsConditions() {
  return (
    <LegalLayout title="Termini e Condizioni">
      <section>
        <p>
          I presenti Termini e Condizioni regolano l'acquisto del prodotto digitale offerto
          tramite questo sito da <strong>PrimeVector Limited</strong> (Unit 1603, 16th Floor,
          The L. Plaza, 367-375 Queen's Road Central, Sheung Wan, Hong Kong – Tax ID: 78308723).
        </p>
      </section>

      <section>
        <h2>1. Oggetto</h2>
        <p>
          Il prodotto è di natura <strong>digitale</strong> e viene consegnato tramite
          <strong> link di download immediato</strong> al completamento del pagamento.
        </p>
      </section>

      <section>
        <h2>2. Rinuncia al diritto di recesso</h2>
        <p>
          Completando l'acquisto, il cliente <strong>rinuncia espressamente al diritto di recesso</strong>{" "}
          ai sensi dell'<strong>art. 59, comma 1, lett. o) del Codice del Consumo
          (D.Lgs. 206/2005)</strong> e della <strong>Direttiva 2011/83/UE</strong>, in quanto il
          contenuto digitale non è fornito su supporto materiale e la consegna inizia
          immediatamente dopo la conferma del pagamento.
        </p>
        <p>
          Al checkout è richiesta l'accettazione esplicita della seguente dichiarazione:
        </p>
        <p className="border-l-2 border-red-600 pl-4 italic text-gray-200">
          "Ho letto e accetto i Termini e Condizioni e confermo di rinunciare al diritto di
          recesso ai sensi dell'art. 59 del Codice del Consumo, poiché il prodotto digitale
          sarà disponibile immediatamente dopo il pagamento."
        </p>
      </section>

      <section>
        <h2>3. Natura dei contenuti</h2>
        <p>
          I contenuti forniti sono esclusivamente a <strong>scopo educativo e informativo</strong>{" "}
          e non costituiscono in alcun modo consulenza medica, psicologica o terapeutica.
        </p>
      </section>

      <section>
        <h2>4. Proprietà intellettuale</h2>
        <p>
          Tutti i contenuti sono protetti da diritto d'autore. È <strong>vietata qualsiasi
          forma di redistribuzione, rivendita, condivisione o copia</strong> del materiale,
          anche parziale.
        </p>
      </section>

      <section>
        <h2>5. Pagamenti</h2>
        <p>
          I pagamenti sono elaborati esclusivamente da provider certificati terzi
          (PayPal, Stripe). I dati della carta non vengono mai conservati dal venditore.
        </p>
      </section>

      <section>
        <h2>6. Limitazione di responsabilità</h2>
        <p>
          PrimeVector Limited non si assume responsabilità per risultati individuali o per
          l'uso improprio delle informazioni contenute nel prodotto.
        </p>
      </section>

      <section>
        <h2>7. Legge applicabile e foro competente</h2>
        <p>
          I presenti Termini e Condizioni sono regolati dal <strong>diritto di Hong Kong</strong>.
          Per qualsiasi controversia sarà <strong>competente il foro di Hong Kong</strong>.
        </p>
      </section>

      <section>
        <h2>8. Contatti</h2>
        <p>
          Per qualsiasi richiesta:{" "}
          <a href="mailto:idraulicodistratto@gmail.com">idraulicodistratto@gmail.com</a>
        </p>
      </section>
    </LegalLayout>
  );
}
