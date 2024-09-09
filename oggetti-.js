// POZIONI

const pozioni = [
    {
        nome: "piccola pozione",
        salute: 10,
        prezzoAcquisto: 20,
        prezzoVendita: 10,
        tipo: "pozione"
    },
    {
        nome: "pozione",
        salute: 20,
        prezzoAcquisto: 50,
        prezzoVendita: 20,
        tipo: "pozione"
    },
    {
        nome: "grande pozione",
        salute: 50,
        prezzoAcquisto: 120,
        prezzoVendita: 50,
        tipo: "pozione"
    },
    {
        nome: "mega pozione",
        salute: 100,
        prezzoAcquisto: 250,
        prezzoVendita: 100,
        tipo: "pozione"
    }
];

// ARMI

const armi = [
    {
        nome: "bastone",
        forza: 5,
        prezzoAcquisto: 1,
        prezzoVendita: 0,
        tipo: "arma"
    },
    {
        nome: "mazza",
        forza: 12,
        prezzoAcquisto: 20,
        prezzoVendita: 10,
        tipo: "arma"
    },
    {
        nome: "alabarda",
        forza: 25,
        prezzoAcquisto: 60,
        prezzoVendita: 30,
        tipo: "arma"
    },
    {
        nome: "spada",
        forza: 45,
        prezzoAcquisto: 120,
        prezzoVendita: 60,
        tipo: "arma"
    },
    {
        nome: "spada mitica",
        forza: 60,
        prezzoAcquisto: 300,
        prezzoVendita: 100,
        tipo: "arma"
    }
];

// OGGETTI

const amuleti = [
    {
        nome: "Amuleto della fattucchiera",
        tipo: "amuleto",
        difesa: 0,
        vita: 20,
        prezzoAcquisto: 60,
        prezzoVendita: 30
    },
    {
        nome: "amuleto della maga",
        tipo: "amuleto",
        difesa: 0,
        vita: 50,
        prezzoAcquisto: 150,
        prezzoVendita: 70
    },
    {
        nome: "amuleto della magistra",
        tipo: "amuleto",
        difesa: 0,
        vita: 80,
        prezzoAcquisto: 320,
        prezzoVendita: 150
    }
]

const armature = [
    {
        nome: "elmo di cuoio",
        tipo: "elmo",
        difesa: 5,
        salute: 0,
        prezzoAcquisto: 10,
        prezzoVendita: 5
    },
    {
        nome: "elmo di acciaio",
        tipo: "elmo",
        difesa: 15,
        salute: 0,
        prezzoAcquisto: 30,
        prezzoVendita: 15
    },
    {
        nome: "pettorale di cuoio",
        tipo: "pettorale",
        difesa: 25,
        salute: 0,
        prezzoAcquisto: 50,
        prezzoVendita: 25
    },
    {
        nome: "pettorale di acciaio",
        tipo: "pettorale",
        difesa: 50,
        salute: 0,
        prezzoAcquisto: 100,
        prezzoVendita: 50
    },
    {
        nome: "gambali di cuoio",
        tipo: "gambali",
        difesa: 10,
        salute: 0,
        prezzoAcquisto: 20,
        prezzoVendita: 10
    },
    {
        nome: "gambali di acciaio",
        tipo: "gambali",
        difesa: 20,
        salute: 0,
        prezzoAcquisto: 40,
        prezzoVendita: 20
    }
];


const tuttiGliOggetti = [...pozioni, ...armi, ...amuleti, ...armature];
const categorieItem= {
    pozioni: pozioni,
    armi: armi,
    amuleti: amuleti,
    armature: armature}


// MOSTRI

const mostri = [
    {
        nome: "gelatina",
        livello: 2,
        salute: 15
    },
    {
        nome: "ragno",
        livello: 5,
        salute: 40
    },
    {
        nome: "scheletro",
        livello: 10,
        salute: 100
    },
    {
        nome: "cinghiale",
        livello: 8,
        salute: 70
    },
    {
        nome: "bandito",
        livello: 13,
        salute: 150
    },
    {
        nome: "grifone",
        livello: 17,
        salute: 250
    },
    {
        nome: "drago",
        livello: 25,
        salute: 600
    }
];
