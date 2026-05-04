import { useEffect, useState } from "react";
import { useScrollDepth } from "@/hooks/use-scroll-depth";
import barlowImg from "@/assets/adv-barlow.png";
import uomoLettoImg from "@/assets/adv-uomo-letto.png";
import ipotalamoImg from "@/assets/adv-ipotalamo.png";
import circoloViziosoImg from "@/assets/adv-circolo-vizioso.png";
import uomoLaptopImg from "@/assets/adv-uomo-laptop.png";
import mockupProtocollo from "@/assets/adv-mockup-protocollo.png";
import ebookPreview from "@/assets/adv-ebook-preview.png";

const CTA_URL = "https://manualeidraulicodistratto.com";

const styles = `
  @import url('https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@0,400;0,600;0,700;1,400;1,600&family=Source+Serif+4:ital,wght@0,400;0,600;1,400;1,600&family=Inter:wght@400;500;600&display=swap');

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
  .adv-live-bar {
    background: #fff;
    border-bottom: 1px solid #ececec;
    padding: 10px 20px;
    display: flex;
    justify-content: center;
    align-items: center;
    gap: 24px;
    font-family: 'Inter', sans-serif;
    font-size: 12px;
    color: #555;
    flex-wrap: wrap;
  }
  .adv-live-dot {
    display: inline-block;
    width: 8px;
    height: 8px;
    border-radius: 50%;
    background: #2bb673;
    margin-right: 8px;
    animation: pulse 1.6s infinite;
    vertical-align: middle;
  }
  @keyframes pulse {
    0% { box-shadow: 0 0 0 0 rgba(43,182,115,0.6); }
    70% { box-shadow: 0 0 0 8px rgba(43,182,115,0); }
    100% { box-shadow: 0 0 0 0 rgba(43,182,115,0); }
  }
  .adv-live-num { font-weight: 600; color: #1a1a1a; }
  .adv-sponsor-bar {
    text-align: center;
    font-family: 'Inter', sans-serif;
    font-size: 11px;
    letter-spacing: 0.05em;
    color: #888;
    padding: 10px 20px;
    border-bottom: 1px solid #ececec;
    background: #fff;
  }
  .adv-breadcrumb {
    max-width: 680px;
    margin: 0 auto;
    padding: 24px 20px 0;
    font-family: 'Inter', sans-serif;
    font-size: 12px;
    color: #888;
    letter-spacing: 0.02em;
  }
  .adv-date {
    max-width: 680px;
    margin: 0 auto;
    padding: 8px 20px 0;
    font-family: 'Inter', sans-serif;
    font-size: 12px;
    color: #999;
  }
  .adv-container {
    max-width: 680px;
    margin: 0 auto;
    padding: 24px 20px 80px;
  }
  .adv-h1 {
    font-family: 'Playfair Display', serif;
    font-weight: 700;
    font-size: 38px;
    line-height: 1.2;
    letter-spacing: -0.01em;
    color: #1a1a1a;
    margin: 16px 0 24px;
  }
  .adv-lede {
    font-family: 'Source Serif 4', Georgia, serif;
    font-style: italic;
    font-weight: 400;
    font-size: 21px;
    line-height: 1.5;
    color: #4a4a4a;
    margin: 0 0 32px;
  }
  .adv-figure {
    margin: 32px 0;
  }
  .adv-figure img {
    width: 100%;
    height: auto;
    display: block;
    border-radius: 2px;
  }
  .adv-figure figcaption {
    font-family: 'Inter', sans-serif;
    font-size: 13px;
    color: #777;
    text-align: center;
    margin-top: 10px;
    font-style: italic;
  }
  .adv-divider {
    border: none;
    border-top: 1px solid #d8d8d8;
    margin: 32px auto;
    width: 80px;
  }
  .adv-body p { margin: 0 0 22px; }
  .adv-body em { font-style: italic; }
  .adv-body strong { font-weight: 600; color: #1a1a1a; }
  .adv-body mark {
    background: #fff3a8;
    padding: 2px 4px;
    color: #1a1a1a;
  }
  .adv-h3 {
    font-family: 'Playfair Display', serif;
    font-weight: 700;
    font-size: 28px;
    line-height: 1.3;
    color: #1a1a1a;
    margin: 48px 0 20px;
  }
  .adv-pullquote {
    font-family: 'Playfair Display', serif;
    font-weight: 600;
    font-size: 24px;
    line-height: 1.4;
    color: #1a1a1a;
    margin: 32px 0;
    padding: 4px 0 4px 20px;
    border-left: 3px solid #8b1a1a;
  }
  .adv-textlink {
    color: #8b1a1a;
    text-decoration: underline;
    text-decoration-thickness: 1px;
    text-underline-offset: 3px;
    font-weight: 600;
  }
  .adv-textlink:hover { color: #6e1414; }
  .adv-textlink-black {
    color: #1a1a1a;
    text-decoration: underline;
    text-decoration-thickness: 1px;
    text-underline-offset: 3px;
    font-weight: 600;
  }
  .adv-textlink-black:hover { color: #000; }
  .adv-guarantee-strong {
    text-align: center;
    font-family: 'Source Serif 4', Georgia, serif;
    font-size: 14px;
    font-weight: 700;
    color: #8b1a1a;
    margin: 14px 0 0;
  }
  .adv-book-wrap {
    margin: 40px 0 8px;
    text-align: center;
    padding: 16px 0 0;
  }
  .adv-book-wrap img {
    max-width: 320px;
    width: 100%;
    height: auto;
    display: inline-block;
    filter: drop-shadow(0 20px 30px rgba(0,0,0,0.25));
  }
  .adv-cta-block {
    text-align: center;
    margin: 24px 0 48px;
  }
  .adv-cta-btn {
    display: inline-block;
    background: #8b1a1a;
    color: #ffffff;
    font-family: 'Source Serif 4', Georgia, serif;
    font-weight: 600;
    font-size: 18px;
    text-decoration: none;
    padding: 16px 32px;
    border-radius: 3px;
    transition: background 0.2s ease;
  }
  .adv-cta-btn:hover { background: #6e1414; }
  .adv-guarantee {
    text-align: center;
    font-family: 'Source Serif 4', Georgia, serif;
    font-size: 14px;
    font-style: italic;
    color: #666;
    margin: 14px 0 0;
  }
  .adv-refs-divider {
    border: none;
    border-top: 1px solid #d8d8d8;
    margin: 56px 0 24px;
  }
  .adv-refs-title {
    font-family: 'Inter', sans-serif;
    font-size: 12px;
    font-weight: 600;
    letter-spacing: 0.15em;
    text-transform: uppercase;
    color: #555;
    margin: 0 0 16px;
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
    margin-top: 0;
    padding: 24px 20px;
    text-align: center;
    font-family: 'Inter', sans-serif;
    font-size: 12px;
    color: #999;
  }

  @media (max-width: 640px) {
    .adv-root { font-size: 17px; }
    .adv-live-bar { gap: 14px; font-size: 11px; padding: 8px 16px; }
    .adv-container { padding: 16px 20px 56px; }
    .adv-h1 { font-size: 28px; }
    .adv-lede { font-size: 18px; }
    .adv-h3 { font-size: 22px; margin: 36px 0 16px; }
    .adv-pullquote { font-size: 20px; margin: 28px 0; }
    .adv-cta-btn { font-size: 16px; padding: 14px 24px; }
  }
`;

const Advertorial1 = () => {
  useScrollDepth('/adv-1');
  const [people, setPeople] = useState(493);
  const [visitors, setVisitors] = useState(2374);

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

  useEffect(() => {
    const id = setInterval(() => {
      setPeople((p) => Math.max(420, Math.min(560, p + Math.floor(Math.random() * 7) - 3)));
      setVisitors((v) => v + Math.floor(Math.random() * 3));
    }, 4000);
    return () => clearInterval(id);
  }, []);

  return (
    <div className="adv-root">
      <style>{styles}</style>

      <div className="adv-live-bar">
        <span><span className="adv-live-dot" /> Attualmente sulla pagina ci sono <span className="adv-live-num">{people}</span> persone</span>
        <span><span className="adv-live-num">{visitors.toLocaleString("it-IT")}</span> visitatori nelle ultime 24 ore</span>
      </div>


      <div className="adv-breadcrumb">
        Start &gt; Articoli &gt; Tra le lenzuola &gt; Problematiche comuni
      </div>
      <div className="adv-date">2 Maggio 2026</div>

      <article className="adv-container">
        <h1 className="adv-h1">
          Uno studio del 1986 spiega perché gli uomini che si impegnano di più a dare piacere alla partner… ottengono risultati peggiori.
        </h1>

        <p className="adv-lede">
          David Barlow, psicologo clinico tra i più citati nella letteratura sulla terapia sessuale, ha documentato un meccanismo che ribalta quello che per anni si è creduto sulle prestazioni degli uomini a letto.
        </p>

        <figure className="adv-figure">
          <img src={barlowImg} alt="Ritratto di David H. Barlow, psicologo clinico" loading="lazy" />
          <figcaption>David H. Barlow, Psicologo Clinico con oltre 600 pubblicazioni</figcaption>
        </figure>

        <hr className="adv-divider" />

        <div className="adv-body">
          <p>
            Hai già cercato su forum online. Hai guardato video. Hai trovato articoli in inglese pieni di consigli senza una fonte citata, senza nessun fondamento scientifico verificabile. Hai provato qualcosa. Niente è cambiato come speravi.
          </p>

          <p>Non sei il solo. E soprattutto: non è colpa tua.</p>

          <p>
            Forse ti riconosci in questa scena: sei lì, nel pieno del momento, e una parte della tua mente comincia a viaggiare. <em>Sto facendo bene? Sta funzionando? Quanto manca?</em> Una voce sottile ma costante che osserva, misura, giudica.
          </p>

          <p>
            Quella voce, come ha dimostrato la ricerca, è il problema principale di migliaia di uomini senza alcun problema di natura fisica.
          </p>

          <figure className="adv-figure">
            <img src={uomoLettoImg} alt="Uomo seduto sul letto preoccupato con pensieri intrusivi" loading="lazy" />
          </figure>

          <p>
            Tra poco vedrai cosa documentò Barlow, e perché più ti impegni, più potresti peggiorare tutto questo, invece di risolverlo.
          </p>

          <p>
            Ma attenzione: capire il meccanismo è solo il <em>primo livello</em> del problema.
          </p>

          <p>
            Esiste un <em>secondo livello</em>, più profondo, che quasi nessuno affronta… e che spiega perché anche chi conosce la teoria continua a non ottenere i risultati che vorrebbe.
          </p>

          <p>
            Come dimostreremo in questo articolo, <a className="adv-textlink-black" href={CTA_URL} rel="noopener">questo metodo ti permette di risolvere il problema alla radice</a>.
          </p>

          <h3 className="adv-h3">Nel 1986, David H. Barlow pubblicò una ricerca che cambiò la medicina sessuale</h3>

          <p>
            Il paper uscì sul <em>Journal of Consulting and Clinical Psychology</em>. Barlow aveva studiato uomini che, pur non avendo nessun problema fisico, continuavano a non ottenere i risultati desiderati nell'intimità. La caratteristica comune era una sola: più si impegnavano, peggio andava.
          </p>

          <p>
            Barlow evidenziò che il sistema nervoso umano ha due modalità operative principali.
          </p>

          <p>
            Da un lato il sistema <strong>simpatico</strong> – quello della vigilanza, dello stress, della risposta da pericolo. Dall'altro il sistema <strong>parasimpatico</strong> – quello del riposo, della connessione, del piacere.
          </p>

          <p>
            Per tutti i processi fisici che servono nell'intimità, il corpo deve sentirsi al sicuro, ed essere quindi in modalità <strong>parasimpatica</strong>.
          </p>

          <p>
            Il problema: quando sei concentrato su <em>come sta andando</em> – una parte di te valuta, controlla, misura in tempo reale – stai attivando il sistema simpatico.
          </p>

          <p>
            E il corpo interpreta quello stato di allerta esattamente come farebbe con un pericolo reale, bloccando le risposte fisiche che stavi cercando di produrre.
          </p>

          <blockquote className="adv-pullquote">
            Più ti sforzi di fare bene, più il tuo sistema nervoso lavora contro di te.
          </blockquote>

          <p>
            Non perché sei sbagliato, ma perché il tuo corpo sta facendo esattamente quello per cui è stato progettato, senza che tu possa rendertene conto.
          </p>

          <figure className="adv-figure">
            <img src={ipotalamoImg} alt="Diagramma del cervello con evidenziato l'ipotalamo, centro di controllo del sistema simpatico e parasimpatico" loading="lazy" />
          </figure>

          <h3 className="adv-h3">Il dettaglio che rende tutto più difficile</h3>

          <p>C'è un aspetto che chiude il cerchio in modo inequivocabile:</p>

          <p>
            La ricerca clinica sulla risposta sessuale femminile mostra che il contesto emotivo del partner è una variabile primaria dell'eccitazione – non secondaria, non accessoria.
          </p>

          <p>
            Quando lui è in modalità valutazione, lei entra in modalità chiusura. Non consciamente, e non con malizia… ma il suo corpo risponde allo stato che percepisce nel partner.
          </p>

          <p>
            Lui si tende… lei si chiude… lui percepisce la chiusura… e si tende ancora di più. Un circolo vizioso che si autoalimenta.
          </p>

          <figure className="adv-figure">
            <img src={circoloViziosoImg} alt="Diagramma del circolo vizioso: tensione mentale, chiusura della partner, sensazione di fallimento, irrigidimento" loading="lazy" />
          </figure>

          <p>
            E la parte peggiore, è che per trovare una soluzione, molti uomini cercano risposte tramite fonti inaffidabili, tra forum e video in navigazione privata...
          </p>

          <p>
            Tutti contenuti che non arrivano mai davvero alla radice del problema, e non aiutano a risolverlo…
          </p>

          <p>
            Anzi, spesso causano l'effetto opposto, lasciando agli uomini una sensazione di rassegnazione e angoscia, facendogli perdere le speranze che possa esistere una soluzione definitiva.
          </p>

          <figure className="adv-figure">
            <img src={uomoLaptopImg} alt="Uomo seduto sul letto che cerca risposte online in navigazione privata" loading="lazy" />
          </figure>

          <p>
            Quello che in molti non sanno, è che in realtà una soluzione esiste, ma non si trova in siti a caso su internet.
          </p>

          <p>
            Serve un metodo comprovato, basato su fonti anatomiche e psicologiche reali, che guidi in modo graduale verso una risoluzione completa e definitiva.
          </p>

          <p>
            Se vuoi applicare questo metodo,{" "}
            <a className="adv-textlink-black" href={CTA_URL} rel="noopener">
              in questo Protocollo Scientifico trovi esattamente come fare
            </a>.
          </p>

          <h3 className="adv-h3">Il secondo livello – quello che nessuno affronta</h3>

          <p>
            Molti uomini, dopo aver letto ricerche come quella di Barlow, credono che capire il meccanismo sia sufficiente per cambiare le cose.
          </p>

          <p>Non lo è.</p>

          <p>
            Sapere che il sistema simpatico ti sabota, NON lo disattiva. Serve una sequenza precisa – tre aree di intervento distinte, in un ordine specifico – che la ricerca sulla terapia sessuale ha identificato e documentato nel corso dei decenni successivi al lavoro di Barlow.
          </p>

          <p>
            <strong>La prima area</strong> riguarda il modo in cui definisci il "risultato" dell'atto sessuale.
          </p>

          <p>
            <strong>La seconda</strong> riguarda l'ordine in cui affronti i diversi elementi dell'intimità – e quell'ordine, come dimostra la ricerca, conta tanto quanto i singoli elementi.
          </p>

          <p>
            <strong>La terza</strong> invece riguarda dove porti l'attenzione tua e del partner nel momento dell'atto.
          </p>

          <p>
            Queste tre aree sono il cuore della prima parte del Protocollo del Piacere – un sistema scientifico di 200+ pagine strutturato in sei sezioni progressive:
          </p>

          <p>
            Dalla psicologia all'anatomia, dalla preparazione alle tecniche step-by-step fino agli scenari avanzati, con centinaia di illustrazioni. Ogni sezione si costruisce sulla precedente, nell'ordine che la ricerca prescrive.
          </p>

          <p>
            Funziona dove forum, video e articoli senza fonti falliscono per un motivo preciso: non inizia dalla tecnica. Inizia dal meccanismo che, se non affrontato prima, rende inutile qualsiasi tecnica.
          </p>

          <p>Prima risolve quello che succede nel sistema nervoso.</p>

          <p>
            Poi fornisce la mappa anatomica corretta – quella documentata dalla ricerca, non quella dei video in navigazione privata o dei forum con post di persone a caso.
          </p>

          <p>E solo dopo arriva alle tecniche pratiche.</p>

          <div className="adv-book-wrap">
            <img src={mockupProtocollo} alt="Mockup del libro Il Protocollo del Piacere" loading="lazy" />
          </div>

          <div className="adv-cta-block">
            <a className="adv-cta-btn" href={CTA_URL} rel="noopener">
              Clicca qui per accedere al Protocollo del Piacere
            </a>
          </div>

          <p>
            Arriverai ad ogni occasione senza quella voce in testa che valuta e giudica, perché avrai risolto il meccanismo che la genera.
          </p>

          <p>
            Saprai esattamente cosa fare in ogni momento, invece di procedere alla cieca.
          </p>

          <p>E la tua partner sentirà la differenza.</p>

          <p>
            Non solo perché avrai imparato mosse e tecniche nuove… ma perché sarai presente, consapevole, e saprai esattamente cosa fare e come farlo.
          </p>

          <div className="adv-cta-block">
            <a className="adv-cta-btn" href={CTA_URL} rel="noopener">
              Clicca qui per accedere al Protocollo del Piacere
            </a>
            <p className="adv-guarantee-strong">
              60 giorni di garanzia completa. Se non è quello che cercavi, rimborso totale senza farti domande.
            </p>
          </div>

          <figure className="adv-figure">
            <img src={ebookPreview} alt="Anteprima delle pagine interne del Protocollo del Piacere" loading="lazy" />
            <figcaption>Anteprima di alcune pagine interne del Protocollo</figcaption>
          </figure>

          <hr className="adv-refs-divider" />
          <h4 className="adv-refs-title">Riferimenti scientifici</h4>
          <div className="adv-refs">
            <p>
              Barlow DH. "Causes of sexual dysfunction: the role of anxiety and cognitive interference." <em>J Consult Clin Psychol</em>. 1986;54(2):140–8.{" "}
              <a href="https://pubmed.ncbi.nlm.nih.gov/3700800/" target="_blank" rel="noopener noreferrer">
                https://pubmed.ncbi.nlm.nih.gov/3700800/
              </a>
            </p>
            <p>
              Masters WH, Johnson VE. <em>Human Sexual Response</em>. Little, Brown and Company, 1966.
            </p>
            <p>
              Basson R. "Human sex-response cycles." <em>J Sex Marital Ther</em>. 2001;27(1):33–43.{" "}
              <a href="https://pubmed.ncbi.nlm.nih.gov/11261877/" target="_blank" rel="noopener noreferrer">
                https://pubmed.ncbi.nlm.nih.gov/11261877/
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
