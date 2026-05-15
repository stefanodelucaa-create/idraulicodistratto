import { LegalLayout } from "@/components/legal/LegalLayout";

export default function Disclaimer() {
  return (
    <LegalLayout title="Disclaimer">
      <section>
        <p>
          Tutti i contenuti della guida e di questo sito sono da intendersi come{" "}
          <strong>consigli generali a scopo educativo e informativo</strong> sull'anatomia
          umana e sul benessere all'interno della coppia.
        </p>
      </section>

      <section>
        <h2>1. Nessun parere professionale</h2>
        <p>
          I contenuti <strong>non costituiscono consulenza medica, psicologica o terapeutica</strong>{" "}
          e non sostituiscono in alcun modo il parere di professionisti sanitari qualificati
          (medici, psicologi, sessuologi, terapeuti). In presenza di problematiche specifiche
          si raccomanda di rivolgersi a un professionista abilitato.
        </p>
      </section>

      <section>
        <h2>2. Limitazione di responsabilità</h2>
        <p>
          <strong>PrimeVector Limited</strong> non si assume alcuna responsabilità per
          l'utilizzo, l'interpretazione o le conseguenze derivanti dall'applicazione delle
          informazioni contenute nella guida. I risultati possono variare da persona a persona.
        </p>
      </section>

      <section>
        <h2>3. Pubblico di riferimento</h2>
        <p>
          La guida è destinata esclusivamente a un <strong>pubblico adulto di età superiore
          ai 18 anni</strong>. Acquistando o utilizzando il prodotto, l'utente dichiara di
          essere maggiorenne secondo la normativa applicabile nel proprio Paese.
        </p>
      </section>

      <section>
        <h2>4. Contatti</h2>
        <p>
          Per chiarimenti è possibile scrivere a:{" "}
          <a href="mailto:idraulicodistratto@gmail.com">idraulicodistratto@gmail.com</a>
        </p>
      </section>
    </LegalLayout>
  );
}
