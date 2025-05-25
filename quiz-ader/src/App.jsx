import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'

// Array di oggetti per le domande del quiz
// Ogni oggetto contiene:
// - question: la domanda
// - options: un array di 4 opzioni di risposta
// - correct: l'indice (0-3) della risposta corretta
// - explanation: la spiegazione dettagliata della risposta
const questions = [
  {
    question: "Qual è l'atto principale con cui l'Agenzia delle Entrate-Riscossione avvia la riscossione coattiva dei tributi?",
    options: ["Avviso di accertamento", "Cartella di pagamento", "Intimazione ad adempiere", "Decreto ingiuntivo"],
    correct: 1,
    explanation: "La cartella di pagamento è l'atto con cui l'ente creditore (o l'agente della riscossione per suo conto) intima al debitore il pagamento di somme dovute a seguito di un controllo o di un omesso versamento."
  },
  {
    question: "In materia di riscossione, cos'è il fermo amministrativo di beni mobili registrati?",
    options: ["Un provvedimento che impedisce la vendita del bene", "Un provvedimento cautelare che impedisce la circolazione del bene", "Un atto di pignoramento del bene", "Una sanzione accessoria per mancato pagamento"],
    correct: 1,
    explanation: "Il fermo amministrativo è una misura cautelare che l'Agenzia delle Entrate-Riscossione può disporre sui beni mobili registrati (es. autoveicoli) del debitore, impedendone la circolazione fino al pagamento del debito o alla sua rateizzazione."
  },
  {
    question: "Secondo la Legge 241/1990, quale dei seguenti NON è un vizio di legittimità dell'atto amministrativo?",
    options: ["Incompetenza", "Eccesso di potere", "Violazione di legge", "Inopportunità nel merito"],
    correct: 3,
    explanation: "L'inopportunità nel merito attiene alla discrezionalità amministrativa e non costituisce un vizio di legittimità dell'atto, a differenza di incompetenza, eccesso di potere e violazione di legge."
  },
  {
    question: "Il diritto di accesso ai documenti amministrativi è garantito principalmente per tutelare:",
    options: ["Esclusivamente interessi pubblici generali", "Interessi giuridicamente rilevanti del richiedente", "La curiosità dei cittadini", "Le esigenze investigative della magistratura"],
    correct: 1,
    explanation: "Il diritto di accesso, disciplinato dalla L. 241/1990, è finalizzato ad assicurare la trasparenza dell'attività amministrativa e a tutelare situazioni giuridicamente rilevanti del soggetto che ne fa richiesta."
  },
  {
    question: "Quale tra i seguenti NON è un elemento essenziale del contratto ai sensi dell'art. 1325 c.c.?",
    options: ["L'accordo delle parti", "La causa", "La condizione", "L'oggetto"],
    correct: 2,
    explanation: "Gli elementi essenziali del contratto, secondo l'art. 1325 del Codice Civile, sono: l'accordo delle parti, la causa, l'oggetto e la forma (quando prescritta dalla legge sotto pena di nullità). La condizione è un elemento accidentale."
  },
  {
    question: "L'inadempimento di un'obbligazione pecuniaria cosa comporta principalmente per il debitore?",
    options: ["La risoluzione automatica del contratto", "L'obbligo di corrispondere gli interessi moratori", "L'impossibilità sopravvenuta della prestazione", "L'esclusione da futuri contratti"],
    correct: 1,
    explanation: "In caso di inadempimento di un'obbligazione pecuniaria, il debitore è tenuto, oltre al pagamento del capitale, a corrispondere gli interessi moratori, che rappresentano il risarcimento per il ritardo."
  },
  {
    question: "Chi è considerato 'piccolo imprenditore' ai sensi dell'art. 2083 del Codice Civile?",
    options: ["L'imprenditore che esercita un'attività con un massimo di 5 dipendenti", "L'imprenditore che ha un fatturato annuo inferiore a 100.000 euro", "Colui che esercita un'attività professionale organizzata prevalentemente con il lavoro proprio e dei componenti della famiglia", "L'imprenditore che non è iscritto al Registro delle Imprese"],
    correct: 2,
    explanation: "L'art. 2083 c.c. definisce piccolo imprenditore colui che esercita un'attività professionale organizzata prevalentemente con il lavoro proprio e dei componenti della famiglia (es. coltivatori diretti, artigiani)."
  },
  {
    question: "In una Società a Responsabilità Limitata (S.r.l.), chi risponde per le obbligazioni sociali?",
    options: ["Soltanto i soci illimitatamente", "Soltanto la società con il suo patrimonio", "I soci e la società solidalmente e illimitatamente", "Gli amministratori personalmente"],
    correct: 1,
    explanation: "Nelle S.r.l., per le obbligazioni sociali risponde soltanto la società con il suo patrimonio. La responsabilità dei soci è limitata alla quota conferita (autonomia patrimoniale perfetta)."
  },
  {
    question: "Quale principio costituzionale afferma che 'tutti sono tenuti a concorrere alle spese pubbliche in ragione della loro capacità contributiva'?",
    options: ["Principio di legalità (Art. 23 Cost.)", "Principio di universalità dell'imposizione", "Principio di progressività (Art. 53 Cost.)", "Principio di capacità contributiva (Art. 53 Cost.)"],
    correct: 3,
    explanation: "L'articolo 53 della Costituzione stabilisce che tutti sono tenuti a concorrere alle spese pubbliche in ragione della loro capacità contributiva e che il sistema tributario è informato a criteri di progressività."
  },
  {
    question: "Cos'è lo Statuto dei diritti del contribuente?",
    options: ["Una legge che elenca le sanzioni per evasione fiscale", "Un regolamento interno dell'Agenzia delle Entrate", "Una legge (L. 212/2000) che attua i principi di trasparenza, collaborazione e buona fede nei rapporti tra fisco e contribuente", "Un accordo internazionale sulla doppia imposizione"],
    correct: 2,
    explanation: "Lo Statuto dei diritti del contribuente (Legge n. 212 del 2000) disciplina i principi generali dell'ordinamento tributario in attuazione degli articoli 3, 23, 53 e 97 della Costituzione, con particolare attenzione alla chiarezza delle norme, alla collaborazione e buona fede."
  },
  {
    question: "Quali sono i documenti che compongono il bilancio d'esercizio secondo il Codice Civile italiano (per le società di capitali)?",
    options: ["Solo Stato Patrimoniale e Conto Economico", "Stato Patrimoniale, Conto Economico e Nota Integrativa", "Stato Patrimoniale, Conto Economico, Nota Integrativa e Rendiconto Finanziario", "Libro giornale e Libro inventari"],
    correct: 2,
    explanation: "Il bilancio d'esercizio, secondo l'art. 2423 c.c., si compone di Stato Patrimoniale, Conto Economico, Rendiconto Finanziario e Nota Integrativa."
  },
  {
    question: "Cosa rappresenta il Conto Economico nel bilancio d'esercizio?",
    options: ["L'elenco delle attività e passività dell'azienda in un dato momento", "Il flusso di cassa generato e utilizzato dall'azienda in un periodo", "I costi e i ricavi di competenza di un esercizio e il risultato economico conseguito", "Le variazioni del patrimonio netto"],
    correct: 2,
    explanation: "Il Conto Economico espone i componenti positivi (ricavi) e negativi (costi) di reddito relativi a un determinato esercizio amministrativo, evidenziando l'utile o la perdita conseguiti."
  },
  {
    question: "Cosa si intende per 'struttura organizzativa funzionale' di un'azienda?",
    options: ["Un'organizzazione basata sulle diverse linee di prodotto", "Un'organizzazione in cui i dipendenti riportano a più capi contemporaneamente", "Un'organizzazione che raggruppa le attività per funzioni specialistiche (es. produzione, marketing, finanza)", "Un'organizzazione basata su team di progetto autonomi"],
    correct: 2,
    explanation: "La struttura organizzativa funzionale raggruppa le persone e le attività in base alle funzioni aziendali specialistiche (es. Direzione Produzione, Direzione Commerciale, Direzione Amministrativa)."
  },
  {
    question: "Il 'Break-Even Point' (punto di pareggio) indica:",
    options: ["Il livello massimo di produzione raggiungibile", "Il volume di produzione o vendita al quale i ricavi totali eguagliano i costi totali", "Il profitto minimo che l'azienda deve realizzare", "Il momento in cui l'azienda inizia a registrare perdite"],
    correct: 1,
    explanation: "Il Break-Even Point è il punto in cui i ricavi totali coprono esattamente i costi totali (fissi e variabili), pertanto l'azienda non realizza né utili né perdite."
  },
  {
    question: "Quale tipo di tributo è l'IRPEF?",
    options: ["Imposta indiretta", "Imposta diretta", "Tassa", "Contributo"],
    correct: 1,
    explanation: "L'IRPEF (Imposta sul Reddito delle Persone Fisiche) è un'imposta diretta, in quanto colpisce direttamente il reddito prodotto dal contribuente."
  },
  {
    question: "Cosa si intende per 'sanzione amministrativa tributaria'?",
    options: ["Una pena detentiva", "Una multa pecuniaria per violazioni di norme tributarie", "Un risarcimento del danno", "Una misura cautelare"],
    correct: 1,
    explanation: "La sanzione amministrativa tributaria è una penalità pecuniaria (multa) applicata in caso di violazione di norme tributarie, con lo scopo di punire il comportamento illecito e disincentivare future infrazioni."
  },
  {
    question: "Qual è il termine di decadenza per l'accertamento dell'IVA?",
    options: ["31 dicembre del quinto anno successivo a quello in cui è stata presentata la dichiarazione", "31 dicembre del quarto anno successivo a quello in cui è stata presentata la dichiarazione", "31 dicembre del terzo anno successivo a quello in cui è stata presentata la dichiarazione", "31 dicembre del secondo anno successivo a quello in cui è stata presentata la dichiarazione"],
    correct: 1,
    explanation: "Il termine di decadenza per l'accertamento dell'IVA è il 31 dicembre del quarto anno successivo a quello in cui è stata presentata la dichiarazione. In caso di omessa dichiarazione, il termine è il 31 dicembre del quinto anno."
  },
  {
    question: "Cosa si intende per 'solidarietà tributaria'?",
    options: ["L'obbligo di un solo soggetto di pagare l'imposta", "La responsabilità di più soggetti per il pagamento di un medesimo tributo", "La possibilità di compensare i debiti", "Il diritto di chiedere la dilazione"],
    correct: 1,
    explanation: "La solidarietà tributaria si ha quando più soggetti sono obbligati, per legge, al pagamento di un medesimo tributo, in modo che l'adempimento di uno libera gli altri."
  },
  {
    question: "Qual è la funzione del 'tasso legale degli interessi'?",
    options: ["Il tasso applicato dalle banche", "Il tasso di interesse stabilito dalla legge per diverse finalità, inclusi i ritardi di pagamento", "Il tasso di inflazione", "Il tasso di cambio"],
    correct: 1,
    explanation: "Il tasso legale degli interessi è un tasso di interesse stabilito dalla legge (e aggiornato periodicamente) che si applica in diverse situazioni, come gli interessi moratori per i ritardi di pagamento."
  },
  {
    question: "Cosa si intende per 'autotutela tributaria'?",
    options: ["Il diritto del contribuente di non pagare", "Il potere dell'Amministrazione finanziaria di annullare o rettificare i propri atti illegittimi o infondati", "La possibilità di chiedere un condono", "La sospensione della riscossione"],
    correct: 1,
    explanation: "L'autotutela tributaria è il potere dell'Amministrazione finanziaria di annullare o revocare, in tutto o in parte, i propri atti illegittimi o infondati, anche senza l'intervento del giudice."
  },
  {
    question: "Qual è la funzione della 'notifica' di un atto tributario?",
    options: ["Rendere l'atto segreto", "Portare l'atto a conoscenza legale del destinatario", "Archiviare l'atto", "Creare l'atto"],
    correct: 1,
    explanation: "La notifica è l'atto giuridico con cui un documento (es. cartella di pagamento, avviso di accertamento) viene portato legalmente a conoscenza del suo destinatario, producendo effetti giuridici."
  },
  {
    question: "Cosa si intende per 'ricorso gerarchico' in diritto amministrativo?",
    options: ["Un ricorso al giudice", "Un ricorso presentato a un organo superiore rispetto a quello che ha emanato l'atto", "Un ricorso al TAR", "Un ricorso al Presidente della Repubblica"],
    correct: 1,
    explanation: "Il ricorso gerarchico è un rimedio amministrativo con cui si chiede a un'autorità amministrativa superiore di annullare o riformare un atto amministrativo emanato da un'autorità subordinata."
  },
  {
    question: "Qual è la funzione del 'principio di imparzialità' dell'azione amministrativa?",
    options: ["Favorire alcuni cittadini", "Garantire che l'azione amministrativa sia svolta senza discriminazioni e favoritismi", "Agire nell'interesse esclusivo dell'Amministrazione", "Non tenere conto delle esigenze dei cittadini"],
    correct: 1,
    explanation: "Il principio di imparzialità (art. 97 Cost.) impone alla Pubblica Amministrazione di agire in modo obiettivo, senza favoritismi o discriminazioni, trattando in modo uguale situazioni uguali e in modo diverso situazioni diverse."
  },
  {
    question: "Cosa si intende per 'discrezionalità amministrativa'?",
    options: ["L'arbitrio della Pubblica Amministrazione", "Il margine di scelta concesso alla P.A. dalla legge per la cura dell'interesse pubblico", "L'obbligo di agire in un unico modo", "L'impossibilità di agire"],
    correct: 1,
    explanation: "La discrezionalità amministrativa è il potere della Pubblica Amministrazione di scegliere, tra più comportamenti leciti, quello più opportuno per la cura dell'interesse pubblico, nel rispetto dei limiti stabiliti dalla legge."
  },
  {
    question: "Quale tra i seguenti NON è un elemento essenziale del contratto?",
    options: ["La forma, quando richiesta ad substantiam", "La rappresentanza", "La causa", "L'oggetto"],
    correct: 1,
    explanation: "La rappresentanza è un istituto giuridico che permette a un soggetto (rappresentante) di agire in nome e per conto di un altro (rappresentato), ma non è un elemento essenziale del contratto in sé."
  },
  {
    question: "Cosa si intende per 'rescissione del contratto'?",
    options: ["Lo scioglimento del contratto per mutuo consenso", "Lo scioglimento del contratto concluso in stato di pericolo o di bisogno", "La risoluzione del contratto per inadempimento", "La nullità del contratto"],
    correct: 1,
    explanation: "La rescissione del contratto è un rimedio che la legge concede alla parte che ha stipulato un contratto in condizioni inique, a causa di uno stato di pericolo o di bisogno."
  },
  {
    question: "Qual è il termine di prescrizione per l'azione di annullamento di un contratto?",
    options: ["1 anno", "5 anni", "10 anni", "Non si prescrive"],
    correct: 1,
    explanation: "L'azione di annullamento di un contratto si prescrive in 5 anni dal giorno in cui è cessata la violenza, è stato scoperto l'errore o il dolo, o dalla conclusione del contratto negli altri casi."
  },
  {
    question: "Cosa si intende per 'clausola risolutiva espressa'?",
    options: ["Una clausola che prevede la risoluzione del contratto in caso di mutuo consenso", "Una clausola che stabilisce che il contratto si risolve di diritto se una determinata obbligazione non è adempiuta secondo le modalità stabilite", "Una clausola che prevede una penale", "Una clausola che sospende gli effetti del contratto"],
    correct: 1,
    explanation: "La clausola risolutiva espressa è una pattuizione con cui le parti convengono che il contratto si risolva di diritto qualora una determinata obbligazione non sia adempiuta secondo le modalità stabilite."
  },
  {
    question: "Qual è la funzione del 'danno emergente' e del 'lucro cessante' nel risarcimento del danno?",
    options: ["Sono due tipi di sanzioni", "Sono le componenti del danno risarcibile (perdita subita e mancato guadagno)", "Sono i costi di produzione", "Sono i ricavi dell'azienda"],
    correct: 1,
    explanation: "Il danno emergente è la perdita economica immediata subita a causa dell'inadempimento o dell'illecito. Il lucro cessante è il mancato guadagno che il soggetto avrebbe ottenuto se l'inadempimento o l'illecito non si fossero verificati."
  },
  {
    question: "Cosa si intende per 'responsabilità oggettiva'?",
    options: ["La responsabilità basata sulla colpa", "La responsabilità che prescinde dalla colpa o dal dolo, basata sul solo nesso di causalità tra fatto e danno", "La responsabilità penale", "La responsabilità limitata"],
    correct: 1,
    explanation: "La responsabilità oggettiva si ha quando un soggetto è chiamato a rispondere di un danno anche in assenza di dolo o colpa, ma per il solo fatto di aver causato il danno o di trovarsi in una determinata posizione (es. responsabilità per cose in custodia)."
  },
  {
    question: "Quale tra i seguenti è un contratto reale?",
    options: ["La compravendita", "Il mutuo", "La locazione", "Il mandato"],
    correct: 1,
    explanation: "Il contratto reale è un contratto che si perfeziona con la consegna della cosa, oltre che con il consenso delle parti (es. mutuo, comodato, deposito). La compravendita è un contratto consensuale."
  },
  {
    question: "Cosa si intende per 'simulazione del contratto'?",
    options: ["Un errore nella stipulazione del contratto", "Un accordo tra le parti per creare l'apparenza di un contratto diverso da quello realmente voluto", "Un contratto nullo", "Un contratto annullabile"],
    correct: 1,
    explanation: "La simulazione del contratto si ha quando le parti stipulano un contratto con l'intesa che esso non produca effetti tra loro (simulazione assoluta) o che produca effetti diversi da quelli apparenti (simulazione relativa)."
  },
  {
    question: "Qual è la funzione del 'diritto di prelazione'?",
    options: ["Il diritto di acquistare un bene per primo, a parità di condizioni", "Il diritto di vendere un bene per primo", "Il diritto di non vendere un bene", "Il diritto di espropriare un bene"],
    correct: 0,
    explanation: "Il diritto di prelazione è il diritto di un soggetto di essere preferito a terzi, a parità di condizioni, nell'acquisto di un determinato bene o nella stipulazione di un contratto."
  },
  {
    question: "Cosa si intende per 'società a responsabilità limitata semplificata' (S.r.l.s.)?",
    options: ["Una S.r.l. con capitale sociale illimitato", "Una S.r.l. con un capitale sociale minimo ridotto e procedure semplificate di costituzione", "Una società di persone", "Una società che non può avere soci"],
    correct: 1,
    explanation: "La S.r.l.s. è una forma semplificata di S.r.l., introdotta per favorire l'imprenditoria giovanile, con un capitale sociale minimo molto basso (anche 1 euro) e costi di costituzione ridotti."
  },
  {
    question: "Qual è la funzione del 'collegio sindacale' nelle società di capitali?",
    options: ["Gestire l'impresa", "Controllare la regolarità amministrativa e contabile della società", "Rappresentare i soci", "Emettere obbligazioni"],
    correct: 1,
    explanation: "Il collegio sindacale è l'organo di controllo interno delle società di capitali, con il compito di vigilare sull'osservanza della legge e dello statuto, sul rispetto dei principi di corretta amministrazione e sull'adeguatezza dell'assetto organizzativo, amministrativo e contabile."
  },
  {
    question: "Cosa si intende per 'liquidazione di una società'?",
    options: ["La fusione con un'altra società", "La fase in cui una società cessa la propria attività e provvede a pagare i debiti e ripartire l'attivo residuo tra i soci", "L'aumento di capitale sociale", "La trasformazione della società"],
    correct: 1,
    explanation: "La liquidazione di una società è la fase in cui la società, dopo aver cessato l'attività, provvede a realizzare l'attivo, estinguere le passività e ripartire l'eventuale residuo tra i soci."
  },
  {
    question: "Qual è la funzione della 'Camera di Commercio'?",
    options: ["Emettere leggi", "Gestire il Registro delle Imprese e fornire servizi alle imprese", "Riscuotere le imposte", "Amministrare la giustizia"],
    correct: 1,
    explanation: "La Camera di Commercio, Industria, Artigianato e Agricoltura (CCIAA) è un ente pubblico che svolge funzioni di promozione e tutela degli interessi delle imprese, gestendo il Registro delle Imprese e fornendo servizi di supporto."
  },
  {
    question: "Cosa si intende per 'concordato preventivo'?",
    options: ["Una procedura fallimentare", "Una procedura concorsuale che consente all'imprenditore in crisi di proporre ai creditori un accordo per ristrutturare il debito", "Un accordo tra soci", "Un contratto di finanziamento"],
    correct: 1,
    explanation: "Il concordato preventivo è una procedura concorsuale che permette all'imprenditore in stato di crisi o insolvenza di evitare il fallimento, proponendo ai creditori un piano di ristrutturazione del debito e di soddisfazione dei crediti."
  },
  {
    question: "Qual è la funzione del 'revisore legale' nelle società?",
    options: ["Gestire l'impresa", "Certificare la regolarità del bilancio d'esercizio", "Rappresentare i creditori", "Emettere sentenze"],
    correct: 1,
    explanation: "Il revisore legale (o società di revisione) ha il compito di esprimere un giudizio sulla regolarità e veridicità del bilancio d'esercizio, attestandone la conformità alle norme di legge e ai principi contabili."
  },
  {
    question: "Cosa si intende per 'gestione per eccezioni'?",
    options: ["Un metodo di gestione che si concentra solo sui problemi", "Un approccio in cui il management interviene solo quando le prestazioni si discostano significativamente dagli standard o dagli obiettivi", "Una gestione autoritaria", "Una gestione senza controllo"],
    correct: 1,
    explanation: "La gestione per eccezioni è un principio di gestione in cui il management si concentra solo sui casi che si discostano significativamente dalla norma o dagli obiettivi prefissati, lasciando le operazioni standard ai livelli inferiori."
  },
  {
    question: "Qual è la funzione della 'catena del valore' di Porter?",
    options: ["Descrivere la gerarchia aziendale", "Analizzare le attività primarie e di supporto che creano valore per il cliente", "Rappresentare i flussi finanziari", "Elencare i prodotti"],
    correct: 1,
    explanation: "La catena del valore di Porter è un modello che scompone l'azienda in attività strategiche (primarie e di supporto) per analizzare come ciascuna di esse contribuisce alla creazione di valore per il cliente e al vantaggio competitivo."
  },
  {
    question: "Cosa si intende per 'costo opportunità'?",
    options: ["Il costo monetario di un'azione", "Il valore della migliore alternativa a cui si rinuncia quando si prende una decisione", "Un costo fisso", "Un costo variabile"],
    correct: 1,
    explanation: "Il costo opportunità è il valore della migliore alternativa a cui si rinuncia quando si effettua una scelta, rappresentando il beneficio che si sarebbe potuto ottenere scegliendo un'altra opzione."
  },
  {
    question: "Qual è la funzione di un 'diagramma di Ishikawa' (o a lisca di pesce)?",
    options: ["Rappresentare la struttura organizzativa", "Identificare le possibili cause di un problema o di un effetto", "Pianificare le attività di un progetto", "Analizzare i costi"],
    correct: 1,
    explanation: "Il diagramma di Ishikawa (o causa-effetto, o a lisca di pesce) è uno strumento grafico utilizzato per identificare, esplorare e visualizzare tutte le possibili cause di un problema specifico, raggruppandole in categorie."
  },
  {
    question: "Cosa si intende per 'outsourcing strategico'?",
    options: ["L'affidamento di funzioni non core a terzi", "L'affidamento a terzi di funzioni che sono considerate critiche o strategiche per l'azienda", "La vendita di prodotti all'estero", "L'acquisizione di un'altra azienda"],
    correct: 1,
    explanation: "L'outsourcing strategico si ha quando un'azienda affida a fornitori esterni attività che sono considerate fondamentali per il proprio vantaggio competitivo, con l'obiettivo di accedere a competenze specialistiche o ridurre i costi."
  },
  {
    question: "Qual è la funzione del 'ciclo di Deming' (PDCA)?",
    options: ["Un modello per la gestione delle risorse umane", "Un modello per il miglioramento continuo dei processi (Plan-Do-Check-Act)", "Un modello per la pianificazione finanziaria", "Un modello per la gestione delle vendite"],
    correct: 1,
    explanation: "Il ciclo di Deming (o ciclo PDCA: Plan-Do-Check-Act) è un metodo iterativo di gestione per il miglioramento continuo dei processi e dei prodotti, basato sulla pianificazione, esecuzione, controllo e azione correttiva."
  },
  {
    question: "Cosa si intende per 'benchmarking competitivo'?",
    options: ["Il confronto con i propri risultati passati", "Il confronto delle proprie performance con quelle dei principali concorrenti", "Il confronto con aziende di altri settori", "Il confronto con standard industriali"],
    correct: 1,
    explanation: "Il benchmarking competitivo è il processo di confronto delle proprie performance, prodotti o processi con quelli dei diretti concorrenti, al fine di identificare le migliori pratiche e le aree di miglioramento."
  },
  {
    question: "Qual è la funzione della 'matrice SWOT' in pianificazione strategica?",
    options: ["Analizzare solo i punti di forza", "Valutare i punti di forza (Strengths), le debolezze (Weaknesses), le opportunità (Opportunities) e le minacce (Threats) di un'organizzazione o di un progetto", "Misurare la soddisfazione del cliente", "Gestire i rischi finanziari"],
    correct: 1,
    explanation: "La matrice SWOT è uno strumento di pianificazione strategica che permette di analizzare i fattori interni (punti di forza e debolezza) e i fattori esterni (opportunità e minacce) che possono influenzare un'organizzazione."
  },
  {
    question: "Cosa si intende per 'resilienza aziendale'?",
    options: ["La capacità di un'azienda di non fallire mai", "La capacità di un'azienda di resistere, adattarsi e riprendersi da shock e interruzioni", "La velocità di crescita dell'azienda", "La capacità di ridurre i costi"],
    correct: 1,
    explanation: "La resilienza aziendale è la capacità di un'organizzazione di anticipare, prepararsi, rispondere e riprendersi da interruzioni significative (es. crisi economiche, disastri naturali, attacchi informatici), mantenendo la continuità operativa."
  },
  {
    question: "Qual è la funzione di un 'sistema di gestione della qualità totale' (TQM)?",
    options: ["Controllare solo la qualità del prodotto finale", "Un approccio gestionale che mira al miglioramento continuo della qualità in tutti gli aspetti dell'organizzazione, coinvolgendo tutti i dipendenti", "Gestire le relazioni con i fornitori", "Pianificare la produzione"],
    correct: 1,
    explanation: "Il TQM (Total Quality Management) è una filosofia di gestione che coinvolge tutti i membri di un'organizzazione nel miglioramento continuo della qualità di tutti i processi, prodotti e servizi, al fine di soddisfare o superare le aspettative del cliente."
  },
  {
    question: "Cosa si intende per 'digitalizzazione dei documenti'?",
    options: ["La creazione di nuovi documenti digitali", "La conversione di documenti cartacei in formato digitale", "La stampa di documenti digitali", "La condivisione di documenti online"],
    correct: 1,
    explanation: "La digitalizzazione dei documenti è il processo di conversione di informazioni da un formato analogico (es. carta) a un formato digitale."
  },
  {
    question: "Qual è la funzione di un 'sistema di gestione del flusso di lavoro' (Workflow Management System)?",
    options: ["Gestire i dipendenti", "Automatizzare e monitorare le sequenze di attività e processi aziendali", "Creare presentazioni", "Archiviare documenti"],
    correct: 1,
    explanation: "Un Workflow Management System (WfMS) è un software che automatizza e gestisce i flussi di lavoro, garantendo che le attività siano eseguite nell'ordine corretto e da parte delle persone giuste."
  },
  {
    question: "Cosa si intende per 'dematerializzazione'?",
    options: ["La creazione di oggetti fisici", "La sostituzione di documenti e processi cartacei con equivalenti digitali", "La distruzione di documenti", "La scansione di documenti"],
    correct: 1,
    explanation: "La dematerializzazione è il processo di eliminazione dei documenti fisici (cartacei) a favore di quelli digitali, con l'obiettivo di ridurre costi, spazi e migliorare l'efficienza."
  },
  {
    question: "Qual è la funzione di un 'sistema di gestione elettronica dei documenti' (EDM)?",
    options: ["Archiviare solo documenti cartacei", "Organizzare, archiviare e gestire documenti elettronici, inclusa la loro indicizzazione e ricerca", "Creare documenti di testo", "Stampare documenti"],
    correct: 1,
    explanation: "Un sistema EDM (Electronic Document Management) è un software utilizzato per gestire il ciclo di vita dei documenti elettronici, dalla creazione all'archiviazione, recupero e distribuzione."
  },
  {
    question: "Cosa si intende per 'protocollo TCP/IP'?",
    options: ["Un protocollo per la stampa", "L'insieme dei protocolli di comunicazione che costituiscono la base di Internet", "Un protocollo per la sicurezza", "Un protocollo per la gestione dei database"],
    correct: 1,
    explanation: "TCP/IP (Transmission Control Protocol/Internet Protocol) è la suite di protocolli di comunicazione su cui si basa Internet e la maggior parte delle reti moderne."
  },
  {
    question: "Cosa si intende per 'crittografia asimmetrica'?",
    options: ["Un metodo di crittografia che utilizza la stessa chiave per cifrare e decifrare", "Un metodo di crittografia che utilizza una coppia di chiavi (pubblica e privata) per cifrare e decifrare", "Un metodo per comprimere i dati", "Un metodo per archiviare i dati"],
    correct: 1,
    explanation: "La crittografia asimmetrica (o a chiave pubblica) utilizza due chiavi diverse: una chiave pubblica per cifrare i dati e una chiave privata (segreta) per decifrarli."
  },
  {
    question: "Qual è la funzione di un 'sistema di gestione delle identità e degli accessi' (IAM)?",
    options: ["Gestire i documenti", "Controllare chi può accedere a quali risorse e quali operazioni può eseguire", "Proteggere da virus", "Creare backup"],
    correct: 1,
    explanation: "Un sistema IAM (Identity and Access Management) è un framework di politiche e tecnologie che consente alle organizzazioni di gestire le identità digitali degli utenti e di controllare il loro accesso alle risorse."
  },
  {
    question: "Cosa si intende per 'cloud privato'?",
    options: ["Un cloud accessibile a tutti", "Un'infrastruttura cloud dedicata esclusivamente a una singola organizzazione", "Un cloud gestito da un fornitore esterno", "Un cloud che non è sicuro"],
    correct: 1,
    explanation: "Un cloud privato è un'infrastruttura cloud gestita esclusivamente per una singola organizzazione, che può essere gestita internamente o da terzi."
  },
  {
    question: "Cosa si intende per 'diritto di regresso' in ambito tributario?",
    options: ["Il diritto del contribuente di chiedere il rimborso", "Il diritto dell'Amministrazione finanziaria di recuperare somme da chi ha beneficiato indebitamente", "Il diritto di un coobbligato di chiedere agli altri condebitori la parte di debito che ha pagato per tutti", "Il diritto di impugnare un atto"],
    correct: 2,
    explanation: "Il diritto di regresso è il diritto di un soggetto (es. un coobbligato solidale o un fideiussore) che ha pagato l'intero debito di chiedere agli altri condebitori o al debitore principale la loro quota."
  },
  {
    question: "Qual è la differenza tra 'imposta' e 'tassa'?",
    options: ["Non c'è differenza", "L'imposta è un prelievo coattivo senza controprestazione specifica, la tassa è un corrispettivo per un servizio pubblico specifico", "L'imposta è volontaria, la tassa è obbligatoria", "L'imposta è pagata solo dalle aziende, la tassa solo dai privati"],
    correct: 1,
    explanation: "L'imposta è un prelievo coattivo di ricchezza che lo Stato impone per finanziare le spese pubbliche generali, senza una controprestazione diretta. La tassa è un corrispettivo richiesto per l'erogazione di un servizio pubblico specifico e divisibile."
  },
  {
    question: "Cosa si intende per 'accertamento con adesione'?",
    options: ["Un accertamento fiscale definitivo", "Un accordo tra contribuente e Amministrazione finanziaria per definire bonariamente la pretesa tributaria", "Un accertamento basato solo sulla dichiarazione del contribuente", "Un accertamento d'ufficio"],
    correct: 1,
    explanation: "L'accertamento con adesione è un istituto che consente al contribuente e all'Amministrazione finanziaria di definire consensualmente la pretesa tributaria, evitando il contenzioso e beneficiando di una riduzione delle sanzioni."
  },
  {
    question: "Qual è la funzione del 'ravvedimento operoso'?",
    options: ["Annullare un atto fiscale", "Permettere al contribuente di regolarizzare spontaneamente violazioni tributarie, beneficiando di sanzioni ridotte", "Sospendere il pagamento di un tributo", "Chiedere un rimborso"],
    correct: 1,
    explanation: "Il ravvedimento operoso è un istituto che consente al contribuente di sanare spontaneamente le violazioni tributarie commesse, beneficiando di una riduzione delle sanzioni in base al momento in cui avviene la regolarizzazione."
  },
  {
    question: "Cosa si intende per 'contenzioso tributario'?",
    options: ["La fase di riscossione coattiva", "La procedura giudiziale per la risoluzione delle controversie tra contribuente e Amministrazione finanziaria", "Il processo di accertamento fiscale", "La fase di controllo delle dichiarazioni"],
    correct: 1,
    explanation: "Il contenzioso tributario è l'insieme delle procedure giudiziali (ricorsi alle Commissioni Tributarie) attraverso le quali si risolvono le controversie tra il contribuente e l'Amministrazione finanziaria in materia di tributi."
  },
  {
    question: "Qual è l'organo giurisdizionale competente per le controversie tributarie di primo grado?",
    options: ["Il Tribunale Ordinario", "La Corte d'Appello", "La Commissione Tributaria Provinciale", "La Corte di Cassazione"],
    correct: 2,
    explanation: "Le controversie tributarie di primo grado sono di competenza della Commissione Tributaria Provinciale."
  },
  {
    question: "Cosa si intende per 'onere della prova' nel processo tributario?",
    options: ["L'obbligo del contribuente di pagare le imposte", "L'obbligo di chi afferma un fatto in giudizio di provarlo", "L'obbligo del giudice di trovare le prove", "L'obbligo dell'Amministrazione di non fornire prove"],
    correct: 1,
    explanation: "L'onere della prova è il principio per cui chi intende far valere un diritto in giudizio deve provare i fatti che ne costituiscono il fondamento. Nel processo tributario, l'onere della prova grava principalmente sull'Amministrazione finanziaria per la pretesa impositiva, ma anche sul contribuente per i fatti a suo favore."
  },
  {
    question: "Qual è la funzione del 'principio di capacità contributiva' in diritto tributario?",
    options: ["Stabilire che tutti pagano le stesse imposte", "Affermare che ciascuno deve concorrere alle spese pubbliche in base alla propria capacità economica", "Prevedere che solo i ricchi pagano le imposte", "Garantire la segretezza dei dati fiscali"],
    correct: 1,
    explanation: "Il principio di capacità contributiva (art. 53 Cost.) stabilisce che tutti sono tenuti a concorrere alle spese pubbliche in ragione della loro capacità contributiva, intesa come forza economica del soggetto."
  },
  {
    question: "Cosa si intende per 'prescrizione' in diritto tributario?",
    options: ["La sospensione del pagamento", "L'estinzione del diritto di credito dell'Amministrazione finanziaria per il decorso del tempo", "Il condono fiscale", "La rateizzazione del debito"],
    correct: 1,
    explanation: "La prescrizione è un modo di estinzione del diritto di credito dell'Amministrazione finanziaria (o di qualsiasi altro diritto) per il mancato esercizio dello stesso entro un determinato termine stabilito dalla legge."
  },
  {
    question: "Qual è la funzione del 'condono fiscale'?",
    options: ["Annullare tutti i debiti tributari", "Permettere ai contribuenti di sanare posizioni debitorie o irregolarità fiscali a condizioni agevolate", "Aumentare le imposte", "Sospendere i controlli fiscali"],
    correct: 1,
    explanation: "Il condono fiscale è un provvedimento legislativo straordinario che consente ai contribuenti di regolarizzare la propria posizione fiscale, sanando violazioni o debiti, a condizioni più favorevoli rispetto a quelle ordinarie (es. riduzione di sanzioni e interessi)."
  },
  {
    question: "Cosa si intende per 'elusione fiscale'?",
    options: ["La violazione di norme tributarie con l'intento di evadere", "Il risparmio d'imposta ottenuto attraverso comportamenti leciti ma finalizzati ad aggirare norme fiscali", "L'errore nella compilazione della dichiarazione", "La mancata presentazione della dichiarazione"],
    correct: 1,
    explanation: "L'elusione fiscale (o abuso del diritto) si verifica quando il contribuente, pur agendo formalmente nel rispetto della legge, pone in essere operazioni prive di sostanza economica e non giustificate da valide ragioni economiche, allo scopo di ottenere un indebito vantaggio fiscale."
  },
  {
    question: "Qual è la differenza tra 'evasione fiscale' ed 'elusione fiscale'?",
    options: ["Non c'è differenza", "L'evasione è illegale, l'elusione è lecita ma abusiva", "L'evasione è un errore, l'elusione è un reato", "L'evasione riguarda solo le imposte dirette, l'elusione solo quelle indirette"],
    correct: 1,
    explanation: "L'evasione fiscale è un comportamento illegale che consiste nel sottrarsi all'obbligo di pagare le imposte. L'elusione fiscale, pur non essendo formalmente illegale, consiste nell'aggirare le norme fiscali per ottenere un vantaggio indebito."
  },
  {
    question: "Cosa si intende per 'imposta sul valore aggiunto' (IVA)?",
    options: ["Un'imposta sul reddito", "Un'imposta sui consumi che grava sul valore aggiunto in ogni fase della produzione e distribuzione", "Un'imposta sul patrimonio", "Un'imposta sulle successioni"],
    correct: 1,
    explanation: "L'IVA (Imposta sul Valore Aggiunto) è un'imposta indiretta che colpisce i consumi, applicata sul valore aggiunto in ogni fase della produzione e scambio di beni e servizi."
  },
  {
    question: "Qual è la funzione del 'codice fiscale'?",
    options: ["Identificare l'azienda", "Identificare in modo univoco una persona fisica o giuridica nei rapporti con l'Amministrazione finanziaria", "Un codice segreto", "Un codice per accedere a Internet"],
    correct: 1,
    explanation: "Il codice fiscale è un codice alfanumerico che identifica in modo univoco le persone fisiche e gli altri soggetti (es. enti, società) nei rapporti con l'Amministrazione finanziaria e altre amministrazioni pubbliche."
  },
  {
    question: "Cosa si intende per 'dichiarazione dei redditi'?",
    options: ["Un documento che attesta i debiti", "Un documento con cui il contribuente comunica all'Amministrazione finanziaria i propri redditi e calcola le imposte dovute", "Una richiesta di rimborso", "Un avviso di accertamento"],
    correct: 1,
    explanation: "La dichiarazione dei redditi è il documento con cui il contribuente comunica all'Amministrazione finanziaria i propri redditi percepiti in un determinato periodo d'imposta e calcola le imposte dovute."
  },
  {
    question: "Qual è la funzione del 'modello F24'?",
    options: ["Richiedere un rimborso fiscale", "Effettuare il pagamento di tributi, contributi e altre somme dovute", "Presentare la dichiarazione dei redditi", "Comunicare un cambio di residenza"],
    correct: 1,
    explanation: "Il modello F24 è il modulo unificato per il versamento di imposte, tasse, contributi e altre somme dovute allo Stato, agli enti locali e all'INPS."
  },
  {
    question: "Cosa si intende per 'ritenuta d'acconto'?",
    options: ["Un anticipo di imposta che viene trattenuto alla fonte da chi eroga un reddito", "Una sanzione per mancato pagamento", "Un rimborso fiscale", "Un credito d'imposta"],
    correct: 0,
    explanation: "La ritenuta d'acconto è una somma che viene trattenuta alla fonte (es. dal datore di lavoro, dal committente) a titolo di anticipo sulle imposte dovute dal percipiente del reddito."
  },
  {
    question: "Qual è la funzione dell' 'Agenzia delle Entrate'?",
    options: ["La riscossione dei tributi", "L'accertamento e la riscossione dei tributi", "La gestione delle dogane", "L'emissione di moneta"],
    correct: 1,
    explanation: "L'Agenzia delle Entrate è un'agenzia fiscale che si occupa principalmente dell'accertamento, della riscossione e della gestione dei tributi erariali."
  },
  {
    question: "Cosa si intende per 'tributo'?",
    options: ["Una donazione volontaria", "Un prelievo coattivo di ricchezza imposto dalla legge per finanziare le spese pubbliche", "Un prestito allo Stato", "Una sanzione amministrativa"],
    correct: 1,
    explanation: "Il tributo è una prestazione patrimoniale coattiva imposta dalla legge per finanziare le spese pubbliche o per il perseguimento di fini di interesse generale."
  },
  {
    question: "Qual è la funzione del 'Regolamento (UE) 2016/679' (GDPR)?",
    options: ["Regolare il commercio internazionale", "Proteggere i dati personali e la loro libera circolazione", "Definire le norme sulla concorrenza", "Regolamentare i contratti"],
    correct: 1,
    explanation: "Il Regolamento Generale sulla Protezione dei Dati (GDPR) è una normativa europea che stabilisce regole sulla protezione delle persone fisiche con riguardo al trattamento dei dati personali e alla libera circolazione di tali dati."
  },
  {
    question: "Cosa si intende per 'firma digitale'?",
    options: ["Una firma apposta con una penna speciale", "Un sistema che garantisce l'autenticità, l'integrità e il non ripudio di un documento informatico", "Una scansione della propria firma", "Un tipo di password"],
    correct: 1,
    explanation: "La firma digitale è un particolare tipo di firma elettronica qualificata basata su un sistema di chiavi crittografiche, che garantisce l'autenticità (identità del firmatario), l'integrità (non modificabilità del documento) e il non ripudio del documento informatico."
  },
  {
    question: "Qual è la funzione di un 'database relazionale'?",
    options: ["Archiviare documenti non strutturati", "Organizzare dati in tabelle con relazioni definite tra loro", "Creare presentazioni multimediali", "Gestire le email"],
    correct: 1,
    explanation: "Un database relazionale organizza i dati in una o più tabelle (o 'relazioni') di colonne e righe, con un identificatore univoco per ogni riga, e stabilisce relazioni tra queste tabelle."
  },
  {
    question: "Cosa si intende per 'API' (Application Programming Interface)?",
    options: ["Un tipo di virus informatico", "Un insieme di definizioni e protocolli per la creazione e l'integrazione di software applicativo", "Un dispositivo hardware", "Un linguaggio di programmazione"],
    correct: 1,
    explanation: "Un'API (Application Programming Interface) è un insieme di regole e definizioni che consentono a diverse applicazioni software di comunicare tra loro."
  },
  {
    question: "Qual è il vantaggio principale di utilizzare un foglio di calcolo per l'analisi dei dati?",
    options: ["Creare documenti di testo complessi", "Eseguire calcoli automatici, organizzare dati in tabelle e creare grafici", "Navigare su Internet", "Gestire database di grandi dimensioni"],
    correct: 1,
    explanation: "I fogli di calcolo (es. Excel) sono estremamente utili per l'analisi dei dati grazie alla loro capacità di eseguire calcoli automatici, organizzare dati in tabelle, filtrare, ordinare e creare grafici."
  },
  {
    question: "Cosa si intende per 'rete client-server'?",
    options: ["Una rete dove tutti i computer hanno le stesse funzionalità", "Una rete dove alcuni computer (client) richiedono servizi a altri computer (server)", "Una rete senza fili", "Una rete limitata a un singolo edificio"],
    correct: 1,
    explanation: "In una rete client-server, i client sono i dispositivi o i programmi che richiedono servizi, mentre i server sono i dispositivi o i programmi che forniscono tali servizi (es. file server, web server, database server)."
  },
  {
    question: "Qual è la funzione di un 'sistema di controllo di versione' (es. Git)?",
    options: ["Creare backup automatici dei file", "Tracciare e gestire le modifiche al codice sorgente o ad altri documenti nel tempo", "Proteggere i file da virus", "Comprimere i file per l'archiviazione"],
    correct: 1,
    explanation: "Un sistema di controllo di versione (VCS - Version Control System) come Git permette di tracciare e gestire le modifiche apportate a file o insiemi di file nel tempo, consentendo di tornare a versioni precedenti, collaborare su progetti e gestire diverse linee di sviluppo."
  },
  {
    question: "Cosa si intende per 'cybersecurity'?",
    options: ["La protezione dei dati fisici", "L'insieme delle tecnologie e dei processi volti a proteggere sistemi, reti e programmi da attacchi digitali", "La gestione dei cavi di rete", "La creazione di siti web"],
    correct: 1,
    explanation: "La cybersecurity (sicurezza informatica) è l'insieme delle pratiche, dei processi e delle tecnologie progettate per proteggere reti, dispositivi, programmi e dati da attacchi, danni o accessi non autorizzati."
  },
  {
    question: "Qual è la funzione di un 'server' in una rete informatica?",
    options: ["Visualizzare pagine web", "Fornire servizi e risorse ad altri computer (client) nella rete", "Scrivere documenti di testo", "Stampare documenti"],
    correct: 1,
    explanation: "Un server è un computer o un programma che fornisce funzionalità (servizi, dati, risorse) ad altri programmi o computer, chiamati 'client', attraverso una rete."
  },
  {
    question: "Cosa si intende per 'firewall hardware'?",
    options: ["Un software antivirus", "Un dispositivo fisico che protegge la rete", "Un tipo di stampante", "Un cavo di rete"],
    correct: 1,
    explanation: "Un firewall hardware è un dispositivo fisico che si interpone tra la rete interna e la rete esterna (es. Internet) per filtrare il traffico e impedire accessi non autorizzati."
  },
  {
    question: "Qual è lo scopo principale di un sistema di gestione documentale (DMS)?",
    options: ["Archiviare documenti cartacei", "Organizzare, archiviare e gestire documenti elettronici", "Creare presentazioni", "Inviare email massive"],
    correct: 1,
    explanation: "Un sistema di gestione documentale (DMS) è un software utilizzato per organizzare, archiviare, gestire e tracciare documenti elettronici e immagini di documenti cartacei."
  },
  {
    question: "Cosa si intende per 'protocollo HTTPS'?",
    options: ["Un protocollo per l'invio di email", "Un protocollo per la navigazione web sicura", "Un protocollo per la condivisione di file", "Un protocollo per la sicurezza dei dati"],
    correct: 1,
    explanation: "HTTPS (Hypertext Transfer Protocol Secure) è la versione sicura del protocollo HTTP, che garantisce la crittografia delle comunicazioni tra il browser web dell'utente e il server del sito web, proteggendo la riservatezza e l'integrità dei dati."
  },
  {
    question: "Qual è la funzione di un 'router' in una rete?",
    options: ["Memorizzare dati", "Connettere diverse reti e instradare i pacchetti di dati tra di esse", "Visualizzare video", "Scrivere codice"],
    correct: 1,
    explanation: "Un router è un dispositivo di rete che inoltra i pacchetti di dati tra reti di computer, determinando il percorso migliore per la trasmissione dei dati."
  },
  {
    question: "Cosa si intende per 'malware'?",
    options: ["Un software di utilità", "Un software dannoso progettato per danneggiare o accedere a sistemi informatici senza autorizzazione", "Un tipo di hardware", "Un linguaggio di programmazione"],
    correct: 1,
    explanation: "Malware è un termine generico che include qualsiasi software maligno progettato per danneggiare, disabilitare o accedere a sistemi informatici senza il consenso dell'utente (es. virus, worm, trojan, spyware)."
  },
  {
    question: "Qual è la funzione del 'Task Manager' (Gestione attività) in Windows?",
    options: ["Scrivere documenti", "Gestire i file e le cartelle", "Monitorare i processi in esecuzione, le prestazioni del sistema e le applicazioni", "Navigare in Internet"],
    correct: 2,
    explanation: "Il Task Manager di Windows è uno strumento che consente agli utenti di monitorare i processi in esecuzione, le prestazioni del sistema (CPU, memoria, disco, rete) e di gestire le applicazioni."
  },
  {
    question: "Cosa si intende per 'phishing mirato' (spear phishing)?",
    options: ["Un attacco phishing generico", "Un attacco phishing diretto a un individuo o organizzazione specifica", "Un tipo di attacco DDoS", "Un metodo per recuperare password dimenticate"],
    correct: 1,
    explanation: "Lo spear phishing è una forma di phishing altamente mirata, in cui l'attaccante personalizza il messaggio per renderlo più credibile a una specifica vittima o gruppo di vittime, spesso basandosi su informazioni raccolte su di esse."
  },
  {
    question: "Qual è la differenza tra 'RAM' e 'ROM'?",
    options: ["La RAM è la memoria di archiviazione a lungo termine, la ROM è la memoria volatile", "La RAM è la memoria volatile di lavoro, la ROM è la memoria di sola lettura non volatile", "La RAM è più lenta della ROM", "La ROM è utilizzata solo per i programmi, la RAM per i dati"],
    correct: 1,
    explanation: "La RAM (Random Access Memory) è una memoria volatile utilizzata per l'elaborazione dei dati in tempo reale, mentre la ROM (Read-Only Memory) è una memoria non volatile che contiene istruzioni permanenti necessarie all'avvio del sistema."
  },
  {
    question: "Cosa si intende per 'VPN' (Virtual Private Network)?",
    options: ["Una rete locale", "Una rete pubblica non sicura", "Una connessione di rete che crea un tunnel sicuro e crittografato su una rete pubblica", "Un tipo di server"],
    correct: 2,
    explanation: "Una VPN (Virtual Private Network) crea una connessione di rete privata su una rete pubblica (come Internet), consentendo agli utenti di inviare e ricevere dati in modo sicuro e anonimo, come se i loro dispositivi fossero direttamente connessi alla rete privata."
  },
  {
    question: "Qual è il formato di file più comune per le immagini con trasparenza?",
    options: [".jpeg", ".bmp", ".png", ".gif"],
    correct: 2,
    explanation: "Il formato PNG (Portable Network Graphics) è ampiamente utilizzato per le immagini che richiedono trasparenza, oltre a supportare la compressione senza perdita di qualità."
  },
  {
    question: "Cosa si intende per 'cookie' in ambito web?",
    options: ["Un tipo di virus informatico", "Piccoli file di testo memorizzati dal browser web per tracciare le preferenze dell'utente", "Un programma per la gestione dei download", "Un sistema di autenticazione"],
    correct: 1,
    explanation: "I cookie sono piccoli file di testo che i siti web memorizzano sul computer dell'utente tramite il browser, utilizzati per memorizzare informazioni sulle preferenze dell'utente, lo stato di login, o per tracciare il comportamento di navigazione."
  },
  {
    question: "Qual è la funzione di un 'motore di ricerca'?",
    options: ["Creare siti web", "Trovare informazioni sul World Wide Web", "Gestire la posta elettronica", "Creare documenti di testo"],
    correct: 1,
    explanation: "Un motore di ricerca (es. Google, Bing) è un'applicazione software progettata per cercare informazioni sul World Wide Web."
  },
  {
    question: "Cosa si intende per 'spamming' nel contesto della posta elettronica?",
    options: ["L'invio di email importanti", "L'invio massivo e non richiesto di messaggi di posta elettronica", "La ricezione di email da contatti noti", "La cancellazione di email indesiderate"],
    correct: 1,
    explanation: "Lo spamming è la pratica di inviare grandi quantità di messaggi non richiesti (spam) a un vasto numero di destinatari, tipicamente a scopo commerciale o fraudolento."
  },
  {
    question: "Qual è la funzione principale di un 'sistema di gestione delle relazioni con i clienti' (CRM)?",
    options: ["Gestire la contabilità aziendale", "Automatizzare e analizzare le interazioni e i dati dei clienti per migliorare i rapporti commerciali", "Pianificare le risorse aziendali", "Proteggere i dati da attacchi informatici"],
    correct: 1,
    explanation: "Un sistema CRM (Customer Relationship Management) è un software che aiuta le aziende a gestire e analizzare le interazioni con i clienti e i dati durante il ciclo di vita del cliente, con l'obiettivo di migliorare i rapporti commerciali e favorire la crescita delle vendite."
  },
  {
    question: "Cosa si intende per 'algoritmo' in informatica?",
    options: ["Un tipo di hardware", "Una sequenza finita di istruzioni ben definite per risolvere un problema o eseguire un compito", "Un linguaggio di programmazione", "Un sistema operativo"],
    correct: 1,
    explanation: "Un algoritmo è una sequenza finita e ordinata di istruzioni o passi ben definiti, che devono essere eseguiti per risolvere un problema o completare un compito."
  },
  {
    question: "Qual è la funzione di un 'sistema di gestione dei progetti' (PMS)?",
    options: ["Gestire la contabilità", "Pianificare, eseguire e monitorare i progetti dall'inizio alla fine", "Creare presentazioni", "Gestire le risorse umane"],
    correct: 1,
    explanation: "Un sistema di gestione dei progetti (Project Management System) è un software o un insieme di strumenti che aiutano a pianificare, organizzare, gestire e monitorare le risorse e le attività di un progetto per garantirne il completamento entro i tempi e il budget stabiliti."
  },
  {
    question: "Cosa si intende per 'data governance'?",
    options: ["La protezione dei dati personali", "L'insieme di processi, ruoli, politiche, standard e metriche che assicurano un uso efficace ed efficiente delle informazioni", "La raccolta di grandi quantità di dati", "La cancellazione dei dati obsoleti"],
    correct: 1,
    explanation: "La data governance è un sistema di regole, responsabilità e processi che garantiscono la qualità, la disponibilità, l'usabilità, la sicurezza e la conformità dei dati utilizzati in un'organizzazione."
  },
  {
    question: "Qual è la funzione di un 'sistema di Business Intelligence' (BI)?",
    options: ["Generare report finanziari", "Raccogliere, analizzare e presentare dati aziendali per supportare il processo decisionale strategico", "Gestire le relazioni con i clienti", "Automatizzare la produzione"],
    correct: 1,
    explanation: "Un sistema di Business Intelligence (BI) è un insieme di tecnologie e processi che consentono di raccogliere, analizzare e presentare dati aziendali per supportare le decisioni strategiche e tattiche, fornendo insight sulle performance passate e attuali."
  },
  {
    question: "Cosa si intende per 'cybercrime'?",
    options: ["Crimini commessi con l'uso di armi", "Attività criminali che coinvolgono computer, reti o Internet", "Crimini finanziari", "Crimini contro la proprietà"],
    correct: 1,
    explanation: "Il cybercrime (crimine informatico) si riferisce a qualsiasi attività criminale che coinvolge l'uso di computer, reti informatiche o Internet, sia come strumento per commettere il reato, sia come obiettivo del reato stesso."
  },
  {
    question: "Qual è la funzione di un 'sistema di gestione della relazione con i fornitori' (SRM)?",
    options: ["Gestire le vendite", "Automatizzare e ottimizzare le interazioni con i fornitori", "Creare nuovi prodotti", "Pianificare la produzione interna"],
    correct: 1,
    explanation: "Un sistema SRM (Supplier Relationship Management) è una strategia e un insieme di processi per gestire le interazioni di un'azienda con i suoi fornitori, con l'obiettivo di massimizzare il valore delle relazioni e ottimizzare la catena di approvvigionamento."
  },
  {
    question: "Cosa si intende per 'cloud storage'?",
    options: ["L'archiviazione di dati su un disco rigido locale", "L'archiviazione di dati su server remoti accessibili tramite una rete", "L'archiviazione di dati su CD/DVD", "L'archiviazione di dati su chiavette USB"],
    correct: 1,
    explanation: "Il cloud storage è un modello di archiviazione di dati digitali in pool logici, dove lo storage fisico si estende su più server, e l'ambiente fisico è tipicamente di proprietà e gestito da un fornitore di hosting, accessibile tramite una rete."
  },
  {
    question: "Qual è la funzione di un 'sistema di gestione degli incidenti' (Incident Management System)?",
    options: ["Prevenire gli incidenti sul lavoro", "Registrare, classificare, assegnare e risolvere gli incidenti IT o di altro tipo", "Gestire le relazioni con i clienti", "Pianificare le attività di marketing"],
    correct: 1,
    explanation: "Un sistema di gestione degli incidenti (Incident Management System) è uno strumento o un processo utilizzato per registrare, tracciare, gestire e risolvere gli incidenti (es. interruzioni di servizio IT, problemi di sicurezza) in modo efficiente e sistematico."
  },
  {
    question: "Cosa si intende per 'protocollo SMTP'?",
    options: ["Un protocollo per la navigazione web", "Un protocollo per l'invio di posta elettronica", "Un protocollo per la condivisione di file", "Un protocollo per la sicurezza dei dati"],
    correct: 1,
    explanation: "SMTP (Simple Mail Transfer Protocol) è il protocollo standard per l'invio di posta elettronica su Internet."
  },
  {
    question: "Qual è la funzione di un 'sistema di gestione della qualità ISO 9001'?",
    options: ["Certificare i prodotti", "Fornire un quadro per un sistema di gestione della qualità efficace, basato sul miglioramento continuo", "Gestire la contabilità", "Controllare le risorse umane"],
    correct: 1,
    explanation: "La norma ISO 9001 è uno standard internazionale per i sistemi di gestione della qualità (QMS) che fornisce un quadro per le organizzazioni per garantire che soddisfano costantemente le esigenze dei clienti e le normative, migliorando la soddisfazione del cliente e l'efficienza operativa."
  },
  {
    question: "Cosa si intende per 'data visualization'?",
    options: ["La raccolta di dati", "La presentazione grafica di dati e informazioni per renderli più comprensibili e accessibili", "La protezione dei dati", "La cancellazione dei dati"],
    correct: 1,
    explanation: "La data visualization (visualizzazione dei dati) è la rappresentazione grafica di informazioni e dati, utilizzando elementi visivi come grafici, diagrammi e mappe per rendere più facile la comprensione di tendenze, valori anomali e pattern nei dati."
  },
  {
    question: "Qual è la funzione di un 'sistema di gestione delle risorse aziendali' (ERM)?",
    options: ["Gestire solo le risorse umane", "Un approccio integrato per identificare, valutare e gestire i rischi che possono influenzare il raggiungimento degli obiettivi aziendali", "Creare report finanziari", "Pianificare le strategie di marketing"],
    correct: 1,
    explanation: "Un sistema ERM (Enterprise Risk Management) è un processo adottato da un'organizzazione per identificare, valutare, gestire e controllare i rischi che potrebbero influenzare il raggiungimento dei suoi obiettivi, fornendo una ragionevole garanzia."
  },
  {
    question: "Cosa si intende per 'Internet Service Provider' (ISP)?",
    options: ["Un'azienda che produce hardware", "Un'azienda che fornisce servizi di accesso a Internet", "Un software antivirus", "Un motore di ricerca"],
    correct: 1,
    explanation: "Un ISP (Internet Service Provider) è un'azienda che fornisce servizi di accesso a Internet ai propri clienti, sia privati che aziende."
  },
  {
    question: "Qual è la funzione di un 'sistema di gestione delle relazioni con i dipendenti' (ERM)?",
    options: ["Gestire le relazioni con i clienti", "Automatizzare e ottimizzare i processi relativi all'engagement e alla soddisfazione dei dipendenti", "Pianificare la produzione", "Gestire la contabilità"],
    correct: 1,
    explanation: "Un sistema ERM (Employee Relationship Management) si concentra sull'ottimizzazione delle interazioni tra l'azienda e i suoi dipendenti, migliorando l'engagement, la soddisfazione e la produttività."
  },
  {
    question: "Cosa si intende per 'digital footprint'?",
    options: ["L'impronta digitale di una persona", "La traccia di dati che una persona lascia online attraverso le sue attività su Internet", "Un tipo di virus", "Un sistema di sicurezza biometrica"],
    correct: 1,
    explanation: "La 'digital footprint' (impronta digitale digitale) è la traccia di dati che una persona lascia dietro di sé attraverso le sue attività online, come l'utilizzo dei social media, la navigazione web, gli acquisti online e le comunicazioni via email."
  },
  {
    question: "Qual è la funzione di un 'sistema di gestione della sicurezza informatica' (CSMS)?",
    options: ["Gestire la sicurezza fisica degli uffici", "Un insieme di politiche, processi e tecnologie per proteggere i sistemi informatici e i dati da minacce digitali", "Creare backup di dati", "Monitorare le prestazioni del computer"],
    correct: 1,
    explanation: "Un CSMS (Cybersecurity Management System) è un approccio sistematico per gestire i rischi di cybersecurity, implementando controlli e misure per proteggere le risorse informative."
  },
  {
    question: "Cosa si intende per 'ransomware'?",
    options: ["Un tipo di software antivirus", "Un malware che cripta i file di un utente e richiede un riscatto per decriptarli", "Un programma per la gestione dei database", "Un software per la creazione di grafica"],
    correct: 1,
    explanation: "Il ransomware è un tipo di malware che blocca l'accesso ai dati o al sistema informatico dell'utente, criptando i file o bloccando l'accesso al sistema, e richiede un pagamento (riscatto) per ripristinare l'accesso."
  },
  {
    question: "Qual è la funzione di un 'sistema di gestione dei contenuti aziendali' (ECM)?",
    options: ["Gestire solo i documenti cartacei", "Organizzare e gestire tutti i contenuti non strutturati di un'organizzazione (documenti, email, immagini, video)", "Creare siti web", "Gestire le relazioni con i clienti"],
    correct: 1,
    explanation: "Un ECM (Enterprise Content Management) è un insieme di strategie, metodi e strumenti per acquisire, gestire, archiviare, preservare e fornire contenuti e documenti aziendali, supportando i processi organizzativi."
  },
  {
    question: "Cosa si intende per 'virtualizzazione'?",
    options: ["La creazione di copie fisiche di hardware", "La creazione di versioni virtuali di risorse informatiche (es. sistemi operativi, server, storage)", "La connessione di computer in rete", "La protezione dei dati"],
    correct: 1,
    explanation: "La virtualizzazione è la tecnologia che consente di creare versioni virtuali di risorse informatiche (come sistemi operativi, server, dispositivi di archiviazione o risorse di rete) a partire da un'unica risorsa fisica."
  },
  {
    question: "Qual è la funzione di un 'sistema di gestione delle vendite' (Sales Management System)?",
    options: ["Gestire la contabilità", "Automatizzare e ottimizzare il processo di vendita, dalla generazione di lead alla chiusura delle trattative", "Pianificare la produzione", "Gestire le risorse umane"],
    correct: 1,
    explanation: "Un sistema di gestione delle vendite (Project Management System) è un software o un insieme di strumenti che aiutano a pianificare, organizzare, gestire e monitorare le risorse e le attività di un progetto per garantirne il completamento entro i tempi e il budget stabiliti."
  },
  {
    question: "Cosa si intende per 'protocollo FTP'?",
    options: ["Un protocollo per la navigazione web", "Un protocollo per il trasferimento di file tra computer su una rete", "Un protocollo per l'invio di email", "Un protocollo per la sicurezza dei dati"],
    correct: 1,
    explanation: "FTP (File Transfer Protocol) è un protocollo di rete standard utilizzato per il trasferimento di file tra un client e un server su una rete di computer."
  },
  {
    question: "Qual è la funzione di un 'sistema di gestione delle risorse umane' (HRIS)?",
    options: ["Gestire solo le paghe", "Un sistema informativo che integra le informazioni e i processi relativi alle risorse umane", "Creare documenti di testo", "Navigare su Internet"],
    correct: 1,
    explanation: "Un HRIS (Human Resources Information System) è un sistema che integra le informazioni e i processi relativi alle risorse umane, inclusi dati sui dipendenti, paghe, benefit, assenze e performance."
  },
  {
    question: "Cosa si intende per 'data warehouse'?",
    options: ["Un luogo fisico dove si conservano i dati", "Un sistema di archiviazione di grandi quantità di dati provenienti da diverse fonti, ottimizzato per l'analisi e il reporting", "Un tipo di software antivirus", "Un database transazionale"],
    correct: 1,
    explanation: "Un data warehouse è un sistema di archiviazione di dati progettato per l'analisi e il reporting, che aggrega dati da diverse fonti operative per fornire una visione consolidata e storica dell'azienda."
  },
  {
    question: "Qual è la funzione di un 'sistema di gestione della qualità' (QMS) secondo la norma ISO 9001?",
    options: ["Garantire la massima produzione", "Fornire un quadro per un sistema di gestione della qualità efficace, basato sul miglioramento continuo dei processi", "Controllare solo la qualità del prodotto finale", "Gestire le finanze aziendali"],
    correct: 1,
    explanation: "La norma ISO 9001 definisce i requisiti per un sistema di gestione della qualità (QMS) che le organizzazioni possono utilizzare per migliorare le prestazioni, soddisfare i clienti e conformarsi alle normative."
  },
  {
    question: "Cosa si intende per 'Business Process Management' (BPM)?",
    options: ["La gestione delle relazioni con i clienti", "Un approccio sistematico per analizzare, modellare, eseguire, monitorare e ottimizzare i processi aziendali", "La pianificazione delle strategie di marketing", "La gestione delle risorse umane"],
    correct: 1,
    explanation: "Il BPM (Business Process Management) è una disciplina che utilizza vari metodi per scoprire, modellare, analizzare, misurare, migliorare e ottimizzare i processi aziendali."
  },
  {
    question: "Qual è la funzione di un 'sistema di gestione delle relazioni con i fornitori' (SRM)?",
    options: ["Gestire le vendite", "Automatizzare e ottimizzare le interazioni con i fornitori per migliorare l'efficienza e ridurre i costi", "Creare nuovi prodotti", "Pianificare la produzione interna"],
    correct: 1,
    explanation: "Un sistema SRM (Supplier Relationship Management) è una strategia e un insieme di processi per gestire le interazioni di un'azienda con i suoi fornitori, con l'obiettivo di massimizzare il valore delle relazioni e ottimizzare la catena di approvvigionamento."
  },
  {
    question: "Cosa si intende per 'digital transformation'?",
    options: ["La conversione di documenti cartacei in formato digitale", "L'integrazione di tecnologie digitali in tutte le aree di un'azienda, cambiando fondamentalmente il modo in cui opera e fornisce valore ai clienti", "La vendita di prodotti online", "L'uso di software per la contabilità"],
    correct: 1,
    explanation: "La trasformazione digitale è l'integrazione della tecnologia digitale in tutte le aree di un'azienda, con conseguente cambiamento fondamentale nel modo in cui opera e fornisce valore ai clienti."
  },
  {
    question: "Qual è la funzione di un 'sistema di gestione del magazzino' (WMS)?",
    options: ["Gestire le relazioni con i clienti", "Automatizzare e ottimizzare le operazioni di magazzino, dalla ricezione alla spedizione", "Pianificare la produzione", "Gestire le risorse umane"],
    correct: 1,
    explanation: "Un WMS (Warehouse Management System) è un software che supporta le operazioni di magazzino, dalla ricezione delle merci al loro stoccaggio, prelievo e spedizione, ottimizzando l'efficienza e l'accuratezza."
  },
  {
    question: "Cosa si intende per 'data lake'?",
    options: ["Un tipo di database relazionale", "Un grande repository che memorizza dati grezzi in formato nativo, senza una struttura predefinita", "Un sistema di backup", "Un software di analisi dei dati"],
    correct: 1,
    explanation: "Un data lake è un grande repository che memorizza una vasta quantità di dati grezzi in formato nativo, inclusi dati strutturati, semi-strutturati e non strutturati, in attesa di essere analizzati."
  },
  {
    question: "Qual è la funzione di un 'sistema di gestione della sicurezza delle informazioni' (ISMS) secondo la norma ISO/IEC 27001?",
    options: ["Proteggere solo i dati personali", "Fornire un quadro per la gestione della sicurezza delle informazioni, garantendo riservatezza, integrità e disponibilità", "Gestire le password", "Controllare l'accesso fisico agli uffici"],
    correct: 1,
    explanation: "La norma ISO/IEC 27001 è uno standard internazionale che fornisce i requisiti per un sistema di gestione della sicurezza delle informazioni (ISMS), aiutando le organizzazioni a gestire la sicurezza delle proprie informazioni attraverso un approccio sistematico."
  },
  {
    question: "Cosa si intende per 'machine learning'?",
    options: ["Un tipo di hardware", "Un sottoinsieme dell'intelligenza artificiale che permette ai sistemi di apprendere dai dati senza essere esplicitamente programmati", "Un linguaggio di programmazione", "Un sistema operativo"],
    correct: 1,
    explanation: "Il Machine Learning (Apprendimento Automatico) è un sottoinsieme dell'intelligenza artificiale che si concentra sullo sviluppo di algoritmi che consentono ai sistemi di apprendere dai dati, identificare pattern e prendere decisioni con un intervento umano minimo."
  },
  {
    question: "Qual è la funzione di un 'sistema di gestione della conformità' (Compliance Management System)?",
    options: ["Gestire solo la conformità fiscale", "Un sistema che aiuta le organizzazioni a rispettare leggi, regolamenti, standard e politiche interne ed esterne", "Creare report finanziari", "Pianificare le strategie di marketing"],
    correct: 1,
    explanation: "Un CMS (Compliance Management System) è un sistema o un insieme di processi che aiutano un'organizzazione a identificare, monitorare e gestire i rischi di non conformità con leggi, regolamenti, standard e politiche interne ed esterne."
  },
  {
    question: "Cosa si intende per 'agile methodology' (metodologia agile) nello sviluppo software?",
    options: ["Un approccio di sviluppo software lineare e sequenziale", "Un insieme di pratiche che promuovono lo sviluppo iterativo, la collaborazione e la flessibilità", "Un metodo per scrivere codice in modo più veloce", "Un sistema per la gestione dei bug"],
    correct: 1,
    explanation: "La metodologia agile è un approccio iterativo e incrementale allo sviluppo software e alla gestione dei progetti, che si concentra sulla consegna rapida di valore, sulla collaborazione tra team e clienti, e sulla capacità di rispondere al cambiamento."
  },
  {
    question: "Qual è la funzione di un 'sistema di gestione della continuità operativa' (BCMS)?",
    options: ["Prevenire gli incidenti sul lavoro", "Un sistema che aiuta un'organizzazione a prepararsi e a riprendersi da interruzioni significative", "Gestire le relazioni con i clienti", "Pianificare le attività di marketing"],
    correct: 1,
    explanation: "Un BCMS (Business Continuity Management System) è un sistema di gestione che aiuta un'organizzazione a prepararsi e a rispondere a interruzioni, per garantire che le funzioni aziendali critiche possano continuare a operare o essere ripristinate rapidamente."
  },
  {
    question: "Cosa si intende per 'smart contract'?",
    options: ["Un contratto scritto a mano", "Un contratto digitale auto-eseguibile, le cui clausole sono scritte in codice su una blockchain", "Un contratto verbale", "Un contratto che non ha valore legale"],
    correct: 1,
    explanation: "Uno smart contract è un contratto digitale le cui clausole sono scritte in codice e memorizzate su una blockchain. Si auto-esegue quando le condizioni predefinite sono soddisfatte, senza la necessità di intermediari."
  },
  {
    question: "Qual è la funzione di un 'sistema di gestione delle relazioni con i partner' (PRM)?",
    options: ["Gestire le relazioni con i clienti", "Automatizzare e ottimizzare le interazioni con i partner di canale, come rivenditori e distributori", "Creare nuovi prodotti", "Pianificare la produzione interna"],
    correct: 1,
    explanation: "Un PRM (Partner Relationship Management) è un sistema che aiuta le aziende a gestire e ottimizzare le relazioni con i loro partner di canale (es. rivenditori, distributori), fornendo strumenti per la collaborazione, la formazione e la gestione delle vendite congiunte."
  },
  {
    question: "Cosa si intende per 'data privacy'?",
    options: ["La condivisione di tutti i dati personali", "La protezione dei dati personali e la garanzia che siano raccolti, utilizzati e conservati in conformità con le leggi e le normative", "La pubblicazione di dati sensibili", "La vendita di dati a terzi"],
    correct: 1,
    explanation: "La data privacy (privacy dei dati) si riferisce alla protezione delle informazioni personali e alla garanzia che siano raccolte, utilizzate, divulgate e conservate in conformità con le leggi e le normative applicabili, come il GDPR."
  },
  {
    question: "Qual è la funzione di un 'sistema di gestione dei rischi' (Risk Management System)?",
    options: ["Eliminare tutti i rischi aziendali", "Identificare, valutare, monitorare e mitigare i rischi che potrebbero influenzare gli obiettivi di un'organizzazione", "Gestire le relazioni con i clienti", "Pianificare le strategie di marketing"],
    correct: 1,
    explanation: "Un sistema di gestione dei rischi è un insieme di processi e strumenti per identificare, valutare, monitorare e mitigare i rischi che potrebbero influenzare il raggiungimento degli obiettivi di un'organizzazione."
  },
  {
    question: "Cosa si intende per 'API RESTful'?",
    options: ["Un tipo di database", "Un'architettura per la progettazione di API web che utilizza il protocollo HTTP", "Un linguaggio di programmazione", "Un sistema operativo"],
    correct: 1,
    explanation: "RESTful API è un'architettura per la progettazione di interfacce di programmazione delle applicazioni (API) web che si basa sui principi del protocollo HTTP, rendendo le API più semplici, scalabili e facili da usare."
  },
  {
    question: "Cosa si intende per 'diritto di regresso' in ambito tributario?",
    options: ["Il diritto del contribuente di chiedere il rimborso", "Il diritto dell'Amministrazione finanziaria di recuperare somme da chi ha beneficiato indebitamente", "Il diritto di un coobbligato di chiedere agli altri condebitori la parte di debito che ha pagato per tutti", "Il diritto di impugnare un atto"],
    correct: 2,
    explanation: "Il diritto di regresso è il diritto di un soggetto (es. un coobbligato solidale o un fideiussore) che ha pagato l'intero debito di chiedere agli altri condebitori o al debitore principale la loro quota."
  },
  {
    question: "Qual è la differenza tra 'imposta' e 'tassa'?",
    options: ["Non c'è differenza", "L'imposta è un prelievo coattivo senza controprestazione specifica, la tassa è un corrispettivo per un servizio pubblico specifico", "L'imposta è volontaria, la tassa è obbligatoria", "L'imposta è pagata solo dalle aziende, la tassa solo dai privati"],
    correct: 1,
    explanation: "L'imposta è un prelievo coattivo di ricchezza che lo Stato impone per finanziare le spese pubbliche generali, senza una controprestazione diretta. La tassa è un corrispettivo richiesto per l'erogazione di un servizio pubblico specifico e divisibile."
  },
  {
    question: "Cosa si intende per 'accertamento con adesione'?",
    options: ["Un accertamento fiscale definitivo", "Un accordo tra contribuente e Amministrazione finanziaria per definire bonariamente la pretesa tributaria", "Un accertamento basato solo sulla dichiarazione del contribuente", "Un accertamento d'ufficio"],
    correct: 1,
    explanation: "L'accertamento con adesione è un istituto che consente al contribuente e all'Amministrazione finanziaria di definire consensualmente la pretesa tributaria, evitando il contenzioso e beneficiando di una riduzione delle sanzioni."
  },
  {
    question: "Qual è la funzione del 'ravvedimento operoso'?",
    options: ["Annullare un atto fiscale", "Permettere al contribuente di regolarizzare spontaneamente violazioni tributarie, beneficiando di sanzioni ridotte", "Sospendere il pagamento di un tributo", "Chiedere un rimborso"],
    correct: 1,
    explanation: "Il ravvedimento operoso è un istituto che consente al contribuente di sanare spontaneamente le violazioni tributarie commesse, beneficiando di una riduzione delle sanzioni in base al momento in cui avviene la regolarizzazione."
  },
  {
    question: "Cosa si intende per 'contenzioso tributario'?",
    options: ["La fase di riscossione coattiva", "La procedura giudiziale per la risoluzione delle controversie tra contribuente e Amministrazione finanziaria", "Il processo di accertamento fiscale", "La fase di controllo delle dichiarazioni"],
    correct: 1,
    explanation: "Il contenzioso tributario è l'insieme delle procedure giudiziali (ricorsi alle Commissioni Tributarie) attraverso le quali si risolvono le controversie tra il contribuente e l'Amministrazione finanziaria in materia di tributi."
  },
  {
    question: "Qual è l'organo giurisdizionale competente per le controversie tributarie di primo grado?",
    options: ["Il Tribunale Ordinario", "La Corte d'Appello", "La Commissione Tributaria Provinciale", "La Corte di Cassazione"],
    correct: 2,
    explanation: "Le controversie tributarie di primo grado sono di competenza della Commissione Tributaria Provinciale."
  },
  {
    question: "Cosa si intende per 'onere della prova' nel processo tributario?",
    options: ["L'obbligo del contribuente di pagare le imposte", "L'obbligo di chi afferma un fatto in giudizio di provarlo", "L'obbligo del giudice di trovare le prove", "L'obbligo dell'Amministrazione di non fornire prove"],
    correct: 1,
    explanation: "L'onere della prova è il principio per cui chi intende far valere un diritto in giudizio deve provare i fatti che ne costituiscono il fondamento. Nel processo tributario, l'onere della prova grava principalmente sull'Amministrazione finanziaria per la pretesa impositiva, ma anche sul contribuente per i fatti a suo favore."
  },
  {
    question: "Qual è la funzione del 'principio di capacità contributiva' in diritto tributario?",
    options: ["Stabilire che tutti pagano le stesse imposte", "Affermare che ciascuno deve concorrere alle spese pubbliche in base alla propria capacità economica", "Prevedere che solo i ricchi pagano le imposte", "Garantire la segretezza dei dati fiscali"],
    correct: 1,
    explanation: "Il principio di capacità contributiva (art. 53 Cost.) stabilisce che tutti sono tenuti a concorrere alle spese pubbliche in ragione della loro capacità contributiva, intesa come forza economica del soggetto."
  },
  {
    question: "Cosa si intende per 'prescrizione' in diritto tributario?",
    options: ["La sospensione del pagamento", "L'estinzione del diritto di credito dell'Amministrazione finanziaria per il decorso del tempo", "Il condono fiscale", "La rateizzazione del debito"],
    correct: 1,
    explanation: "La prescrizione è un modo di estinzione del diritto di credito dell'Amministrazione finanziaria (o di qualsiasi altro diritto) per il mancato esercizio dello stesso entro un determinato termine stabilito dalla legge."
  },
  {
    question: "Qual è la funzione del 'condono fiscale'?",
    options: ["Annullare tutti i debiti tributari", "Permettere ai contribuenti di sanare posizioni debitorie o irregolarità fiscali a condizioni agevolate", "Aumentare le imposte", "Sospendere i controlli fiscali"],
    correct: 1,
    explanation: "Il condono fiscale è un provvedimento legislativo straordinario che consente ai contribuenti di regolarizzare la propria posizione fiscale, sanando violazioni o debiti, a condizioni più favorevoli rispetto a quelle ordinarie (es. riduzione di sanzioni e interessi)."
  },
  {
    question: "Cosa si intende per 'elusione fiscale'?",
    options: ["La violazione di norme tributarie con l'intento di evadere", "Il risparmio d'imposta ottenuto attraverso comportamenti leciti ma finalizzati ad aggirare norme fiscali", "L'errore nella compilazione della dichiarazione", "La mancata presentazione della dichiarazione"],
    correct: 1,
    explanation: "L'elusione fiscale (o abuso del diritto) si verifica quando il contribuente, pur agendo formalmente nel rispetto della legge, pone in essere operazioni prive di sostanza economica e non giustificate da valide ragioni economiche, allo scopo di ottenere un indebito vantaggio fiscale."
  },
  {
    question: "Qual è la differenza tra 'evasione fiscale' ed 'elusione fiscale'?",
    options: ["Non c'è differenza", "L'evasione è illegale, l'elusione è lecita ma abusiva", "L'evasione è un errore, l'elusione è un reato", "L'evasione riguarda solo le imposte dirette, l'elusione solo quelle indirette"],
    correct: 1,
    explanation: "L'evasione fiscale è un comportamento illegale che consiste nel sottrarsi all'obbligo di pagare le imposte. L'elusione fiscale, pur non essendo formalmente illegale, consiste nell'aggirare le norme fiscali per ottenere un vantaggio indebito."
  },
  {
    question: "Cosa si intende per 'imposta sul valore aggiunto' (IVA)?",
    options: ["Un'imposta sul reddito", "Un'imposta sui consumi che grava sul valore aggiunto in ogni fase della produzione e distribuzione", "Un'imposta sul patrimonio", "Un'imposta sulle successioni"],
    correct: 1,
    explanation: "L'IVA (Imposta sul Valore Aggiunto) è un'imposta indiretta che colpisce i consumi, applicata sul valore aggiunto in ogni fase della produzione e scambio di beni e servizi."
  },
  {
    question: "Qual è la funzione del 'codice fiscale'?",
    options: ["Identificare l'azienda", "Identificare in modo univoco una persona fisica o giuridica nei rapporti con l'Amministrazione finanziaria", "Un codice segreto", "Un codice per accedere a Internet"],
    correct: 1,
    explanation: "Il codice fiscale è un codice alfanumerico che identifica in modo univoco le persone fisiche e gli altri soggetti (es. enti, società) nei rapporti con l'Amministrazione finanziaria e altre amministrazioni pubbliche."
  },
  {
    question: "Cosa si intende per 'dichiarazione dei redditi'?",
    options: ["Un documento che attesta i debiti", "Un documento con cui il contribuente comunica all'Amministrazione finanziaria i propri redditi e calcola le imposte dovute", "Una richiesta di rimborso", "Un avviso di accertamento"],
    correct: 1,
    explanation: "La dichiarazione dei redditi è il documento con cui il contribuente comunica all'Amministrazione finanziaria i propri redditi percepiti in un determinato periodo d'imposta e calcola le imposte dovute."
  },
  {
    question: "Qual è la funzione del 'modello F24'?",
    options: ["Richiedere un rimborso fiscale", "Effettuare il pagamento di tributi, contributi e altre somme dovute", "Presentare la dichiarazione dei redditi", "Comunicare un cambio di residenza"],
    correct: 1,
    explanation: "Il modello F24 è il modulo unificato per il versamento di imposte, tasse, contributi e altre somme dovute allo Stato, agli enti locali e all'INPS."
  },
  {
    question: "Cosa si intende per 'ritenuta d'acconto'?",
    options: ["Un anticipo di imposta che viene trattenuto alla fonte da chi eroga un reddito", "Una sanzione per mancato pagamento", "Un rimborso fiscale", "Un credito d'imposta"],
    correct: 0,
    explanation: "La ritenuta d'acconto è una somma che viene trattenuta alla fonte (es. dal datore di lavoro, dal committente) a titolo di anticipo sulle imposte dovute dal percipiente del reddito."
  },
  {
    question: "Qual è la funzione dell' 'Agenzia delle Entrate'?",
    options: ["La riscossione dei tributi", "L'accertamento e la riscossione dei tributi", "La gestione delle dogane", "L'emissione di moneta"],
    correct: 1,
    explanation: "L'Agenzia delle Entrate è un'agenzia fiscale che si occupa principalmente dell'accertamento, della riscossione e della gestione dei tributi erariali."
  },
  {
    question: "Cosa si intende per 'tributo'?",
    options: ["Una donazione volontaria", "Un prelievo coattivo di ricchezza imposto dalla legge per finanziare le spese pubbliche", "Un prestito allo Stato", "Una sanzione amministrativa"],
    correct: 1,
    explanation: "Il tributo è una prestazione patrimoniale coattiva imposta dalla legge per finanziare le spese pubbliche o per il perseguimento di fini di interesse generale."
  },
  {
    question: "Qual è la funzione del 'Regolamento (UE) 2016/679' (GDPR)?",
    options: ["Regolare il commercio internazionale", "Proteggere i dati personali e la loro libera circolazione", "Definire le norme sulla concorrenza", "Regolamentare i contratti"],
    correct: 1,
    explanation: "Il Regolamento Generale sulla Protezione dei Dati (GDPR) è una normativa europea che stabilisce regole sulla protezione delle persone fisiche con riguardo al trattamento dei dati personali e alla libera circolazione di tali dati."
  },
  {
    question: "Cosa si intende per 'firma digitale'?",
    options: ["Una firma apposta con una penna speciale", "Un sistema che garantisce l'autenticità, l'integrità e il non ripudio di un documento informatico", "Una scansione della propria firma", "Un tipo di password"],
    correct: 1,
    explanation: "La firma digitale è un particolare tipo di firma elettronica qualificata basata su un sistema di chiavi crittografiche, che garantisce l'autenticità (identità del firmatario), l'integrità (non modificabilità del documento) e il non ripudio del documento informatico."
  },
  {
    question: "Qual è la funzione di un 'database relazionale'?",
    options: ["Archiviare documenti non strutturati", "Organizzare dati in tabelle con relazioni definite tra loro", "Creare presentazioni multimediali", "Gestire le email"],
    correct: 1,
    explanation: "Un database relazionale organizza i dati in una o più tabelle (o 'relazioni') di colonne e righe, con un identificatore univoco per ogni riga, e stabilisce relazioni tra queste tabelle."
  },
  {
    question: "Cosa si intende per 'API' (Application Programming Interface)?",
    options: ["Un tipo di virus informatico", "Un insieme di definizioni e protocolli per la creazione e l'integrazione di software applicativo", "Un dispositivo hardware", "Un linguaggio di programmazione"],
    correct: 1,
    explanation: "Un'API (Application Programming Interface) è un insieme di regole e definizioni che consentono a diverse applicazioni software di comunicare tra loro."
  },
  {
    question: "Qual è il vantaggio principale di utilizzare un foglio di calcolo per l'analisi dei dati?",
    options: ["Creare documenti di testo complessi", "Eseguire calcoli automatici, organizzare dati in tabelle e creare grafici", "Navigare su Internet", "Gestire database di grandi dimensioni"],
    correct: 1,
    explanation: "I fogli di calcolo (es. Excel) sono estremamente utili per l'analisi dei dati grazie alla loro capacità di eseguire calcoli automatici, organizzare dati in tabelle, filtrare, ordinare e creare grafici."
  },
  {
    question: "Cosa si intende per 'rete client-server'?",
    options: ["Una rete dove tutti i computer hanno le stesse funzionalità", "Una rete dove alcuni computer (client) richiedono servizi a altri computer (server)", "Una rete senza fili", "Una rete limitata a un singolo edificio"],
    correct: 1,
    explanation: "In una rete client-server, i client sono i dispositivi o i programmi che richiedono servizi, mentre i server sono i dispositivi o i programmi che forniscono tali servizi (es. file server, web server, database server)."
  },
  {
    question: "Qual è la funzione di un 'sistema di controllo di versione' (es. Git)?",
    options: ["Creare backup automatici dei file", "Tracciare e gestire le modifiche al codice sorgente o ad altri documenti nel tempo", "Proteggere i file da virus", "Comprimere i file per l'archiviazione"],
    correct: 1,
    explanation: "Un sistema di controllo di versione (VCS - Version Control System) come Git permette di tracciare e gestire le modifiche apportate a file o insiemi di file nel tempo, consentendo di tornare a versioni precedenti, collaborare su progetti e gestire diverse linee di sviluppo."
  },
  {
    question: "Cosa si intende per 'cybersecurity'?",
    options: ["La protezione dei dati fisici", "L'insieme delle tecnologie e dei processi volti a proteggere sistemi, reti e programmi da attacchi digitali", "La gestione dei cavi di rete", "La creazione di siti web"],
    correct: 1,
    explanation: "La cybersecurity (sicurezza informatica) è l'insieme delle pratiche, dei processi e delle tecnologie progettate per proteggere reti, dispositivi, programmi e dati da attacchi, danni o accessi non autorizzati."
  },
  {
    question: "Qual è la funzione di un 'server' in una rete informatica?",
    options: ["Visualizzare pagine web", "Fornire servizi e risorse ad altri computer (client) nella rete", "Scrivere documenti di testo", "Stampare documenti"],
    correct: 1,
    explanation: "Un server è un computer o un programma che fornisce funzionalità (servizi, dati, risorse) ad altri programmi o computer, chiamati 'client', attraverso una rete."
  },
  {
    question: "Cosa si intende per 'firewall hardware'?",
    options: ["Un software antivirus", "Un dispositivo fisico che protegge la rete", "Un tipo di stampante", "Un cavo di rete"],
    correct: 1,
    explanation: "Un firewall hardware è un dispositivo fisico che si interpone tra la rete interna e la rete esterna (es. Internet) per filtrare il traffico e impedire accessi non autorizzati."
  },
  {
    question: "Qual è lo scopo principale di un sistema di gestione documentale (DMS)?",
    options: ["Archiviare documenti cartacei", "Organizzare, archiviare e gestire documenti elettronici", "Creare presentazioni", "Inviare email massive"],
    correct: 1,
    explanation: "Un sistema di gestione documentale (DMS) è un software utilizzato per organizzare, archiviare, gestire e tracciare documenti elettronici e immagini di documenti cartacei."
  },
  {
    question: "Cosa si intende per 'protocollo HTTPS'?",
    options: ["Un protocollo per l'invio di email", "Un protocollo per la navigazione web sicura", "Un protocollo per la condivisione di file", "Un protocollo per la sicurezza dei dati"],
    correct: 1,
    explanation: "HTTPS (Hypertext Transfer Protocol Secure) è la versione sicura del protocollo HTTP, che garantisce la crittografia delle comunicazioni tra il browser web dell'utente e il server del sito web, proteggendo la riservatezza e l'integrità dei dati."
  },
  {
    question: "Qual è la funzione di un 'router' in una rete?",
    options: ["Memorizzare dati", "Connettere diverse reti e instradare i pacchetti di dati tra di esse", "Visualizzare video", "Scrivere codice"],
    correct: 1,
    explanation: "Un router è un dispositivo di rete che inoltra i pacchetti di dati tra reti di computer, determinando il percorso migliore per la trasmissione dei dati."
  },
  {
    question: "Cosa si intende per 'malware'?",
    options: ["Un software di utilità", "Un software dannoso progettato per danneggiare o accedere a sistemi informatici senza autorizzazione", "Un tipo di hardware", "Un linguaggio di programmazione"],
    correct: 1,
    explanation: "Malware è un termine generico che include qualsiasi software maligno progettato per danneggiare, disabilitare o accedere a sistemi informatici senza il consenso dell'utente (es. virus, worm, trojan, spyware)."
  },
  {
    question: "Qual è la funzione del 'Task Manager' (Gestione attività) in Windows?",
    options: ["Scrivere documenti", "Gestire i file e le cartelle", "Monitorare i processi in esecuzione, le prestazioni del sistema e le applicazioni", "Navigare in Internet"],
    correct: 2,
    explanation: "Il Task Manager di Windows è uno strumento che consente agli utenti di monitorare i processi in esecuzione, le prestazioni del sistema (CPU, memoria, disco, rete) e di gestire le applicazioni."
  },
  {
    question: "Cosa si intende per 'phishing mirato' (spear phishing)?",
    options: ["Un attacco phishing generico", "Un attacco phishing diretto a un individuo o organizzazione specifica", "Un tipo di attacco DDoS", "Un metodo per recuperare password dimenticate"],
    correct: 1,
    explanation: "Lo spear phishing è una forma di phishing altamente mirata, in cui l'attaccante personalizza il messaggio per renderlo più credibile a una specifica vittima o gruppo di vittime, spesso basandosi su informazioni raccolte su di esse."
  },
  {
    question: "Qual è la differenza tra 'RAM' e 'ROM'?",
    options: ["La RAM è la memoria di archiviazione a lungo termine, la ROM è la memoria volatile", "La RAM è la memoria volatile di lavoro, la ROM è la memoria di sola lettura non volatile", "La RAM è più lenta della ROM", "La ROM è utilizzata solo per i programmi, la RAM per i dati"],
    correct: 1,
    explanation: "La RAM (Random Access Memory) è una memoria volatile utilizzata per l'elaborazione dei dati in tempo reale, mentre la ROM (Read-Only Memory) è una memoria non volatile che contiene istruzioni permanenti necessarie all'avvio del sistema."
  },
  {
    question: "Cosa si intende per 'VPN' (Virtual Private Network)?",
    options: ["Una rete locale", "Una rete pubblica non sicura", "Una connessione di rete che crea un tunnel sicuro e crittografato su una rete pubblica", "Un tipo di server"],
    correct: 2,
    explanation: "Una VPN (Virtual Private Network) crea una connessione di rete privata su una rete pubblica (come Internet), consentendo agli utenti di inviare e ricevere dati in modo sicuro e anonimo, come se i loro dispositivi fossero direttamente connessi alla rete privata."
  },
  {
    question: "Qual è il formato di file più comune per le immagini con trasparenza?",
    options: [".jpeg", ".bmp", ".png", ".gif"],
    correct: 2,
    explanation: "Il formato PNG (Portable Network Graphics) è ampiamente utilizzato per le immagini che richiedono trasparenza, oltre a supportare la compressione senza perdita di qualità."
  },
  {
    question: "Cosa si intende per 'cookie' in ambito web?",
    options: ["Un tipo di virus informatico", "Piccoli file di testo memorizzati dal browser web per tracciare le preferenze dell'utente", "Un programma per la gestione dei download", "Un sistema di autenticazione"],
    correct: 1,
    explanation: "I cookie sono piccoli file di testo che i siti web memorizzano sul computer dell'utente tramite il browser, utilizzati per memorizzare informazioni sulle preferenze dell'utente, lo stato di login, o per tracciare il comportamento di navigazione."
  },
  {
    question: "Qual è la funzione di un 'motore di ricerca'?",
    options: ["Creare siti web", "Trovare informazioni sul World Wide Web", "Gestire la posta elettronica", "Creare documenti di testo"],
    correct: 1,
    explanation: "Un motore di ricerca (es. Google, Bing) è un'applicazione software progettata per cercare informazioni sul World Wide Web."
  },
  {
    question: "Cosa si intende per 'spamming' nel contesto della posta elettronica?",
    options: ["L'invio di email importanti", "L'invio massivo e non richiesto di messaggi di posta elettronica", "La ricezione di email da contatti noti", "La cancellazione di email indesiderate"],
    correct: 1,
    explanation: "Lo spamming è la pratica di inviare grandi quantità di messaggi non richiesti (spam) a un vasto numero di destinatari, tipicamente a scopo commerciale o fraudolento."
  },
  {
    question: "Qual è la funzione principale di un 'sistema di gestione delle relazioni con i clienti' (CRM)?",
    options: ["Gestire la contabilità aziendale", "Automatizzare e analizzare le interazioni e i dati dei clienti per migliorare i rapporti commerciali", "Pianificare le risorse aziendali", "Proteggere i dati da attacchi informatici"],
    correct: 1,
    explanation: "Un sistema CRM (Customer Relationship Management) è un software che aiuta le aziende a gestire e analizzare le interazioni con i clienti e i dati durante il ciclo di vita del cliente, con l'obiettivo di migliorare i rapporti commerciali e favorire la crescita delle vendite."
  },
  {
    question: "Cosa si intende per 'algoritmo' in informatica?",
    options: ["Un tipo di hardware", "Una sequenza finita di istruzioni ben definite per risolvere un problema o eseguire un compito", "Un linguaggio di programmazione", "Un sistema operativo"],
    correct: 1,
    explanation: "Un algoritmo è una sequenza finita e ordinata di istruzioni o passi ben definiti, che devono essere eseguiti per risolvere un problema o completare un compito."
  },
  {
    question: "Qual è la funzione di un 'sistema di gestione dei progetti' (PMS)?",
    options: ["Gestire la contabilità", "Pianificare, eseguire e monitorare i progetti dall'inizio alla fine", "Creare presentazioni", "Gestire le risorse umane"],
    correct: 1,
    explanation: "Un sistema di gestione dei progetti (Project Management System) è un software o un insieme di strumenti che aiutano a pianificare, organizzare, gestire e monitorare le risorse e le attività di un progetto per garantirne il completamento entro i tempi e il budget stabiliti."
  },
  {
    question: "Cosa si intende per 'data governance'?",
    options: ["La protezione dei dati personali", "L'insieme di processi, ruoli, politiche, standard e metriche che assicurano un uso efficace ed efficiente delle informazioni", "La raccolta di grandi quantità di dati", "La cancellazione dei dati obsoleti"],
    correct: 1,
    explanation: "La data governance è un sistema di regole, responsabilità e processi che garantiscono la qualità, la disponibilità, l'usabilità, la sicurezza e la conformità dei dati utilizzati in un'organizzazione."
  },
  {
    question: "Qual è la funzione di un 'sistema di Business Intelligence' (BI)?",
    options: ["Generare report finanziari", "Raccogliere, analizzare e presentare dati aziendali per supportare il processo decisionale strategico", "Gestire le relazioni con i clienti", "Automatizzare la produzione"],
    correct: 1,
    explanation: "Un sistema di Business Intelligence (BI) è un insieme di tecnologie e processi che consentono di raccogliere, analizzare e presentare dati aziendali per supportare le decisioni strategiche e tattiche, fornendo insight sulle performance passate e attuali."
  },
  {
    question: "Cosa si intende per 'cybercrime'?",
    options: ["Crimini commessi con l'uso di armi", "Attività criminali che coinvolgono computer, reti o Internet", "Crimini finanziari", "Crimini contro la proprietà"],
    correct: 1,
    explanation: "Il cybercrime (crimine informatico) si riferisce a qualsiasi attività criminale che coinvolge l'uso di computer, reti informatiche o Internet, sia come strumento per commettere il reato, sia come obiettivo del reato stesso."
  },
  {
    question: "Qual è la funzione di un 'sistema di gestione della relazione con i fornitori' (SRM)?",
    options: ["Gestire le vendite", "Automatizzare e ottimizzare le interazioni con i fornitori", "Creare nuovi prodotti", "Pianificare la produzione interna"],
    correct: 1,
    explanation: "Un sistema SRM (Supplier Relationship Management) è una strategia e un insieme di processi per gestire le interazioni di un'azienda con i suoi fornitori, con l'obiettivo di massimizzare il valore delle relazioni e ottimizzare la catena di approvvigionamento."
  },
  {
    question: "Cosa si intende per 'cloud storage'?",
    options: ["L'archiviazione di dati su un disco rigido locale", "L'archiviazione di dati su server remoti accessibili tramite una rete", "L'archiviazione di dati su CD/DVD", "L'archiviazione di dati su chiavette USB"],
    correct: 1,
    explanation: "Il cloud storage è un modello di archiviazione di dati digitali in pool logici, dove lo storage fisico si estende su più server, e l'ambiente fisico è tipicamente di proprietà e gestito da un fornitore di hosting, accessibile tramite una rete."
  },
  {
    question: "Qual è la funzione di un 'sistema di gestione degli incidenti' (Incident Management System)?",
    options: ["Prevenire gli incidenti sul lavoro", "Registrare, classificare, assegnare e risolvere gli incidenti IT o di altro tipo", "Gestire le relazioni con i clienti", "Pianificare le attività di marketing"],
    correct: 1,
    explanation: "Un sistema di gestione degli incidenti (Incident Management System) è uno strumento o un processo utilizzato per registrare, tracciare, gestire e risolvere gli incidenti (es. interruzioni di servizio IT, problemi di sicurezza) in modo efficiente e sistematico."
  },
  {
    question: "Cosa si intende per 'protocollo SMTP'?",
    options: ["Un protocollo per la navigazione web", "Un protocollo per l'invio di posta elettronica", "Un protocollo per la condivisione di file", "Un protocollo per la sicurezza dei dati"],
    correct: 1,
    explanation: "SMTP (Simple Mail Transfer Protocol) è il protocollo standard per l'invio di posta elettronica su Internet."
  },
  {
    question: "Qual è la funzione di un 'sistema di gestione della qualità ISO 9001'?",
    options: ["Certificare i prodotti", "Fornire un quadro per un sistema di gestione della qualità efficace, basato sul miglioramento continuo", "Gestire la contabilità", "Controllare le risorse umane"],
    correct: 1,
    explanation: "La norma ISO 9001 è uno standard internazionale per i sistemi di gestione della qualità (QMS) che fornisce un quadro per le organizzazioni per garantire che soddisfano costantemente le esigenze dei clienti e le normative, migliorando la soddisfazione del cliente e l'efficienza operativa."
  },
  {
    question: "Cosa si intende per 'data visualization'?",
    options: ["La raccolta di dati", "La presentazione grafica di dati e informazioni per renderli più comprensibili e accessibili", "La protezione dei dati", "La cancellazione dei dati"],
    correct: 1,
    explanation: "La data visualization (visualizzazione dei dati) è la rappresentazione grafica di informazioni e dati, utilizzando elementi visivi come grafici, diagrammi e mappe per rendere più facile la comprensione di tendenze, valori anomali e pattern nei dati."
  },
  {
    question: "Qual è la funzione di un 'sistema di gestione delle risorse aziendali' (ERM)?",
    options: ["Gestire solo le risorse umane", "Un approccio integrato per identificare, valutare e gestire i rischi che possono influenzare il raggiungimento degli obiettivi aziendali", "Creare report finanziari", "Pianificare le strategie di marketing"],
    correct: 1,
    explanation: "Un sistema ERM (Enterprise Risk Management) è un processo adottato da un'organizzazione per identificare, valutare, gestire e controllare i rischi che potrebbero influenzare il raggiungimento dei suoi obiettivi, fornendo una ragionevole garanzia."
  },
  {
    question: "Cosa si intende per 'Internet Service Provider' (ISP)?",
    options: ["Un'azienda che produce hardware", "Un'azienda che fornisce servizi di accesso a Internet", "Un software antivirus", "Un motore di ricerca"],
    correct: 1,
    explanation: "Un ISP (Internet Service Provider) è un'azienda che fornisce servizi di accesso a Internet ai propri clienti, sia privati che aziende."
  },
  {
    question: "Qual è la funzione di un 'sistema di gestione delle relazioni con i dipendenti' (ERM)?",
    options: ["Gestire le relazioni con i clienti", "Automatizzare e ottimizzare i processi relativi all'engagement e alla soddisfazione dei dipendenti", "Pianificare la produzione", "Gestire la contabilità"],
    correct: 1,
    explanation: "Un sistema ERM (Employee Relationship Management) si concentra sull'ottimizzazione delle interazioni tra l'azienda e i suoi dipendenti, migliorando l'engagement, la soddisfazione e la produttività."
  },
  {
    question: "Cosa si intende per 'digital footprint'?",
    options: ["L'impronta digitale di una persona", "La traccia di dati che una persona lascia online attraverso le sue attività su Internet", "Un tipo di virus", "Un sistema di sicurezza biometrica"],
    correct: 1,
    explanation: "La 'digital footprint' (impronta digitale digitale) è la traccia di dati che una persona lascia dietro di sé attraverso le sue attività online, come l'utilizzo dei social media, la navigazione web, gli acquisti online e le comunicazioni via email."
  },
  {
    question: "Qual è la funzione di un 'sistema di gestione della sicurezza informatica' (CSMS)?",
    options: ["Gestire la sicurezza fisica degli uffici", "Un insieme di politiche, processi e tecnologie per proteggere i sistemi informatici e i dati da minacce digitali", "Creare backup di dati", "Monitorare le prestazioni del computer"],
    correct: 1,
    explanation: "Un CSMS (Cybersecurity Management System) è un approccio sistematico per gestire i rischi di cybersecurity, implementando controlli e misure per proteggere le risorse informative."
  },
  {
    question: "Cosa si intende per 'ransomware'?",
    options: ["Un tipo di software antivirus", "Un malware che cripta i file di un utente e richiede un riscatto per decriptarli", "Un programma per la gestione dei database", "Un software per la creazione di grafica"],
    correct: 1,
    explanation: "Il ransomware è un tipo di malware che blocca l'accesso ai dati o al sistema informatico dell'utente, criptando i file o bloccando l'accesso al sistema, e richiede un pagamento (riscatto) per ripristinare l'accesso."
  },
  {
    question: "Qual è la funzione di un 'sistema di gestione dei contenuti aziendali' (ECM)?",
    options: ["Gestire solo i documenti cartacei", "Organizzare e gestire tutti i contenuti non strutturati di un'organizzazione (documenti, email, immagini, video)", "Creare siti web", "Gestire le relazioni con i clienti"],
    correct: 1,
    explanation: "Un ECM (Enterprise Content Management) è un insieme di strategie, metodi e strumenti per acquisire, gestire, archiviare, preservare e fornire contenuti e documenti aziendali, supportando i processi organizzativi."
  },
  {
    question: "Cosa si intende per 'virtualizzazione'?",
    options: ["La creazione di copie fisiche di hardware", "La creazione di versioni virtuali di risorse informatiche (es. sistemi operativi, server, storage)", "La connessione di computer in rete", "La protezione dei dati"],
    correct: 1,
    explanation: "La virtualizzazione è la tecnologia che consente di creare versioni virtuali di risorse informatiche (come sistemi operativi, server, dispositivi di archiviazione o risorse di rete) a partire da un'unica risorsa fisica."
  },
  {
    question: "Qual è la funzione di un 'sistema di gestione delle vendite' (Sales Management System)?",
    options: ["Gestire la contabilità", "Automatizzare e ottimizzare il processo di vendita, dalla generazione di lead alla chiusura delle trattative", "Pianificare la produzione", "Gestire le risorse umane"],
    correct: 1,
    explanation: "Un sistema di gestione delle vendite (Project Management System) è un software o un insieme di strumenti che aiutano a pianificare, organizzare, gestire e monitorare le risorse e le attività di un progetto per garantirne il completamento entro i tempi e il budget stabiliti."
  },
  {
    question: "Cosa si intende per 'protocollo FTP'?",
    options: ["Un protocollo per la navigazione web", "Un protocollo per il trasferimento di file tra computer su una rete", "Un protocollo per l'invio di email", "Un protocollo per la sicurezza dei dati"],
    correct: 1,
    explanation: "FTP (File Transfer Protocol) è un protocollo di rete standard utilizzato per il trasferimento di file tra un client e un server su una rete di computer."
  },
  {
    question: "Qual è la funzione di un 'sistema di gestione delle risorse umane' (HRIS)?",
    options: ["Gestire solo le paghe", "Un sistema informativo che integra le informazioni e i processi relativi alle risorse umane", "Creare documenti di testo", "Navigare su Internet"],
    correct: 1,
    explanation: "Un HRIS (Human Resources Information System) è un sistema che integra le informazioni e i processi relativi alle risorse umane, inclusi dati sui dipendenti, paghe, benefit, assenze e performance."
  },
  {
    question: "Cosa si intende per 'data warehouse'?",
    options: ["Un luogo fisico dove si conservano i dati", "Un sistema di archiviazione di grandi quantità di dati provenienti da diverse fonti, ottimizzato per l'analisi e il reporting", "Un tipo di software antivirus", "Un database transazionale"],
    correct: 1,
    explanation: "Un data warehouse è un sistema di archiviazione di dati progettato per l'analisi e il reporting, che aggrega dati da diverse fonti operative per fornire una visione consolidata e storica dell'azienda."
  },
  {
    question: "Qual è la funzione di un 'sistema di gestione della qualità' (QMS) secondo la norma ISO 9001?",
    options: ["Garantire la massima produzione", "Fornire un quadro per un sistema di gestione della qualità efficace, basato sul miglioramento continuo dei processi", "Controllare solo la qualità del prodotto finale", "Gestire le finanze aziendali"],
    correct: 1,
    explanation: "La norma ISO 9001 definisce i requisiti per un sistema di gestione della qualità (QMS) che le organizzazioni possono utilizzare per migliorare le prestazioni, soddisfare i clienti e conformarsi alle normative."
  },
  {
    question: "Cosa si intende per 'Business Process Management' (BPM)?",
    options: ["La gestione delle relazioni con i clienti", "Un approccio sistematico per analizzare, modellare, eseguire, monitorare e ottimizzare i processi aziendali", "La pianificazione delle strategie di marketing", "La gestione delle risorse umane"],
    correct: 1,
    explanation: "Il BPM (Business Process Management) è una disciplina che utilizza vari metodi per scoprire, modellare, analizzare, misurare, migliorare e ottimizzare i processi aziendali."
  },
  {
    question: "Qual è la funzione di un 'sistema di gestione delle relazioni con i fornitori' (SRM)?",
    options: ["Gestire le vendite", "Automatizzare e ottimizzare le interazioni con i fornitori per migliorare l'efficienza e ridurre i costi", "Creare nuovi prodotti", "Pianificare la produzione interna"],
    correct: 1,
    explanation: "Un sistema SRM (Supplier Relationship Management) è una strategia e un insieme di processi per gestire le interazioni di un'azienda con i suoi fornitori, con l'obiettivo di massimizzare il valore delle relazioni e ottimizzare la catena di approvvigionamento."
  },
  {
    question: "Cosa si intende per 'digital transformation'?",
    options: ["La conversione di documenti cartacei in formato digitale", "L'integrazione di tecnologie digitali in tutte le aree di un'azienda, cambiando fondamentalmente il modo in cui opera e fornisce valore ai clienti", "La vendita di prodotti online", "L'uso di software per la contabilità"],
    correct: 1,
    explanation: "La trasformazione digitale è l'integrazione della tecnologia digitale in tutte le aree di un'azienda, con conseguente cambiamento fondamentale nel modo in cui opera e fornisce valore ai clienti."
  },
  {
    question: "Qual è la funzione di un 'sistema di gestione del magazzino' (WMS)?",
    options: ["Gestire le relazioni con i clienti", "Automatizzare e ottimizzare le operazioni di magazzino, dalla ricezione alla spedizione", "Pianificare la produzione", "Gestire le risorse umane"],
    correct: 1,
    explanation: "Un WMS (Warehouse Management System) è un software che supporta le operazioni di magazzino, dalla ricezione delle merci al loro stoccaggio, prelievo e spedizione, ottimizzando l'efficienza e l'accuratezza."
  },
  {
    question: "Cosa si intende per 'data lake'?",
    options: ["Un tipo di database relazionale", "Un grande repository che memorizza dati grezzi in formato nativo, senza una struttura predefinita", "Un sistema di backup", "Un software di analisi dei dati"],
    correct: 1,
    explanation: "Un data lake è un grande repository che memorizza una vasta quantità di dati grezzi in formato nativo, inclusi dati strutturati, semi-strutturati e non strutturati, in attesa di essere analizzati."
  },
  {
    question: "Qual è la funzione di un 'sistema di gestione della sicurezza delle informazioni' (ISMS) secondo la norma ISO/IEC 27001?",
    options: ["Proteggere solo i dati personali", "Fornire un quadro per la gestione della sicurezza delle informazioni, garantendo riservatezza, integrità e disponibilità", "Gestire le password", "Controllare l'accesso fisico agli uffici"],
    correct: 1,
    explanation: "La norma ISO/IEC 27001 è uno standard internazionale che fornisce i requisiti per un sistema di gestione della sicurezza delle informazioni (ISMS), aiutando le organizzazioni a gestire la sicurezza delle proprie informazioni attraverso un approccio sistematico."
  },
  {
    question: "Cosa si intende per 'machine learning'?",
    options: ["Un tipo di hardware", "Un sottoinsieme dell'intelligenza artificiale che permette ai sistemi di apprendere dai dati senza essere esplicitamente programmati", "Un linguaggio di programmazione", "Un sistema operativo"],
    correct: 1,
    explanation: "Il Machine Learning (Apprendimento Automatico) è un sottoinsieme dell'intelligenza artificiale che si concentra sullo sviluppo di algoritmi che consentono ai sistemi di apprendere dai dati, identificare pattern e prendere decisioni con un intervento umano minimo."
  },
  {
    question: "Qual è la funzione di un 'sistema di gestione della conformità' (Compliance Management System)?",
    options: ["Gestire solo la conformità fiscale", "Un sistema che aiuta le organizzazioni a rispettare leggi, regolamenti, standard e politiche interne ed esterne", "Creare report finanziari", "Pianificare le strategie di marketing"],
    correct: 1,
    explanation: "Un CMS (Compliance Management System) è un sistema o un insieme di processi che aiutano un'organizzazione a identificare, monitorare e gestire i rischi di non conformità con leggi, regolamenti, standard e politiche interne ed esterne."
  },
  {
    question: "Cosa si intende per 'agile methodology' (metodologia agile) nello sviluppo software?",
    options: ["Un approccio di sviluppo software lineare e sequenziale", "Un insieme di pratiche che promuovono lo sviluppo iterativo, la collaborazione e la flessibilità", "Un metodo per scrivere codice in modo più veloce", "Un sistema per la gestione dei bug"],
    correct: 1,
    explanation: "La metodologia agile è un approccio iterativo e incrementale allo sviluppo software e alla gestione dei progetti, che si concentra sulla consegna rapida di valore, sulla collaborazione tra team e clienti, e sulla capacità di rispondere al cambiamento."
  },
  {
    question: "Qual è la funzione di un 'sistema di gestione della continuità operativa' (BCMS)?",
    options: ["Prevenire gli incidenti sul lavoro", "Un sistema che aiuta un'organizzazione a prepararsi e a riprendersi da interruzioni significative", "Gestire le relazioni con i clienti", "Pianificare le attività di marketing"],
    correct: 1,
    explanation: "Un BCMS (Business Continuity Management System) è un sistema di gestione che aiuta un'organizzazione a prepararsi e a rispondere a interruzioni, per garantire che le funzioni aziendali critiche possano continuare a operare o essere ripristinate rapidamente."
  },
  {
    question: "Cosa si intende per 'smart contract'?",
    options: ["Un contratto scritto a mano", "Un contratto digitale auto-eseguibile, le cui clausole sono scritte in codice su una blockchain", "Un contratto verbale", "Un contratto che non ha valore legale"],
    correct: 1,
    explanation: "Uno smart contract è un contratto digitale le cui clausole sono scritte in codice e memorizzate su una blockchain. Si auto-esegue quando le condizioni predefinite sono soddisfatte, senza la necessità di intermediari."
  },
  {
    question: "Qual è la funzione di un 'sistema di gestione delle relazioni con i partner' (PRM)?",
    options: ["Gestire le relazioni con i clienti", "Automatizzare e ottimizzare le interazioni con i partner di canale, come rivenditori e distributori", "Creare nuovi prodotti", "Pianificare la produzione interna"],
    correct: 1,
    explanation: "Un PRM (Partner Relationship Management) è un sistema che aiuta le aziende a gestire e ottimizzare le relazioni con i loro partner di canale (es. rivenditori, distributori), fornendo strumenti per la collaborazione, la formazione e la gestione delle vendite congiunte."
  },
  {
    question: "Cosa si intende per 'data privacy'?",
    options: ["La condivisione di tutti i dati personali", "La protezione dei dati personali e la garanzia che siano raccolti, utilizzati e conservati in conformità con le leggi e le normative", "La pubblicazione di dati sensibili", "La vendita di dati a terzi"],
    correct: 1,
    explanation: "La data privacy (privacy dei dati) si riferisce alla protezione delle informazioni personali e alla garanzia che siano raccolte, utilizzate, divulgate e conservate in conformità con le leggi e le normative applicabili, come il GDPR."
  },
  {
    question: "Qual è la funzione di un 'sistema di gestione dei rischi' (Risk Management System)?",
    options: ["Eliminare tutti i rischi aziendali", "Identificare, valutare, monitorare e mitigare i rischi che potrebbero influenzare gli obiettivi di un'organizzazione", "Gestire le relazioni con i clienti", "Pianificare le strategie di marketing"],
    correct: 1,
    explanation: "Un sistema di gestione dei rischi è un insieme di processi e strumenti per identificare, valutare, monitorare e mitigare i rischi che potrebbero influenzare il raggiungimento degli obiettivi di un'organizzazione."
  },
  {
    question: "Cosa si intende per 'API RESTful'?",
    options: ["Un tipo di database", "Un'architettura per la progettazione di API web che utilizza il protocollo HTTP", "Un linguaggio di programmazione", "Un sistema operativo"],
    correct: 1,
    explanation: "RESTful API è un'architettura per la progettazione di interfacce di programmazione delle applicazioni (API) web che si basa sui principi del protocollo HTTP, rendendo le API più semplici, scalabili e facili da usare."
  },
];

function App() {
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState(null);
  const [showFeedback, setShowFeedback] = useState(false);
  const [score, setScore] = useState(0);
  const [quizCompleted, setQuizCompleted] = useState(false);

  const currentQuestion = questions[currentQuestionIndex];

  // Gestisce la selezione di una risposta
  const handleAnswerSelect = (index) => {
    if (!showFeedback) { // Permette di selezionare solo se il feedback non è ancora mostrato
      setSelectedAnswer(index);
    }
  };

  // Verifica la risposta selezionata
  const handleCheckAnswer = () => {
    if (selectedAnswer !== null) {
      setShowFeedback(true);
      if (selectedAnswer === currentQuestion.correct) {
        setScore(score + 1);
      }
    } else {
      // Mostra un messaggio all'utente se non ha selezionato nulla
      alert("Seleziona una risposta prima di verificare!");
    }
  };

  // Passa alla prossima domanda o completa il quiz
  const handleNextQuestion = () => {
    setSelectedAnswer(null);
    setShowFeedback(false);
    if (currentQuestionIndex < questions.length - 1) {
      setCurrentQuestionIndex(currentQuestionIndex + 1);
    } else {
      setQuizCompleted(true);
    }
  };

  // Resetta il quiz per ricominciare
  const handleRestartQuiz = () => {
    setCurrentQuestionIndex(0);
    setSelectedAnswer(null);
    setShowFeedback(false);
    setScore(0);
    setQuizCompleted(false);
  };

  // Stili per le opzioni di risposta
  const getOptionClasses = (index) => {
    let classes = "w-full p-3 mb-2 text-left rounded-lg transition-colors duration-200 ";
    if (showFeedback) {
      if (index === currentQuestion.correct) {
        classes += "bg-green-500 text-white font-bold"; // Risposta corretta
      } else if (index === selectedAnswer) {
        classes += "bg-red-500 text-white font-bold"; // Risposta sbagliata selezionata
      } else {
        classes += "bg-gray-200 text-gray-700 cursor-not-allowed"; // Altre risposte
      }
    } else {
      classes += "bg-blue-100 hover:bg-blue-200 text-blue-800 cursor-pointer";
      if (index === selectedAnswer) {
        classes += " ring-2 ring-blue-500"; // Evidenzia la selezione
      }
    }
    return classes;
  };

  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center p-4 font-sans">
      <div className="bg-white p-8 rounded-xl shadow-lg w-full max-w-2xl">
        <h1 className="text-3xl font-bold text-center text-gray-800 mb-6">Quiz Addetto Riscossione</h1>

        {quizCompleted ? (
          // Schermata finale del quiz
          <div className="text-center">
            <h2 className="text-2xl font-semibold text-gray-700 mb-4">Quiz Completato!</h2>
            <p className="text-xl text-gray-600 mb-6">
              Il tuo punteggio finale è: <span className="font-bold text-blue-600">{score}</span> su <span className="font-bold text-blue-600">{questions.length}</span>
            </p>
            <button
              onClick={handleRestartQuiz}
              className="px-6 py-3 bg-blue-600 text-white font-semibold rounded-lg shadow-md hover:bg-blue-700 transition-colors duration-200"
            >
              Ricomincia Quiz
            </button>
          </div>
        ) : (
          // Schermata del quiz in corso
          <div>
            <p className="text-sm text-gray-500 mb-2">
              Domanda {currentQuestionIndex + 1} di {questions.length}
            </p>
            <h2 className="text-xl font-semibold text-gray-800 mb-6">
              {currentQuestion.question}
            </h2>

            <div className="space-y-3 mb-6">
              {currentQuestion.options.map((option, index) => (
                <button
                  key={index}
                  onClick={() => handleAnswerSelect(index)}
                  className={getOptionClasses(index)}
                  disabled={showFeedback} // Disabilita i pulsanti dopo la verifica
                >
                  {String.fromCharCode(65 + index)}. {option}
                </button>
              ))}
            </div>

            {!showFeedback && (
              <button
                onClick={handleCheckAnswer}
                className="w-full px-6 py-3 bg-green-600 text-white font-semibold rounded-lg shadow-md hover:bg-green-700 transition-colors duration-200"
                disabled={selectedAnswer === null} // Disabilita se nessuna risposta è selezionata
              >
                Verifica Risposta
              </button>
            )}

            {showFeedback && (
              <div className="mt-6 p-4 rounded-lg bg-gray-50 border border-gray-200">
                <h3 className={`text-lg font-bold ${selectedAnswer === currentQuestion.correct ? 'text-green-700' : 'text-red-700'} mb-2`}>
                  {selectedAnswer === currentQuestion.correct ? "Corretto!" : "Sbagliato!"}
                </h3>
                <p className="text-gray-700 mb-4">
                  <span className="font-semibold">Spiegazione:</span> {currentQuestion.explanation}
                </p>
                <button
                  onClick={handleNextQuestion}
                  className="w-full px-6 py-3 bg-blue-600 text-white font-semibold rounded-lg shadow-md hover:bg-blue-700 transition-colors duration-200"
                >
                  {currentQuestionIndex < questions.length - 1 ? "Prossima Domanda" : "Termina Quiz"}
                </button>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
}

export default App;
