import { LegalLayout } from "@/components/legal/LegalLayout";

export default function PrivacyPolicy() {
  return (
    <LegalLayout title="Privacy Policy">
      <section>
        <p>
          La presente informativa è resa ai sensi del Regolamento (UE) 2016/679 (GDPR) a tutti
          gli utenti che interagiscono con questo sito.
        </p>
      </section>

      <section>
        <h2>1. Titolare del Trattamento</h2>
        <p>
          <strong>PrimeVector Limited</strong><br />
          Unit 1603, 16th Floor, The L. Plaza, 367-375 Queen's Road Central, Sheung Wan, Hong Kong<br />
          Tax ID: 78308723
        </p>
      </section>

      <section>
        <h2>2. Dati raccolti</h2>
        <ul>
          <li><strong>Dati identificativi:</strong> nome ed indirizzo email forniti al momento dell'acquisto.</li>
          <li><strong>Dati di pagamento:</strong> elaborati esclusivamente da provider certificati terzi (PayPal, Stripe). I dati della carta non vengono mai conservati né trattati direttamente da noi.</li>
          <li><strong>Dati di navigazione:</strong> indirizzo IP, tipo di browser, pagine visitate, raccolti in forma aggregata tramite strumenti analytics.</li>
        </ul>
      </section>

      <section>
        <h2>3. Finalità del trattamento</h2>
        <ul>
          <li>Evasione degli ordini e consegna del prodotto digitale.</li>
          <li>Comunicazioni relative all'acquisto e all'assistenza clienti.</li>
          <li>Adempimento di obblighi legali e fiscali.</li>
        </ul>
        <p>
          <strong>Non vendiamo, affittiamo o cediamo i tuoi dati personali a terzi</strong> per
          finalità di marketing.
        </p>
      </section>

      <section>
        <h2>4. Base giuridica</h2>
        <p>
          Il trattamento è basato sull'esecuzione del contratto di acquisto, sull'adempimento
          di obblighi legali e, ove applicabile, sul consenso dell'utente.
        </p>
      </section>

      <section>
        <h2>5. Conservazione dei dati</h2>
        <p>
          I dati relativi agli acquisti sono conservati per <strong>10 anni</strong> al fine di
          adempiere agli obblighi fiscali e contabili previsti dalla normativa applicabile.
        </p>
      </section>

      <section>
        <h2>6. Pagamenti</h2>
        <p>
          I pagamenti sono gestiti esclusivamente da <strong>PayPal</strong> e <strong>Stripe</strong>,
          provider certificati PCI-DSS. <strong>Non conserviamo mai i dati della tua carta</strong>.
        </p>
      </section>

      <section>
        <h2>7. Diritti dell'utente</h2>
        <p>L'utente ha diritto a:</p>
        <ul>
          <li>Accedere ai propri dati personali</li>
          <li>Richiederne la rettifica</li>
          <li>Richiederne la cancellazione</li>
          <li>Richiederne la portabilità</li>
          <li>Opporsi al trattamento o limitarlo</li>
          <li>Revocare il consenso in qualsiasi momento</li>
        </ul>
        <p>
          Per esercitare tali diritti è possibile contattare il Titolare scrivendo a:{" "}
          <a href="mailto:idraulicodistratto@gmail.com">idraulicodistratto@gmail.com</a>
        </p>
      </section>

      <section>
        <h2>8. Sicurezza</h2>
        <p>
          Adottiamo misure tecniche e organizzative idonee a proteggere i dati personali da
          accessi non autorizzati, perdita o distruzione.
        </p>
      </section>

      <section>
        <h2>9. Modifiche</h2>
        <p>
          Ci riserviamo il diritto di modificare la presente Privacy Policy in qualsiasi momento.
          Le modifiche saranno pubblicate su questa pagina.
        </p>
      </section>
    </LegalLayout>
  );
}
