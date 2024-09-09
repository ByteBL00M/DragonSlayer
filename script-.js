const personaggio = {
    livello: 1,
    xp: 0,
    salute: 100 ,
    maxVita: 100,
    difesa: 0,
    forza: 0,
    oro: 50,
    inventario: [ pozioni[1] ],
    equipaggiamento: {
        arma: null,
        elmo: null,
        pettorale: null,
        gambali: null,
        amuleto: null
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
        funzioni: [goCitta, chiacchiera]
    },
    {
        nome: "chiacchiera",
        text: "La signora è di buon cuore come appare, ma oltre a raccontarti la storia della sua (lunga lunga lunga) vita, non sembra avere informazioni " +
            "rilevanti da condividere.",
        bottoni: ["Continua a guardare nella bottega", "Torna in città"],
        funzioni: [goNegozio, goCitta]
    }
];

let statoCorrente = stati[0]; // Stato iniziale
let itemName;

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
    forza: document.querySelector("#forza"),
    oro: document.querySelector("#oro"),
};

const statisticheMostro = document.querySelector("#statisticheMostro");
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
    statoCorrente = stati.find(tmp => tmp.nome === stato.nome);
    console.log(statoCorrente.nome);
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
    mostraDivMostro(false);
    riempiInventario();
}

function chiacchiera() {
    aggiornaStato(stati[2]);
    mostraDivBottega(false);
    mostraDivMostro(false);
    riempiInventario();
}

function goCaverna() {
    console.log("click caverna")
}

function goBosco() {
    console.log("click bosco")
}

function goDrago() {
    console.log("click drago")
}

function goSentiero() {
    console.log("click sentiero")
}

function goTaverna() {
    console.log("click taverna")
}



/********************************************************
 ********************************************************
 *
 *                  AZIONI OGGETTI
 * 
 ******************************************************** 
 ********************************************************/
/* */

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
                if (tmp){
                    personaggio.forza = personaggio.forza - tmp.forza + item.forza;
                }
                else
                    personaggio.forza += item.forza;
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
    if(document.querySelector(".warning")){
        warning= document.querySelector(".warning");
        warning.style.display= 'none';
    }

    if(document.querySelector(".ok")){
        ok= document.querySelector(".ok");
        ok.style.display= 'none';
    }

    // Trova l'oggetto completo basato sul nome
    const item = tuttiGliOggetti.find(oggetto => oggetto.nome === itemNome);
    
    if (!item) {
        console.log("Oggetto non trovato: " + itemNome);
        return;
    }

    const prezzo = item.prezzoAcquisto;

    if (prezzo <= personaggio.oro) {
        // Aggiunge l'oggetto all'inventario e aggiorna i dati del personaggio
        personaggio.inventario.push(item);
        personaggio.oro -= prezzo;
        riempiInventario();
        aggiornaStatistichePersonaggio();

        //se esiste un precedente messaggio di ok, mostralo di nuovo
        if(ok){
            console.log("ok esiste");
            ok.textContent = "La venditrice ti consegna ciò che hai chiesto, mette via il denaro ricevuto e ti sorride: 'Posso esserti ancora utile?'";
            ok.style.display='block';
        } else{
            // Crea il messaggio di errore
            const div = document.createElement("div");
            div.classList.add("ok");
            div.textContent = "La venditrice ti consegna ciò che hai chiesto, mette via il denaro ricevuto e ti sorride: 'Posso esserti ancora utile?'";
            testo.appendChild(div); // Aggiunge il messaggio al contenitore `testo`
        }
    } else {
        //se esiste un precedente messaggio di warning, mostralo di nuovo
        if(warning){
            console.log("warning esiste");
            warning.style.display='block';
        } else{
            // Crea il messaggio di errore
            const div = document.createElement("div");
            div.classList.add("warning");
            div.textContent = "La venditrice ti guarda con aria desolata, inarca debolmente l'interno delle sopracciglia verso l'alto e scuote la testa: " +
                "'Mi dispiace, ma sembra che tu non possa permetterti quest'oggetto.'";
            testo.appendChild(div); // Aggiunge il messaggio al contenitore `testo`
        }
    }
}

function vendi() {

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
            descrizione = '<strong>Equip</strong>: +' + item.forza + ' forza';
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
            equip.innerText = "Non hai equipaggiamento, dovresti passare al negozio a comprare qualcosa ed equipaggiare il necessario.";
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

