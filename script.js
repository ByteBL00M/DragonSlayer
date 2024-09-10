let xp = 0;
let maxVita = 100;
let salute = 100;
let difesa = 0;
let oro = 50;
let forza = 0;
let livello = 1;
let item;
let inventario = [spada, pozione, elmoAcciaio, amuletoMaga, gambaliAcciaio, pettoraleAcciaio];

let equipaggiamento = {
    arma: null,
    elmo: null,
    pettorale: null,
    gambali: null,
    amuleto: null
};
/* let equipaggiamento = {
    arma: bastone,
    elmo: elmoCuoio,
    pettorale: pettoraleCuoio,
    gambali: gambaliAcciaio,
    amuleto: amuletoFattucchiera
}; */

const pozioni = [pozionePiccola, pozione, pozioneGrande, pozioneMega];
const armi = [bastone, mazza, alabarda, spada, spadaMitica];
const amuleti = [amuletoFattucchiera, amuletoMaga, amuletoMagistra]
const armature = [elmoCuoio, elmoAcciaio, pettoraleCuoio, pettoraleAcciaio, gambaliCuoio, gambaliAcciaio];
 
const tuttiGliOggetti = pozioni.concat(armi.concat(amuleti.concat(armature)))

const mostri = [gelatina, ragno, scheletro, cinghiale, bandito, grifone, drago]

const citta = {
    nome: "citta",
    text: "Devi sconfiggere il drago che impedisce alle persone di lasciare la città. In questo momento " +
        "ti trovi nella piazza principale, il tuo interesse viene catturato da un'insegna, 'Negozio', e " +
        "dai sentieri che conducono alle caverne, al bosco e in cima alla montagna, alla tana del drago. Dove vuoi andare?",
    bottoni: ["Vai al negozio", "Vai alla caverna", "Vai al bosco", "Vai al drago"],
    funzioni: [goNegozio, goCaverna, goBosco, goDrago]
};

const bottega = {
    nome: "bottega",
    text: "La bottega appare minuscola, ma forse è solo un'illusione dovuta alla presenza di oggetti di ogni tipo ammassati sugli scaffali " +
        "e a ogni angolo disponibile. \nTra gli oggetti in vendita, per lo più ciarpame, è stato lasciato un piccolo corridoio libero per " +
        "poter raggiungere il bancone. Dietro di esso c'è una donna dalla pelle incartapecorita, china su se stessa: la sua età è indefinibile, " +
        "ma ha lo sguardo buono.",
    bottoni: ["Torna in città", "Chiacchiera"],
    funzioni: [goCitta, chiacchiera]
};

const chat = {
    nome: "chiacchiera",
    text: "La signora è di buon cuore come appare, ma oltre a raccontarti la storia della sua (lunga lunga lunga) vita, non sembra avere informazioni " +
        "rilevanti da condividere.",
    bottoni: ["Torna in città", "Chiacchiera"],
    funzioni: [goCitta, chiacchiera]
};

const stati = [citta, bottega, chat];
let statoCorrente = citta;
let itemName;


/*    INIZIALIZZAZIONE PAGINA    */

const bottone0 = document.querySelector("#bottone0");
const bottone1 = document.querySelector("#bottone1");
const bottone2 = document.querySelector("#bottone2");
const bottone3 = document.querySelector("#bottone3");

const bottoni=[bottone0, bottone1, bottone2, bottone3];

const testoLivello = document.querySelector("#livello");
const testoXp = document.querySelector("#xp");
const testoSalute = document.querySelector("#curSalute");
const testoVita = document.querySelector("#maxVita");
const testoDifesa = document.querySelector("#def");
const testoForza = document.querySelector("#forz");
const testoOro = document.querySelector("#oro");

const statisticheMostro = document.querySelector("#statisticheMostro");
const testo =document.querySelector("#testo");
const negozio = document.querySelector("#negozio");
const negozioContainer = document.querySelector("#negozioContainer");

const immagine = document.querySelector("#img");
const equip = document.querySelector("#equipContainer");
const borsa = document.querySelector("#borsaContainer");

const msg = document.querySelector("#msg");

/*const  =document.querySelector("#");
const  =document.querySelector("#");
const  =document.querySelector("#");
const  =document.querySelector("#");
const  =document.querySelector("#");
const  =document.querySelector("#");*/

bottone0.onclick = goNegozio;
bottone1.onclick = goCaverna;
bottone2.onclick = goBosco;
bottone3.onclick = goDrago;


statisticheMostro.style.display = "none";
negozioContainer.style.display = "none";

riempiEquipaggiamento();
riempiInventario();


/*    FUNZIONI CAMBIO STATO     */

function aggiornaStato(stato, num) {   //num è il numero di pulsanti previsti per lo stato
    statoCorrente=stato;
    const index = stati.findIndex(elemento => elemento.nome === stato.nome); //trova l'indice dello stato nell'array stati
    testo.innerText=stato.text;
    immagine.src = `./res/img/${index}.webp`;

    for (let i=0; i<num; i++){
        bottoni[i].innerText = stato.bottoni[i];
        bottoni[i].onclick = stato.funzioni[i];
        bottoni[i].style.display='block';
    }

    for(i=num; i<bottoni.length; i++){
        bottoni[i].style.display='none';
    }

    // AZIONI SPECIFICHE PER BOTTEGA E CHIACCHIERA
    if(stato.nome=="bottega" || stato.nome=="chat"){
        riempiInventario();
        negozioContainer.display='block';
    }

}

function goNegozio() {
    console.log("click goNegozio");
    aggiornaStato(bottega, 2);

}

function goCaverna() {
    console.log("click goCaverna");
}

function goBosco() {
    console.log("click goBosco");
}

function goDrago() {
    console.log("click goDrago");
}

function goCitta() {
    console.log("click goCitta");
    aggiornaStato(citta,4);
}

function chiacchiera() {
    console.log("click chiacchiera");
    aggiornaStato(chat, 2);
}

/*    FUNZIONI COMBATTIMENTO     */


/*    FUNZIONI AZIONI OGGETTI     */

function vendi(item){}

function compra(item){}

function usa(itemNome) {
    // Trova l'oggetto completo basato sul nome
    const item = tuttiGliOggetti.find(oggetto => oggetto.nome === itemNome);

    // Verifica se l'oggetto esiste
    if (item && item.tipo=='pozione') {
        const salutePozione= item.salute;
        if (salutePozione + salute>maxVita-(salutePozione/2)){
            msg.innerText= "Decidi di non usare la pozione: finiresti con lo sprecarne più della metà!";
        }
        else{
            inventario.pop(item);
            if(salutePozione + salute > maxVita){
                salute = maxVita;
            }
            else{
                salute +=salutePozione
            }
            testoSalute.innerText=salute;
            rimuoviItem(inventario, item);
            riempiInventario();
            riempiEquipaggiamento;
        }
    } else {
        console.log("Oggetto non trovato: " + itemNome);
    }
}

function equipaggia(itemNome) {
    // Trova l'oggetto completo basato sul nome
    const item = tuttiGliOggetti.find(oggetto => oggetto.nome === itemNome);

    // Verifica se l'oggetto esiste
    if (item) {
        switch(item.tipo){
            case 'arma':
                if (equipaggiamento.arma)
                    swapEquipBorsa(item);
                else{
                    equipaggiamento.arma=item;
                    rimuoviItem(equipaggiamento, item);
                }
                break;
            case 'elmo':
                if (equipaggiamento.elmo)
                    swapEquipBorsa(item);
                else
                    equipaggiamento.arma=item;
                break;
            case 'pettorale':
                if (equipaggiamento.pettorale)
                    swapEquipBorsa(item);
                else
                    equipaggiamento.arma=item;
                break;
            case 'gambali':
                if (equipaggiamento.gambali)
                    swapEquipBorsa(item);
                else
                    equipaggiamento.arma=item;
                break;
            case 'amuleto':
                if (equipaggiamento.amuleto)
                    swapEquipBorsa(item);
                else
                    equipaggiamento.amuleto=item;
                break;
        }
        riempiInventario();
        riempiEquipaggiamento();
    } else {
        console.log("Oggetto non trovato: " + itemNome);
    }
}

/*    FUNZIONI GESTIONE ELENCHI     */

function showItemMini(item) {
    let descrizione = '';

    // Verifica del tipo di oggetto e creazione della descrizione corrispondente
    switch (item.tipo) {
        case 'arma':
            descrizione = 'Equip: +' + item.forza + ' forza';
            break;
        case 'elmo':
            descrizione = 'Equip: +' + item.difesa + ' difesa';
            break;
        case 'pettorale':
            descrizione = 'Equip: +' + item.difesa + ' difesa';
            break;
        case 'gambali':
            descrizione = 'Equip: +' + item.difesa + ' difesa';
            break;
        case 'amuleto':
            descrizione = 'Equip: +' + item.vita + ' vita max';
            break;
        case 'pozione':
            descrizione = 'Usa: +' + item.salute + ' salute';
            break;
        default:
            descrizione = 'Oggetto sconosciuto';
            break;
    }

    // Restituisce la stringa formattata con indentazione (4 spazi di tabulazione simulati con &nbsp;)
    return '<span class="nomeItem">' + item.nome + '</span><br/>' + 
           '&nbsp;&nbsp;&nbsp;&nbsp;<span class="descrizioneItem">' + descrizione + '</span><br/>';
}

function riempiInventario() {
    
    // Messaggio quando l'inventario è vuoto
    if (inventario.length === 0) {
        equip.innerText = "Non hai equipaggiamento, dovresti passare al negozio a comprare qualcosa ed equipaggiare il necessario.";
        return;
    }

    // Puliamo il contenuto di `borsa` prima di riempirlo
    borsa.innerHTML = "";

    for (let i = 0; i < inventario.length; i++) {
        // Cerchiamo l'oggetto nell'inventario
        const item = inventario[i];
        const oggetto = tuttiGliOggetti.find((o) => o.nome === item.nome);

        if (oggetto) {
            // Creiamo un div che conterrà l'elemento visualizzato e il bottone
            const itemContainer = document.createElement("div");

            // Utilizziamo `showItemMini` per visualizzare l'oggetto
            itemContainer.innerHTML += showItemMini(oggetto);

            // Creiamo il bottone per "Usa" o "Equipaggia"
            const button = document.createElement("button");
            if (item.tipo === 'pozione') {
                button.textContent = "Usa";
                button.onclick = () => usa(item.nome);
            } else {
                button.textContent = "Equipaggia";
                button.onclick = () => equipaggia(item.nome);
            }

            // Aggiungiamo il bottone al container dell'oggetto
            itemContainer.appendChild(button);

            // Se lo stato corrente è "chat" o "citta", aggiungiamo il bottone "Vendi a x"
            if (statoCorrente.nome == 'chiacchiera' || statoCorrente.nome == 'citta') {
                console.log("sono in citta o chiacchiera per riempiequip")
                const sellButton = document.createElement("button");
                sellButton.textContent = `Vendi a ${oggetto.prezzoVendita}`;
                sellButton.onclick = () => vendi(oggetto);  // Aggiungi l'evento onclick con la funzione `vendi`
                itemContainer.appendChild(sellButton);
            }

            // Aggiungiamo un break di riga per separare gli oggetti
            itemContainer.appendChild(document.createElement("br"));
            itemContainer.appendChild(document.createElement("br"));

            // Appendiamo il contenitore dell'elemento a `borsa`
            borsa.appendChild(itemContainer);
        }
    }
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
        const oggettoEquipaggiato = equipaggiamento[parte];

        if (oggettoEquipaggiato) {
            // Aggiungiamo l'elemento equipaggiato utilizzando `showItemMini`
            str += showItemMini(oggettoEquipaggiato);
            hasEquip = true;
        } else {
            // Messaggio quando non è equipaggiata la parte
            str += `<br/>Non hai <strong>${partiEquipaggiamento[parte]}</strong> equipaggiati.`;
        }
    }

    equip.innerHTML = str;

    // Messaggio finale se nessuna parte è equipaggiata
    if (!hasEquip) {
        equip.innerHTML += "<br/><br/><i>Dovresti equipaggiare qualcosa dalla borsa, non penserai mica di andare in giro a combattere senza nulla?</i>";
    }
}


/*    UTILITY  */

function rimuoviItem(vettore, item) {
    // Trova l'indice dell'oggetto da rimuovere
    const index = vettore.findIndex(elemento => elemento.nome === item.nome);
    
    // Se l'oggetto esiste (l'indice è diverso da -1), lo rimuoviamo
    if (index !== -1) {
        vettore.splice(index, 1); // Rimuove 1 elemento all'indice trovato
    } else {
        console.log("Oggetto non trovato: " + item.nome);
    }
}

function swapEquipBorsa(item){
    const tipo= item.tipo;
    const index = inventario.findIndex(elemento => elemento.nome === item.nome); //trova l'indice di item nell'inventario
    let tmp= inventario[index];

    rimuoviItem(inventario, item); //rimuove l'item dall'inventario
    inventario.push(equipaggiamento[tipo]); 
    equipaggiamento[tipo]=tmp;
}