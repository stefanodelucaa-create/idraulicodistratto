import { useEffect } from "react";

const CTA_URL = "https://manualeidraulicodistratto.com";

const styles = `
  @import url('https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@0,400;0,600;0,700;1,400;1,600&family=Source+Serif+4:ital,wght@0,400;0,600;1,400&family=Inter:wght@400;500&display=swap');

  .adv-root {
    background: #fafafa;
    color: #1a1a1a;
    font-family: 'Source Serif 4', Georgia, serif;
    font-size: 19px;
    line-height: 1.7;
    min-height: 100vh;
    padding: 0;
    margin: 0;
    -webkit-font-smoothing: antialiased;
  }
  .adv-sponsor-bar {
    text-align: center;
    font-family: 'Inter', sans-serif;
    font-size: 11px;
    letter-spacing: 0.05em;
    color: #888;
    padding: 12px 20px;
    border-bottom: 1px solid #ececec;
    background: #fff;
  }
  .adv-container {
    max-width: 680px;
    margin: 0 auto;
    padding: 56px 20px 80px;
  }
  .adv-category {
    font-family: 'Inter', sans-serif;
    font-size: 12px;
    font-weight: 500;
    letter-spacing: 0.18em;
    text-transform: uppercase;
    color: #8b1a1a;
    margin-bottom: 24px;
    text-align: center;
  }
  .adv-h1 {
    font-family: 'Playfair Display', serif;
    font-weight: 700;
    font-size: 42px;
    line-height: 1.18;
    letter-spacing: -0.01em;
    color: #1a1a1a;
    margin: 0 0 24px;
    text-align: center;
  }
  .adv-subtitle {
    font-family: 'Playfair Display', serif;
    font-style: italic;
    font-weight: 400;
    font-size: 22px;
    line-height: 1.45;
    color: #4a4a4a;
    margin: 0 0 32px;
    text-align: center;
  }
  .adv-byline {
    font-family: 'Inter', sans-serif;
    font-size: 13px;
    color: #888;
    text-align: center;
    margin-bottom: 24px;
    letter-spacing: 0.02em;
  }
  .adv-divider {
    border: none;
    border-top: 1px solid #d8d8d8;
    margin: 32px auto 40px;
    width: 80px;
  }
  .adv-body p {
    margin: 0 0 22px;
  }
  .adv-body em { font-style: italic; }
  .adv-body strong { font-weight: 600; }
  .adv-h3 {
    font-family: 'Playfair Display', serif;
    font-weight: 600;
    font-size: 28px;
    line-height: 1.3;
    color: #1a1a1a;
    margin: 48px 0 20px;
  }
  .adv-pullquote {
    font-family: 'Playfair Display', serif;
    font-style: italic;
    font-weight: 500;
    font-size: 26px;
    line-height: 1.4;
    color: #8b1a1a;
    text-align: center;
    margin: 40px auto;
    padding: 8px 16px;
    max-width: 560px;
    border-top: 1px solid #e6d6d6;
    border-bottom: 1px solid #e6d6d6;
    padding-top: 24px;
    padding-bottom: 24px;
  }
  .adv-cta-box {
    border: 1px solid #8b1a1a;
    background: #fdf8f3;
    padding: 32px 28px;
    margin: 48px 0;
    text-align: center;
  }
  .adv-cta-title {
    font-family: 'Playfair Display', serif;
    font-weight: 700;
    font-size: 24px;
    color: #1a1a1a;
    margin: 0 0 12px;
  }
  .adv-cta-text {
    font-family: 'Source Serif 4', Georgia, serif;
    font-size: 17px;
    line-height: 1.55;
    color: #333;
    margin: 0 0 24px;
  }
  .adv-cta-btn {
    display: inline-block;
    background: #8b1a1a;
    color: #ffffff;
    font-family: 'Source Serif 4', Georgia, serif;
    font-weight: 600;
    font-size: 17px;
    text-decoration: none;
    padding: 14px 28px;
    border-radius: 3px;
    transition: background 0.2s ease;
  }
  .adv-cta-btn:hover { background: #6e1414; }
  .adv-guarantee {
    text-align: center;
    font-family: 'Inter', sans-serif;
    font-size: 13px;
    color: #777;
    margin: -24px 0 48px;
  }
  .adv-refs-title {
    font-family: 'Inter', sans-serif;
    font-size: 12px;
    font-weight: 600;
    letter-spacing: 0.15em;
    text-transform: uppercase;
    color: #555;
    margin: 56px 0 16px;
  }
  .adv-refs {
    font-family: 'Source Serif 4', Georgia, serif;
    font-size: 13px;
    line-height: 1.6;
    color: #666;
  }
  .adv-refs p { margin: 0 0 10px; }
  .adv-refs a { color: #8b1a1a; text-decoration: underline; word-break: break-all; }
  .adv-footer {
    border-top: 1px solid #ececec;
    margin-top: 64px;
    padding: 24px 20px;
    text-align: center;
    font-family: 'Inter', sans-serif;
    font-size: 12px;
    color: #999;
  }

  @media (max-width: 640px) {
    .adv-root { font-size: 17px; }
    .adv-container { padding: 32px 20px 56px; }
    .adv-h1 { font-size: 30px; }
    .adv-subtitle { font-size: 18px; }
    .adv-h3 { font-size: 22px; margin: 36px 0 16px; }
    .adv-pullquote { font-size: 20px; margin: 32px auto; }
    .adv-cta-box { padding: 24px 20px; }
    .adv-cta-title { font-size: 20px; }
    .adv-cta-btn { font-size: 16px; padding: 13px 22px; }
  }
`;

const Advertorial1 = () => {
  useEffect(() => {
    document.title = "Uno studio del 1986 spiega perché chi si impegna di più ottiene risultati peggiori";
    const meta = document.querySelector('meta[name="description"]') || (() => {
      const m = document.createElement("meta");
      m.setAttribute("name", "description");
      document.head.appendChild(m);
      return m;
    })();
    meta.setAttribute(
      "content",
      "Una ricerca clinica del 1986 di David Barlow rivela perché lo sforzo di controllo sabota la risposta sessuale maschile."
    );
  }, []);

  return (
    <div className="adv-root">
      <style>{styles}</style>

      <div className="adv-sponsor-bar">
        Articolo sponsorizzato · Contenuto informativo basato su ricerca clinica
      </div>

      <article className="adv-container">
        <div className="adv-category">Psicologia · Salute Maschile</div>

        <h1 className="adv-h1">
          Uno studio del 1986 spiega perché gli uomini che si impegnano di più a dare piacere alla partner… ottengono risultati peggiori.
        </h1>

        <h2 className="adv-subtitle">
          David Barlow, psicologo clinico tra i più citati nella letteratura sulla terapia sessuale, ha documentato un meccanismo che ribalta quello che si credeva sul fallimento sessuale maschile.
        </h2>

        <div className="adv-byline">Di Redazione · 30 aprile 2026</div>

        <hr className="adv-divider" />

        <div className="adv-body">
          <p>
            Hai già cercato su forum online. Hai guardato video. Hai trovato articoli in inglese pieni di consigli senza una fonte citata, senza nessun fondamento scientifico verificabile. Hai provato qualcosa. Niente è cambiato come speravi.
          </p>
          <p>Non sei il solo. E soprattutto: non è colpa tua.</p>
          <p>
            Forse ti riconosci in questo: sei lì, nel momento, e una parte della tua mente sta già valutando. <em>Sto facendo bene? Sta funzionando? Quanto manca?</em> Una voce sottile ma costante che osserva, misura, giudica.
          </p>

          <blockquote className="adv-pullquote">
            «Quella voce, come ha dimostrato la ricerca, è il tuo problema principale.»
          </blockquote>

          <p>
            Tra poco vedrai cosa documentò Barlow, e perché l'impegno potrebbe essere la causa diretta dei problemi, non la soluzione.
          </p>
          <p>
            Ma attenzione: capire il meccanismo è solo il primo livello del problema. Esiste un secondo livello, più profondo, che quasi nessuno affronta… e che spiega perché anche chi conosce la teoria continua a non ottenere i risultati che cerca. Lo trovi più avanti in questo articolo.
          </p>

          <h3 className="adv-h3">Nel 1986, David Barlow pubblicò una ricerca che cambiò la medicina sessuale</h3>

          <p>
            Il paper uscì sul <em>Journal of Consulting and Clinical Psychology</em>. Barlow aveva studiato uomini che, pur non avendo nessun problema fisico, continuavano a non ottenere i risultati desiderati nell'intimità. La caratteristica comune era una sola: più si impegnavano, peggio andava.
          </p>
          <p>
            Barlow evidenziò che il sistema nervoso umano ha due modalità operative principali.
          </p>
          <p>
            Da un lato il sistema simpatico — quello della vigilanza, dello stress, della risposta da pericolo. Dall'altro il sistema parasimpatico — quello del riposo, della connessione, del piacere. Per tutti i processi fisici che servono nell'intimità, il corpo deve essere in modalità parasimpatica.
          </p>
          <p>
            Il problema: quando sei concentrato su <em>come sta andando</em> — quando una parte di te valuta, controlla, misura in tempo reale — stai attivando il simpatico. Il corpo interpreta quella vigilanza cognitiva esattamente come farebbe con un pericolo reale. E blocca le risposte fisiche che stavi cercando di produrre.
          </p>

          <blockquote className="adv-pullquote">
            «Più ti sforzi di fare bene, più il tuo sistema nervoso lavora contro di te.»
          </blockquote>

          <p>
            Non perché sei sbagliato, ma perché il tuo corpo sta facendo esattamente quello per cui è stato progettato.
          </p>

          <h3 className="adv-h3">Il dettaglio che rende tutto più difficile</h3>

          <p>C'è un aspetto che chiude il cerchio in modo inequivocabile:</p>
          <p>
            La ricerca clinica sulla risposta sessuale femminile mostra che il contesto emotivo del partner è una variabile primaria dell'eccitazione — non secondaria, non accessoria. Quando lui è in modalità valutazione, lei entra in modalità chiusura. Non consciamente. Ma il suo corpo risponde al suo stato.
          </p>
          <p>
            Lui si tende, lei si chiude, lui percepisce la chiusura e si tende di più.
          </p>
          <p>
            In questo contesto, vengono cercate risposte tra forum e video in navigazione privata… ma nessuno di questi contenuti arriva davvero alla radice del problema.
          </p>

          <div className="adv-cta-box">
            <h4 className="adv-cta-title">Protocollo del Piacere</h4>
            <p className="adv-cta-text">
              Un sistema scientifico di oltre 200 pagine, strutturato in sei sezioni progressive. Dalla psicologia all'anatomia, dalle tecniche step-by-step agli scenari avanzati.
            </p>
            <a className="adv-cta-btn" href={CTA_URL} rel="noopener">
              Scopri il Protocollo del Piacere →
            </a>
          </div>

          <h3 className="adv-h3">Il secondo livello — quello che nessuno affronta</h3>

          <p>
            Molti uomini, dopo aver letto ricerche come quella di Barlow, credono che capire il meccanismo sia sufficiente per cambiare le cose.
          </p>
          <p>Non lo è.</p>
          <p>
            Sapere che il sistema simpatico ti sabota, NON lo disattiva. Serve una sequenza precisa — tre aree di intervento distinte, in un ordine specifico — che la ricerca sulla terapia sessuale ha identificato e documentato nel corso dei decenni successivi al lavoro di Barlow.
          </p>

          <blockquote className="adv-pullquote">
            «Non inizia dalla tecnica. Inizia dal meccanismo che, se non affrontato prima, rende inutile qualsiasi tecnica.»
          </blockquote>

          <p>La prima area riguarda come definisci il risultato di quello che stai facendo.</p>
          <p>
            La seconda riguarda l'ordine in cui affronti i diversi elementi dell'intimità — e quell'ordine, come dimostra la ricerca, conta quanto i singoli elementi.
          </p>
          <p>La terza riguarda dove porti l'attenzione nel momento stesso.</p>
          <p>
            Queste tre aree sono il cuore della prima parte del Protocollo del Piacere — un sistema scientifico di 200+ pagine strutturato in sei sezioni progressive: dalla psicologia all'anatomia, dalla preparazione alle tecniche step-by-step fino agli scenari avanzati, con centinaia di illustrazioni. Ogni sezione costruisce sulla precedente, nell'ordine che la ricerca prescrive.
          </p>
          <p>
            Funziona dove forum, video e articoli senza fonti falliscono per un motivo preciso: non inizia dalla tecnica. Inizia dal meccanismo che, se non affrontato prima, rende inutile qualsiasi tecnica. Prima risolve quello che succede nel sistema nervoso.
          </p>
          <p>
            Poi fornisce la mappa anatomica corretta — quella che la ricerca aggiornata documenta, non quella dei contenuti online senza fonti. Solo dopo arriva alle tecniche pratiche.
          </p>

          <h3 className="adv-h3">La trasformazione che produce</h3>

          <p>
            Entri in ogni occasione senza quella voce in testa che valuta e giudica — perché il meccanismo che la genera è stato risolto, non ignorato.
          </p>
          <p>
            Sai esattamente dove ti trovi nella risposta di lei in ogni momento — e cosa fare in ciascuno di quei momenti invece di procedere alla cieca.
          </p>
          <p>
            E lei sente la differenza. Non perché hai imparato mosse nuove. Perché sei presente, consapevole, e sai quello che stai facendo e perché lo stai facendo.
          </p>

          <div className="adv-cta-box">
            <h4 className="adv-cta-title">Protocollo del Piacere</h4>
            <p className="adv-cta-text">
              Un sistema scientifico di oltre 200 pagine, strutturato in sei sezioni progressive. Dalla psicologia all'anatomia, dalle tecniche step-by-step agli scenari avanzati.
            </p>
            <a className="adv-cta-btn" href={CTA_URL} rel="noopener">
              Scopri il Protocollo del Piacere →
            </a>
          </div>

          <p className="adv-guarantee">✓ 60 giorni di garanzia completa. Rimborso totale senza domande.</p>

          <h4 className="adv-refs-title">Riferimenti scientifici</h4>
          <div className="adv-refs">
            <p>
              Barlow DH. "Causes of sexual dysfunction: the role of anxiety and cognitive interference." <em>J Consult Clin Psychol</em>. 1986;54(2):140–8.{" "}
              <a href="https://pubmed.ncbi.nlm.nih.gov/3700800/" target="_blank" rel="noopener noreferrer">
                pubmed.ncbi.nlm.nih.gov/3700800/
              </a>
            </p>
            <p>
              Masters WH, Johnson VE. <em>Human Sexual Response</em>. Little, Brown and Company, 1966.
            </p>
            <p>
              Basson R. "Human sex-response cycles." <em>J Sex Marital Ther</em>. 2001;27(1):33–43.{" "}
              <a href="https://pubmed.ncbi.nlm.nih.gov/11261877/" target="_blank" rel="noopener noreferrer">
                pubmed.ncbi.nlm.nih.gov/11261877/
              </a>
            </p>
          </div>
        </div>
      </article>

      <footer className="adv-footer">
        © 2026 · Contenuto sponsorizzato · manualeidraulicodistratto.com
      </footer>
    </div>
  );
};

export default Advertorial1;
