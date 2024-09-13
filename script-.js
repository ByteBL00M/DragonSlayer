const personaggio = {
    livello: 1,
    xp: 0,
    salute: 100,
    maxVita: 100,
    difesa: 5,
    attacco: 8,
    oro: 75,
    precisione: 0,
    inventario: [pozioni[1]],
    equipaggiamento: {
        arma: null,
        elmo: null,
        pettorale: null,
        gambali: null,
        amuleto: null
    },
    flag: {
        sentieroArma: false,
        osteArma: false
    }
};


// Stati del gioco
const stati = [
    {
        nome: "citta",
        text: "Devi sconfiggere il drago che impedisce alle persone di lasciare il paese. In questo momento " +
            "ti trovi nella piazza principale, il tuo interesse viene catturato dall'ingresso della taverna locale, " +
            " dalla bottega e da un sentiero che si allontana dal paese",
        bottoni: ["Entra nella bottega", "Entra nella taverna", "Incamminati sul sentiero"],
        funzioni: [goNegozio, goTaverna, goSentiero]
    },
    {
        nome: "bottega",
        text: "La bottega appare minuscola, ma forse è solo un'illusione dovuta alla presenza di oggetti di ogni tipo ammassati sugli scaffali " +
            "e a ogni angolo disponibile. \nTra gli oggetti in vendita, per lo più ciarpame, è stato lasciato un piccolo corridoio libero per " +
            "poter raggiungere il bancone. Dietro di esso c'è una donna dalla pelle incartapecorita, china su se stessa: la sua età è indefinibile, " +
            "ma ha lo sguardo buono.",
        bottoni: ["Torna in città", "Chiacchiera"],
        funzioni: [goCitta, chiacchieraBottega]
    },
    {
        nome: "chiacchiera",
        text: "La signora è di buon cuore come appare, ma oltre a raccontarti la storia della sua (lunga lunga lunga) vita, non sembra avere informazioni " +
            "rilevanti da condividere.",
        bottoni: ["Continua a guardare nella bottega", "Torna in città"],
        funzioni: [goNegozio, goCitta]
    },
    {
        nome: "taverna",
        text: "Entri in quella che sembra la tipica taverna di un tipico villaggio di quella regione: accogliente e calda. C'è un solo problema: è fin " +
            "pulita e oltre all'oste non sembra esserci nessuno, eppure l'orario non è insolito per frequentare un posto del genere.",
        bottoni: ["Rivolgiti all'oste", "Torna in città"],
        funzioni: [goOste, goCitta]
    },
    {
        nome: "oste",
        text: "L'oste è un anziano dalla barba importante, dall'aspetto burbero e dall'aria preoccupata. Ti accoglie con un cenno del capo e con un gesto " +
            "ti invita a sederti allo sgabello di fronte a lui, al bancone.\n 'Gli affari qui vanno sempre peggio, da quando quel drago ha deciso di stabilirsi " +
            "sulla montagna. La gente del villaggio è troppo in pena per concedersi una bevuta e il denaro e le risorse iniziano a scarseggiare: quel mostro " +
            "si nutre del nostro bestiame e dà fuoco ai nostri raccolti. Sei il primo viandante che si vede da queste parti dopo molto tempo, perchè l'unica " +
            " strada per arrivare qui passa dalla montagna. Non so per quanto tempo riusciremo a resistere'",
        bottoni: ["Chiacchiera", "Gioca", "Torna in città"],
        funzioni: [chiacchieraOste, giocoOste, goCitta]
    },
    {
        nome: "tiraDadi",
        text: "L'oste tira fuori due coppie di dadi e te ne porge una. 'Ho qui alcuni dadi, giochiamo per passare il tempo? Il gioco è semplice: punti " +
            "cinque monete, poi entrambi lanciamo i dadi, se fai il mio stesso punteggio ti restituisco la puntata ne vinci sessanta. Ti va?'",
        bottoni: ["Tira i dadi", "Declina l'invito", "Torna in città"],
        funzioni: [lanciaDadi, goOste, goCitta]
    },
    {
        nome: "sentiero",
        text: "Ti lasci il villaggio alle spalle e ti incammini lungo il sentiero fin quando non raggiungi un trivio. Dove decidi di andare?",
        bottoni: ["Vai verso la caverna", "Vai verso il bosco", "Prosegui verso la montagna", "Torna al villaggio"],
        funzioni: [goCaverna, goBosco, goMontagna, goCitta]
    },
    {
        nome: "caverna",
        text: "La caverna, esattamente come ci si aspetterebbe, è oscura e umida, ma fortunatamente all'ingresso era presente un braciere dove poter accendere " +
            "una delle torce spente lasciate previdentemente in un cesto da chissà chi. Più ti inoltri, più hai la pessima sensazione che qualcuno, " +
            "o forse qualcosa, ti stia osservando...",
        bottoni: ["Continua a inoltrarti nella caverna", "Torna al sentiero"],
        funzioni: [restaCaverna, goSentiero]
    },
    {
        nome: "bosco",
        text: "",
        bottoni: ["Continua a inoltrarti nel bosco", "Torna al sentiero"],
        funzioni: [restaBosco, goSentiero]
    },
    {
        nome: "montagna",
        text: "",
        bottoni: ["Continua a risalire la montagna", "Torna al sentiero"],
        funzioni: [goDrago, goSentiero]
    }
];
let statoCorrente = stati[0]; // Stato iniziale

let mostroCorrente = {
    nome: null,
    livello: null,
    salute: null,
    vita: null,
    attacco: null,
    difesa: null
}

/********************************************************
 ********************************************************
 *
 *              INIZIALIZZAZIONE PAGINA
 * 
 ******************************************************** 
 ********************************************************/

const bottoneElements = [];
for (let i = 0; i < 4; i++) {
    bottoneElements[i] = document.querySelector(`#bottone${i}`);
}

const bottoni = bottoneElements;

const elementiStat = {
    livello: document.querySelector("#livello"),
    xp: document.querySelector("#xp"),
    salute: document.querySelector("#curSalute"),
    maxVita: document.querySelector("#maxVita"),
    difesa: document.querySelector("#def"),
    attacco: document.querySelector("#attacco"),
    oro: document.querySelector("#oro"),
    precisione: document.querySelector("#precisione")
};

const statisticheMostro = document.querySelector("#statisticheMostro");
const livelloMostro = document.querySelector("#livelloMostro");
const saluteMostro = document.querySelector("#saluteMostro");
const vitaMostro = document.querySelector("#vitaMostro");
const testo = document.querySelector("#testo");
const negozio = document.querySelector("#negozio");
const equip = document.querySelector("#equipContainer");
const borsa = document.querySelector("#borsaContainer");
const msg = document.querySelector("#msg");
const immagine = document.querySelector("#img");

// Nascondi elementi all'inizio
statisticheMostro.style.display = "none";
negozioContainer.style.display = "none";

aggiornaStatistichePersonaggio();
aggiornaBottoni();
aggiornaBorse();
aggiornaStato(stati[0]);
riempiNegozio();



/********************************************************
 ********************************************************
 *
 *                  GESTIONE STATI
 * 
 ******************************************************** 
 ********************************************************/

function aggiornaStato(stato) {
    mostraDivMostro(false);
    statoCorrente = stati.find(tmp => tmp.nome === stato.nome);
    testo.innerText = stato.text;

    const index = stati.findIndex(elemento => elemento.nome === stato.nome);
    immagine.src = `./res/img/${index}.webp`;

    aggiornaBottoni();
}

function goCitta() {
    aggiornaStato(stati[0]);
    mostraDivBottega(false);
    mostraDivMostro(false);
    riempiInventario();
}

function goNegozio() {
    aggiornaStato(stati[1]);
    mostraDivBottega(true);
    riempiInventario();
}

function chiacchieraBottega() {
    aggiornaStato(stati[2]);
    mostraDivBottega(false);
    riempiInventario();
}

function goTaverna() {
    aggiornaStato(stati[3]);
}

function goOste() {
    aggiornaStato(stati[4]);
}

function chiacchieraOste() {
    let str = "'Fai attenzione ad avventurarti fuori di qua. Il sentiero che conduce verso l'esterno del villaggio si divide in tre: " +
        "puoi deviare verso la caverna, verso il bosco o andare diretto alla montagna. La caverna è infestata da ragni giganti e dagli " +
        "scheletri non morti dei poveri avventurieri incauti che ci hanno lasciato le penne. Il bosco è abitato da strani cinghiali " +
        "particolarmente grossi e aggressivi e dai banditi, ma il pericolo più grande sono i grifoni.'"
    const strArma = "L'oste fa una breve pausa in grave silenzio, poi solleva le sopracciglia e si affretta ad afferrare qualcosa " +
        "da sotto il bancone. Ti porge un pugnale 'Sono sicuro che questo sarà più utile a te che a me, prendilo pure'."

    //se non hai già chiacchierato con l'oste
    if (!document.getElementById("messaggio")) {
        const div = document.createElement("div");
        div.setAttribute("id", "messaggio");
        div.textContent = str;
        testo.appendChild(div);

        //se l'oste non ti ha mai dato l'arma
        if (!personaggio.flag.osteArma) {
            personaggio.flag.osteArma = true;
            personaggio.inventario.push(tuttiGliOggetti.find(oggetto => oggetto.nome === "pugnale dell'Oste"));
            riempiInventario();
            div.appendChild(document.createElement("br"));
            div.appendChild(document.createElement("br"));
            const span = document.createElement("span");
            span.textContent = strArma;
            div.appendChild(span);
        }
    }

}

function giocoOste() {
    aggiornaStato(stati[5]);
}

function lanciaDadi() {

    console.log("click tiradadi")
    let div;
    //se non hai già giocato, crea il div
    if (!document.getElementById("messaggio")) {
        div = document.createElement("div");
        div.setAttribute("id", "messaggio");
        testo.appendChild(div);
    }
    //altrimenti svuota il contenuto
    else {
        div = document.getElementById("messaggio");
        div.innerHTML = "";
    }

    //se il personaggio non ha abbastanza monete
    if (personaggio.oro < 5) {
        div.innerText = "Sembra che tu non abbia abbastanza monete per giocare. Facciamo un'altra volta, eh?"
    } else {
        //se il personaggio può giocare
        const puntiOste = getRandom(2, 12);
        const puntiPg = getRandom(2, 12);
        const tiroOste = "L'oste tira i dadi e totalizza " + puntiOste + " punti.";
        const tiroPg = "Tu tiri i dadi e totalizzi " + puntiPg + " punti";
        let spanOste = document.createElement("span");
        spanOste.textContent = tiroOste;
        div.appendChild(spanOste);
        div.appendChild(document.createElement("br"));
        div.appendChild(document.createElement("br"));
        let spanPg = document.createElement("span");;
        spanPg.textContent = tiroPg;
        div.appendChild(spanPg);
        div.appendChild(document.createElement("br"));
        div.appendChild(document.createElement("br"));
        let spanRisultati = document.createElement("span");
        if (puntiPg === puntiOste) {
            personaggio.oro += 60;
            spanRisultati.textContent = "L'oste scuote la testa e sbuffa mentre ti consegna la vincita. 'Sembra proprio che tu abbia vinto, questa volta'";
        }
        else {
            personaggio.oro -= 5;
            spanRisultati.textContent = "L'oste si stringe nelle spalle incassando le monete. 'Ti andrà meglio la prossima volta... forse.'";
        }
        aggiornaStatistichePersonaggio();
        div.appendChild(spanRisultati);
    }
}

function goSentiero() {
    aggiornaStato(stati[6]);
    //se non hai avuto l'arma dall'oste e non hai trovato prima il bastone
    if (!personaggio.flag.osteArma && !personaggio.flag.sentieroArma) {
        const div = document.createElement("div");
        div.setAttribute("id", "messaggio");
        div.textContent = "Prima di recarti da incamminarti, rifletti che è molto meglio avere un'arma qualsiasi piuttosto che avventurarti " +
            "verso posti sconosciuti a mani nude. Cercando in giro trovi un bastone e decidi che, per il momento, può andare";
        testo.appendChild(div);
        personaggio.inventario.push(tuttiGliOggetti.find(oggetto => oggetto.nome === "bastone"));
        riempiInventario();
        personaggio.flag.sentieroArma = true;
    }
}


function goCaverna() {
    aggiornaStato(stati[7]);
}

function restaCaverna() {
    const random = getRandom(0, 20);
    if (random < 8) {
        aggiornaMostro("gelatina");
    } else if (random < 14) {
        aggiornaMostro("ragno");
    } else if (random < 20) {
        aggiornaMostro("scheletro");
    } else {
        console.log("evento fortunato");
    }
}

function goBosco() {
    aggiornaStato(stati[8]);
}

function restaBosco() {
    const random = getRandom(0, 20);
    if (random < 8) {
        aggiornaMostro("cinghiale");
    } else if (random < 14) {
        aggiornaMostro("bandito");
    } else if (random < 20) {
        aggiornaMostro("grifone");
    } else {
        console.log("evento fortunato");
    }
}

function goMontagna() {
    aggiornaStato(stati[9]);
}

function goDrago() {

}

function nuovaPartita(){
    personaggio = {
        livello: 1,
        xp: 0,
        salute: 100,
        maxVita: 100,
        difesa: 5,
        attacco: 8,
        oro: 75,
        precisione: 0,
        inventario: [pozioni[1]],
        equipaggiamento: {
            arma: null,
            elmo: null,
            pettorale: null,
            gambali: null,
            amuleto: null
        },
        flag: {
            sentieroArma: false,
            osteArma: false
        }
    };
    aggiornaStato(stati[0]);
}



/********************************************************
 ********************************************************
 *
 *                  GESTIONE COMBATTIMENTO
 * 
 ******************************************************** 
 *******************************************************/


function aggiornaMostro(mostroNome) {

    const mostro = mostri.find(tmp => tmp.nome === mostroNome);

    testo.innerText = "Improvvisamente ti imbatti in " + mostro.descrizione;
    immagine.src = `./res/img/${mostroNome}.webp`;

    mostroCorrente.nome = mostro.nome;
    mostroCorrente.livello = mostro.livello;
    mostroCorrente.salute = mostroCorrente.vita = mostro.salute;
    mostroCorrente.difesa = mostro.difesa;
    mostroCorrente.attacco = mostro.attacco;
    mostroCorrente.precisione = mostro.precisione;
    livelloMostro.innerText = mostroCorrente.livello;
    saluteMostro.innerText = mostroCorrente.salute;
    vitaMostro.innerText = mostroCorrente.vita;

    mostraDivMostro(true);

    //creo il div in cui mostrare il progresso del combattimento
    const msg = document.createElement("div");
    msg.setAttribute("id", "messaggio");
    testo.appendChild(msg);

    if (personaggio.equipaggiamento.arma == null) {
        // se il personaggio non ha armi equipaggiate non può attaccare
        msg.textContent = "Non hai nessun'arma con cui combattere, meglio fuggire!";
        bottoneElements[0].style.display = 'none'
    } else {
        bottoneElements[0].onclick = () => attacca();
        bottoneElements[0].innerText = "Attacca";
    }

    bottoneElements[1].onclick = () => aggiornaStato(statoCorrente);
    bottoneElements[1].innerText = "Fuggi";
}

function attacca() {
    console.log(" ATTACCO ");
    let msg = document.createElement("p");
    // Calcolo hit
    const hit = getRandom(1, 100);
    
    if (personaggio.equipaggiamento.arma.precisione >= hit) {
        // Se colpisci
        console.log(personaggio.attacco);
        const dannoInflitto = calcolaDanni(personaggio, mostroCorrente);
        
        if (dannoInflitto <= 0) {
            // Se non c'è danno (il mostro è più forte)
            msg.classList.add("neutrale");
            msg.innerText = "Hai colpito il bersaglio, ma non sembra essersi fatto nulla...";
        } else {
            // Se il personaggio infligge danno
            msg.classList.add("positivo");
            msg.innerText = "Colpisci il bersaglio e gli infliggi " + dannoInflitto + " danni. ";
            mostroCorrente.salute -= dannoInflitto;
            
            if (mostroCorrente.salute <= 0) {
                // Se il mostro muore
                msg.innerText += "Il Nemico è morto!";
                calcolaRicompensa();
                saluteMostro.textContent = "0";
                // Aggiornamento pulsanti
                bottoneElements[0].onclick = () => aggiornaStato(stati[7]);
                bottoneElements[0].innerText = "Prosegui";
                bottoneElements[1].style.display = 'none';
                document.getElementById("messaggio").appendChild(msg);
                // Se il mostro è morto non c'è bisogno di proseguire
                return;
            } else {
                // Se il mostro non muore
                saluteMostro.textContent = mostroCorrente.salute;
                
            }
        }
    } else {
        // Se manca il colpo
        msg.classList.add("neutrale");
        msg.innerText = "Che sfortuna, hai mancato il bersaglio!";
    }

    
    // Aggiunta del messaggio solo dopo che tutte le condizioni sono state valutate
    document.getElementById("messaggio").appendChild(msg);
    difendi();
}

function difendi() {
    console.log(" DIFESA ");
    let msg = document.createElement("p");
    // Calcolo hit
    const hit = getRandom(1, 100);
    if (mostroCorrente.precisione >= hit) {
        // Se colpisce
        console.log(mostroCorrente.attacco);
        const dannoInflitto = calcolaDanni(mostroCorrente, personaggio);
        
        if (dannoInflitto <= 0) {
            // Se non c'è danno (il personaggio è più forte)
            msg.classList.add("neutrale");
            msg.innerText = "Il nemico ti colpisce, ma ti fa appena il solletico!";
        } else {
            // Se il nemico
            msg.classList.add("negativo");
            msg.innerText = "Il tuo nemico ti colpisce e ti infligge " + dannoInflitto + " danni. ";
            personaggio.salute -= dannoInflitto;
            elementiStat.salute.textContent = personaggio.salute;
            
            if (personaggio.salute <= 0) {
                // Se personaggio muore
                msg.innerText += "Sei morto!";
                personaggio.salute.textContent = "0";
                
                // Aggiornamento pulsanti
                bottoneElements[0].onclick = () => nuovaPartita();
                bottoneElements[0].innerText = "Ricomincia da capo";
                bottoneElements[1].style.display = 'none';
                document.getElementById("messaggio").appendChild(msg);
                // Se il personaggio muore non c'è bisogno di proseguire
                return;
            } else {
                // Se il personaggio non muore
                personaggio.salute.textContent = personaggio.salute;
            }
        }
    } else {
        // Se manca il colpo
        msg.classList.add("neutrale");
        msg.innerText = "Che fortuna, "+ mostroCorrente.nome +" ti ha mancato!";
    }

    // Aggiunta del messaggio solo dopo che tutte le condizioni sono state valutate
    document.getElementById("messaggio").appendChild(msg);
}

function calcolaDanni(attaccante, difensore) {

    //Danno inflitto = {attaccoPersonaggio * [log(lvl_p/lvl_m) +1] - difesaMostro * 0.3 * [log(lvl_e/lvl_p) +1]} (random±10%)
    const modificatoreLivelloP = Math.log(attaccante.livello / difensore.livello);
    console.log("attaccante.livello/difensore.livello = " + attaccante.livello + " " + difensore.livello);

    const modificatoreLivelloM = Math.log(difensore.livello / attaccante.livello);
    let dannoBase = Math.floor(attaccante.attacco * (modificatoreLivelloP + 1) - difensore.difesa * 0.3 * (modificatoreLivelloM + 1));
    console.log("attacco attaccante " + attaccante.attacco + " difesa difensore " + difensore.difesa);

    let dannoFinale = Math.round(dannoBase + (dannoBase * calcolaModificatoreCasuale()));
    console.log("Danno finale: " + dannoFinale);

    const differenzaLivello = difensore.livello - attaccante.livello;
    let dannoMinimo = attaccante.attacco * 0.1 * Math.max(0, 1 - differenzaLivello / 3);

    console.log("danno minimo = " + dannoMinimo)
    // Applica il danno minimo solo se il danno calcolato è inferiore al danno minimo
    if (dannoFinale < dannoMinimo) {
        dannoFinale = Math.round(dannoMinimo);
    }
    return dannoFinale;
}

function calcolaRicompensa() {
    mostroVita = mostroCorrente.vita;
    mostroAttacco = mostroCorrente.attacco;
    mostroDifesa = mostroCorrente.difesa;
    mostroLivello = mostroCorrente.livello;
    lvlDiff = personaggio.livello - mostroLivello;

    // Esperienza vinta=[(salute del mostro+attacco del mostro+difesa del mostro​)/5]×(1+(livello del mostro​/2))×(1+differenza di livello​/10)+(random±10%)
    let newXp = ((mostroVita + mostroAttacco + mostroDifesa) / 5) * (mostroLivello / 2 + 1) * (lvlDiff / 10 + 1);
    newXp = Math.round(newXp + (newXp * calcolaModificatoreCasuale()));

    // Oro vinto=[(salute del mostro+attacco del mostro+difesa del mostro​)/10]×(1+livello del mostro/3​)×(1+differenza di livello​/10)+(random±10%)
    let newOro = ((mostroVita + mostroAttacco + mostroDifesa) / 10) * (mostroLivello / 3 + 1) * (lvlDiff / 10 + 1);
    newOro = Math.round(newOro + (newOro * calcolaModificatoreCasuale()));

    personaggio.oro += newOro;
    personaggio.xp += newXp;
    aggiornaStatistichePersonaggio();

    let msg = document.createElement("p");
    msg.classList.add("positivo");
    msg.innerText = "Hai ottenuto " + newXp + " esperienza e " + newOro + " monete d'oro.";
    testo.appendChild(msg);

    //Exp per livello successivo=50×(livello attuale^1.5)
    if (personaggio.xp >= 50 * (Math.pow(personaggio.livello, 1.5))) {
        nuovoLivello();
    }
}

function nuovoLivello() {
    personaggio.attacco += 2;
    personaggio.maxVita+= (10* personaggio.livello);
    personaggio.salute= personaggio.maxVita;

    //aumenta di 1 se l'attuale livello è dispari, di 2 altrimenti
    const incremento = (personaggio.livello % 2 !== 0) ? 1 : 2;
    personaggio.precisione += incremento;
    personaggio.difesa += incremento;
    
    personaggio.xp=0;
    personaggio.livello++;
    aggiornaStatistichePersonaggio();

    let p= document.createElement("p");
    p.classList.add("positivo");
    p.textContent = "Complimenti, hai raggiunto il livello "+ personaggio.livello +"! Attacco +2 | Salute massima +" +(10* personaggio.livello) + 
        " | Difesa +"+incremento+" | Precisione +" +incremento;
    
    document.getElementById("messaggio").appendChild(p);
    
}

/********************************************************
 ********************************************************
 *
 *                  AZIONI OGGETTI
 * 
 ******************************************************** 
 *******************************************************/

function usa(itemNome) {
    // Trova l'oggetto completo basato sul nome
    const item = tuttiGliOggetti.find(oggetto => oggetto.nome === itemNome);

    // Verifica se l'oggetto esiste
    if (item && item.tipo == 'pozione') {
        const salutePozione = item.salute;
        if (salutePozione + personaggio.salute > personaggio.maxVita) {
            personaggio.salute = personaggio.maxVita;
        }
        else {
            personaggio.salute += salutePozione
        }
        aggiornaStatistichePersonaggio();
        rimuoviItem(personaggio.inventario, item);
        riempiInventario();
    } else {
        console.log("Funzione Usa - Oggetto non trovato: " + itemNome);
    }
}

function equipaggia(itemNome) {
    // Trova l'oggetto completo basato sul nome
    const item = tuttiGliOggetti.find(oggetto => oggetto.nome === itemNome);
    const tipoEquip = item.tipo;

    // Verifica se l'oggetto esiste
    if (item) {
        const equipaggiamentoPersonaggio = personaggio.equipaggiamento[tipoEquip]; // Equipaggiamento attuale del personaggio per quel tipo
        let tmp;
        if (equipaggiamentoPersonaggio) {
            // Se c'è già un oggetto equipaggiato, fai lo swap con la borsa e salva l'oggetto di prima temporaneamente
            tmp = personaggio.equipaggiamento[tipoEquip];
            swapEquipBorsa(item);
        } else {
            // Altrimenti equipaggia direttamente
            personaggio.equipaggiamento[tipoEquip] = item;
            rimuoviItem(personaggio.inventario, item);
        }

        //aggiorna le variabili globali delle statistiche
        switch (tipoEquip) {
            case "arma":
                if (tmp) {
                    personaggio.attacco = personaggio.attacco - tmp.attacco + item.attacco;
                    personaggio.precisione = personaggio.precisione - tmp.precisione + item.precisione;
                }
                else
                    personaggio.attacco += item.attacco;
                personaggio.precisione += item.precisione;
                break;
            case "amuleto":
                if (tmp)
                    personaggio.maxVita = personaggio.maxVita - tmp.vita + item.vita;
                else
                    personaggio.maxVita += item.vita;
                break;
            default: //se è elmo, pettorale o gambali
                if (tmp)
                    personaggio.difesa = personaggio.difesa - tmp.difesa + item.difesa;
                else
                    personaggio.difesa += item.difesa;
        }
        aggiornaBorse();
        aggiornaStatistichePersonaggio();
    } else {
        console.log("Funzione equipaggia - Oggetto non trovato: " + itemNome);
    }
}

function compra(itemNome) {
    console.log("click compra " + itemNome);

    let warning, ok;

    //se esiste un precedente messaggio di warning o di ok, nascondili
    if (document.querySelector(".warning")) {
        warning = document.querySelector(".warning");
        warning.style.display = 'none';
    }

    if (document.querySelector(".ok")) {
        ok = document.querySelector(".ok");
        ok.style.display = 'none';
    }

    // Trova l'oggetto completo basato sul nome
    const item = tuttiGliOggetti.find(oggetto => oggetto.nome === itemNome);

    const prezzo = item.prezzoAcquisto;

    let stringOK = "La venditrice ti consegna ciò che hai chiesto, mette via il denaro ricevuto e ti sorride: 'Posso esserti ancora utile?'";
    let stringWarning = "La venditrice ti guarda con aria desolata, inarca debolmente l'interno delle sopracciglia verso l'alto e scuote la testa: " +
        "'Mi dispiace, ma sembra che tu non possa permetterti quest'oggetto.'"

    if (prezzo <= personaggio.oro) {
        // Aggiunge l'oggetto all'inventario e aggiorna i dati del personaggio
        personaggio.inventario.push(item);
        personaggio.oro -= prezzo;
        riempiInventario();
        aggiornaStatistichePersonaggio();


        //se esiste un precedente messaggio di ok, mostralo di nuovo e aggiorna il testo
        if (ok) {
            console.log("ok esiste");
            ok.textContent = stringOK;
            ok.style.display = 'block';
        } else {
            // Crea il messaggio di errore
            const div = document.createElement("div");
            div.classList.add("ok");
            div.textContent = stringOK;
            testo.appendChild(div); // Aggiunge il messaggio al contenitore `testo`
        }
    } else {
        //se esiste un precedente messaggio di warning, mostralo di nuovo
        if (warning) {
            console.log("warning esiste");
            warning.style.display = 'block';
        } else {
            // Crea il messaggio di errore
            const div = document.createElement("div");
            div.classList.add("warning");
            div.textContent = stringWarning;
            testo.appendChild(div); // Aggiunge il messaggio al contenitore `testo`
        }
    }
}

function vendi(itemNome) {
    // Trova l'oggetto completo basato sul nome
    const item = tuttiGliOggetti.find(oggetto => oggetto.nome === itemNome);
    const prezzo = item.prezzoVendita;

    let ok;
    let stringOK = "La venditrice ti consegna il denaro e prende l'oggetto appena acquistato: 'Sono sicura che prima o poi riusciremo " +
        "a dargli una nuova vita'. Ti serve altro?";

    if (document.querySelector(".ok")) {
        ok = document.querySelector(".ok");
        ok.style.display = 'none';
    }

    //vendi l'Item e aggiorna statistiche e inventario
    personaggio.oro += prezzo;
    rimuoviItem(personaggio.inventario, item);
    aggiornaStatistichePersonaggio();
    riempiInventario();


    //se esiste un precedente messaggio di ok, mostralo di nuovo e aggiorna il testo
    if (ok) {
        ok.textContent = stringOK;
        ok.style.display = 'block';
    } else {
        // Crea il messaggio di errore
        const div = document.createElement("div");
        div.classList.add("ok");
        div.textContent = stringOK;
        testo.appendChild(div); // Aggiunge il messaggio al contenitore `testo`
    }


}

/********************************************************
 ********************************************************
 *
 *                  GESTIONE ELENCHI
 * 
 ******************************************************** 
 ********************************************************/


function showItemMini(item) {
    let descrizione = '';

    // Verifica del tipo di oggetto e creazione della descrizione corrispondente
    switch (item.tipo) {
        case 'arma':
            descrizione = '<strong>Equip</strong>: +' + item.attacco + ' attacco';
            break;
        case 'elmo':
            descrizione = '<strong>Equip</strong>: +' + item.difesa + ' difesa';
            break;
        case 'pettorale':
            descrizione = '<strong>Equip</strong>: +' + item.difesa + ' difesa';
            break;
        case 'gambali':
            descrizione = '<strong>Equip</strong>: +' + item.difesa + ' difesa';
            break;
        case 'amuleto':
            descrizione = '<strong>Equip</strong>: +' + item.vita + ' vita max';
            break;
        case 'pozione':
            descrizione = '<strong>Usa</strong>: +' + item.salute + ' salute';
            break;
        default:
            descrizione = 'Oggetto sconosciuto';
            break;
    }

    // Restituisce la stringa formattata con indentazione (4 spazi di tabulazione simulati con &nbsp;)
    return '<span class="nomeItem">' + item.nome + '</span><br/>' +
        '<span class="descrizioneItem">' + descrizione + '</span><br/>';
}

function riempiInventario() {

    // Messaggio quando l'inventario è vuoto
    if (personaggio.inventario.length === 0) {
        borsa.innerText = "Non hai nulla nella borsa, potresti passare in bottega a comprare qualcosa.";
        return;
    }

    // Puliamo il contenuto di `borsa` prima di riempirlo
    borsa.innerHTML = "";

    personaggio.inventario.forEach(item => {
        // Cerchiamo l'oggetto nell'inventario
        const oggetto = tuttiGliOggetti.find(o => o.nome === item.nome);

        if (oggetto) {
            // Creiamo un div che conterrà l'elemento visualizzato e il bottone
            const itemContainer = document.createElement("div");
            itemContainer.classList.add("itemMini");

            // Utilizziamo `showItemMini` per visualizzare l'oggetto
            itemContainer.innerHTML += showItemMini(oggetto);

            // Creiamo il bottone per "Usa" o "Equipaggia"
            const button = document.createElement("button");
            button.innerText = item.tipo === 'pozione' ? "Usa" : "Equipaggia";
            button.addEventListener('click', () => {
                if (item.tipo === 'pozione') {
                    usa(item.nome);
                } else {
                    equipaggia(item.nome);
                }
            });

            // Aggiungiamo il bottone al container dell'oggetto
            itemContainer.appendChild(button);

            // Verifica se siamo nello stato "bottega" o "chiacchiera"
            if (isStatoCorrente(stati[1])) {
                const sellButton = document.createElement("button");
                sellButton.textContent = `Vendi a ${oggetto.prezzoVendita}`;
                sellButton.addEventListener('click', () => vendi(item.nome));
                itemContainer.appendChild(sellButton);
            }

            // Appendiamo il contenitore dell'elemento a `borsa`
            borsa.appendChild(itemContainer);
        }
    });
}

function riempiEquipaggiamento() {
    let str = "";
    let hasEquip = false;

    // Mappa delle parti dell'equipaggiamento
    const partiEquipaggiamento = {
        arma: "armi",
        elmo: "elmi",
        pettorale: "pettorali",
        gambali: "gambali",
        amuleto: "amuleti"
    };

    // Iteriamo sulle chiavi della mappa per generare il contenuto
    for (let parte in partiEquipaggiamento) {
        const oggettoEquipaggiato = personaggio.equipaggiamento[parte];

        if (oggettoEquipaggiato) {
            // Aggiungiamo l'elemento equipaggiato utilizzando `showItemMini`
            str += showItemMini(oggettoEquipaggiato);
            hasEquip = true;
        } else {
            // Messaggio quando non è equipaggiata la parte
            str += `Non hai <strong>${partiEquipaggiamento[parte]}</strong> equipaggiati.<br/>`;
        }
    }

    equip.innerHTML = str;

    // Messaggio finale se nessuna parte è equipaggiata
    if (!hasEquip) {
        equip.innerHTML += "<br/><br/><i>Dovresti equipaggiare qualcosa dalla borsa, non penserai mica di andare in giro a combattere senza nulla?</i>";
    }
}

function riempiNegozio() {

    negozio.innerHTML = "";

    //sfoglio tutte le categorie di oggetti
    for (let category in categorieItem) {

        // creo il titolo della categoria
        let categoriaTitolo = document.createElement('h1');
        categoriaTitolo.innerText = category;
        negozio.appendChild(categoriaTitolo);

        //creo la sezione della categoria
        let categoriaDiv = document.createElement('section');
        categoriaDiv.classList.add("cat");
        negozio.appendChild(categoriaDiv);

        //itero gli oggetti della categoria e li mostro
        categorieItem[category].forEach(item => {
            //se l'Item è venduto dalla bottega
            if (item.bottega) {
                //creo il div dell'item
                let singleItem = document.createElement('div');
                singleItem.classList.add("negozioItem");

                //agiungo la descrizione dell'oggetto e creo il pulsante per acquistarlo
                singleItem.innerHTML += showItemMini(item);
                const center = document.createElement('div');
                center.classList.add("centra");
                const button = document.createElement('button');
                button.innerText = "Compra a " + item.prezzoAcquisto;
                button.addEventListener('click', () => compra(item.nome));
                center.appendChild(button);
                singleItem.appendChild(center);

                //aggiungo il div dell'oggetto alla sezione
                categoriaDiv.appendChild(singleItem);
            }
        });

    }

}

/********************************************************
 ********************************************************
 *
 *                  UTILITY
 * 
 ******************************************************** 
 ********************************************************/

function aggiornaBorse() {
    riempiEquipaggiamento();
    riempiInventario();
}

function aggiornaBottoni() {
    bottoni.forEach((bottone, index) => {
        if (statoCorrente.funzioni[index]) {
            bottone.onclick = statoCorrente.funzioni[index];
            bottone.style.display = "inline"; // Mostra il bottone
            bottone.innerHTML = statoCorrente.bottoni[index];
        } else {
            bottone.style.display = "none"; // Nascondi il bottone
        }
    });
}

function mostraDivBottega(showBottega) {
    if (showBottega)
        negozioContainer.style.display = "block";
    else
        negozioContainer.style.display = "none";
}

function mostraDivMostro(showMostroStat) {
    if (showMostroStat)
        statisticheMostro.style.display = "block";
    else
        statisticheMostro.style.display = "none";
}

function aggiornaStatistichePersonaggio() {
    //aggiorna i valori delle statistiche
    Object.keys(elementiStat).forEach(key => {
        if (elementiStat[key]) {  // Controlla se l'elemento esiste
            elementiStat[key].innerText = personaggio[key];
        } else {
            console.warn(`Funzione aggiornaStatistichePersonaggio - Elemento ${key} non trovato nel DOM`);
        }
    });
}

function rimuoviItem(vettore, item) {
    // Trova l'indice dell'oggetto da rimuovere
    const index = vettore.findIndex(elemento => elemento.nome === item.nome);

    // Se l'oggetto esiste (l'indice è diverso da -1), lo rimuoviamo
    if (index !== -1) {
        vettore.splice(index, 1); // Rimuove 1 elemento all'indice trovato
    } else {
        console.log("Funzione rimuoviItem - Oggetto non trovato: " + item.nome);
    }
}

function rimuoviItemEquipaggiamento(equipaggiamento, item) {
    // Itera sulle chiavi dell'oggetto equipaggiamento
    for (let parte in equipaggiamento) {
        // Controlla se l'oggetto equipaggiato corrisponde all'item da rimuovere
        if (equipaggiamento[parte] && equipaggiamento[parte].nome === item.nome) {
            equipaggiamento[parte] = null; // Rimuovi l'oggetto equipaggiato
            console.log("Oggetto rimosso dall'equipaggiamento: " + item.nome);
            return;
        }
    }
    console.log("Funzione rimuoviItemEquipaggiamento - Oggetto non trovato: " + item.nome);
}

function swapEquipBorsa(item) {
    const tipo = item.tipo;
    const index = personaggio.inventario.findIndex(elemento => elemento.nome === item.nome); //trova l'indice di item nell'inventario
    let tmp = personaggio.inventario[index];

    rimuoviItem(personaggio.inventario, item); //rimuove l'item dall'inventario
    personaggio.inventario.push(personaggio.equipaggiamento[tipo]);
    personaggio.equipaggiamento[tipo] = tmp;
}

function isStatoCorrente(stato) {
    return stato.nome === statoCorrente.nome;
}

function getRandom(min, max) {
    //restituisce un intero casuale tra 2 e 12
    return Math.floor(Math.random() * (Math.floor(max) - Math.ceil(min) + 1) + Math.ceil(min));
}

function calcolaModificatoreCasuale() {
    return (getRandom(0, 20) - 10) / 100;
}
