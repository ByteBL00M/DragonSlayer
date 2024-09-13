// POZIONI

const pozioni = [
    {
        nome: "Piccola Pozione",
        salute: 15,
        prezzoAcquisto: 20,
        prezzoVendita: 10,
        tipo: "pozione",
        bottega: true
    },
    {
        nome: "Pozione",
        salute: 30,
        prezzoAcquisto: 50,
        prezzoVendita: 20,
        tipo: "pozione",
        bottega: true
    },
    {
        nome: "Grande Pozione",
        salute: 50,
        prezzoAcquisto: 80,
        prezzoVendita: 40,
        tipo: "pozione",
        bottega: true
    },
    {
        nome: "Mega Pozione",
        salute: 75,
        prezzoAcquisto: 150,
        prezzoVendita: 75,
        tipo: "pozione",
        bottega: true
    },
    {
        nome: "Super Pozione",
        salute: 100,
        prezzoAcquisto: 250,
        prezzoVendita: 125,
        tipo: "pozione",
        bottega: true
    }
];

// ARMI

const armi = [
    // Armi base (più deboli)
    {
      nome: "bastone",
      attacco: 4, 
      precisione: 80,
      durabilità: 120,
      effetto: null,
      prezzoAcquisto: 5,
      prezzoVendita: 1,
      bottega: false,
      tipo: "arma"
    },
    {
      nome: "pugnale dell'Oste",
      attacco: 8, 
      precisione: 85,
      durabilità: 90,
      effetto: null,
      prezzoAcquisto: 15,
      prezzoVendita: 5,
      bottega: false,
      tipo: "arma"
    },
  
    // Armi corte
    {
      nome: "Spada corta",
      attacco: 15, 
      precisione: 85,
      durabilità: 100,
      effetto: null,
      prezzoAcquisto: 30,
      prezzoVendita: 15,
      bottega: true,
      tipo: "arma"
    },
    {
      nome: "Pugnale velenoso",
      attacco: 12, 
      precisione: 95,
      durabilità: 90,
      effetto: "Avvelena il nemico",
      prezzoAcquisto: 40,
      prezzoVendita: 21,
      bottega: false,
      tipo: "arma"
    },
  
    // Armi lunghe
    {
      nome: "Spada lunga",
      attacco: 33, 
      precisione: 90,
      durabilità: 110,
      effetto: null,
      prezzoAcquisto: 75,
      prezzoVendita: 38,
      bottega: true,
      tipo: "arma"
    },
    {
      nome: "Lancia",
      attacco: 30,
      precisione: 85,
      durabilità: 100,
      effetto: null,
      prezzoAcquisto: 65,
      prezzoVendita: 33,
      bottega: true,
      tipo: "arma"
    },
  
    // Armi contundenti
    {
      nome: "Mazza ferrata",
      attacco: 27, 
      precisione: 82,
      durabilità: 90,
      effetto: "Schiaccia le difese", // Riduce la difesa del nemico
      prezzoAcquisto: 60,
      prezzoVendita: 31,
      bottega: true,
      tipo: "arma"
    },
    {
      nome: "Martello da guerra",
      attacco: 50, 
      precisione: 80,
      durabilità: 85,
      effetto: "Schiaccia le difese", // Riduce la difesa del nemico
      prezzoAcquisto: 90,
      prezzoVendita: 300,
      bottega: true,
      tipo: "arma"
    },
  
    // Armi speciali
    {
      nome: "Spada cerimoniale",
      attacco: 27, 
      precisione: 88,
      durabilità: 120,
      effetto: "Assorbe salute",
      prezzoAcquisto: 120,
      prezzoVendita: 61,
      bottega: true,
      tipo: "arma"
    }
  ];

// OGGETTI

const amuleti = [
    {
        nome: "Amuleto della Fattucchiera",
        tipo: "amuleto",
        difesa: 0,
        vita: 20,
        prezzoAcquisto: 100,
        prezzoVendita: 50,
        bottega: true,
        effetto: "Aumenta la precisione di +5"
    },
    {
        nome: "Amuleto della Maga",
        tipo: "amuleto",
        difesa: 0,
        vita: 50,
        prezzoAcquisto: 250,
        prezzoVendita: 120,
        bottega: true,
        effetto: "Aumenta l'attacco' di +5"
    },
    {
        nome: "Amuleto della Magistra",
        tipo: "amuleto",
        difesa: 0,
        vita: 80,
        prezzoAcquisto: 400,
        prezzoVendita: 180,
        bottega: true,
        effetto: "Riduce il danno subito del 10%"
    },
    {
        nome: "Amuleto dell'Avventuriero",
        tipo: "amuleto",
        difesa: 0,
        vita: 30,
        prezzoAcquisto: 150,
        prezzoVendita: 75,
        bottega: true,
        effetto: "Aumenta la probabilità di trovare oggetti rari del 5%"
    },
    {
        nome: "Amuleto del Guerriero",
        tipo: "amuleto",
        difesa: 5,
        vita: 40,
        prezzoAcquisto: 300,
        prezzoVendita: 150,
        bottega: true,
        effetto: "Aumenta l'attacco di +5"
    },
    {
        nome: "Amuleto della Resilienza",
        tipo: "amuleto",
        difesa: 10,
        vita: 60,
        prezzoAcquisto: 350,
        prezzoVendita: 175,
        bottega: true,
        effetto: "Aumenta la difesa del personaggio di +10 contro gli attacchi fisici"
    }
];

const armature = [
    // Tier Cuoio
    {
        nome: "elmo di cuoio",
        tipo: "elmo",
        difesa: 7,
        salute: 0,
        prezzoAcquisto: 20,
        prezzoVendita: 10,
        bottega: true
    },
    {
        nome: "pettorale di cuoio",
        tipo: "pettorale",
        difesa: 20, 
        salute: 0,
        prezzoAcquisto: 100,
        prezzoVendita: 50,
        bottega: true
    },
    {
        nome: "gambali di cuoio",
        tipo: "gambali",
        difesa: 10,
        salute: 0,
        prezzoAcquisto: 40,
        prezzoVendita: 20,
        bottega: true
    },

    // Tier Acciaio
    {
        nome: "elmo di acciaio",
        tipo: "elmo",
        difesa: 15, 
        salute: 0,
        prezzoAcquisto: 60,
        prezzoVendita: 30,
        bottega: true
    },
    {
        nome: "pettorale di acciaio",
        tipo: "pettorale",
        difesa: 45,
        salute: 0,
        prezzoAcquisto: 200,
        prezzoVendita: 100,
        bottega: true
    },
    {
        nome: "gambali di acciaio",
        tipo: "gambali",
        difesa: 20,
        salute: 0,
        prezzoAcquisto: 80,
        prezzoVendita: 40,
        bottega: true
    },

    // Nuovo tier: Mithril (o metallo magico)
    {
        nome: "elmo di mithril",
        tipo: "elmo",
        difesa: 25, 
        salute: 10, 
        prezzoAcquisto: 150,
        prezzoVendita: 75,
        bottega: true
    },
    {
        nome: "pettorale di mithril",
        tipo: "pettorale",
        difesa: 70,
        salute: 30, 
        prezzoAcquisto: 400,
        prezzoVendita: 200,
        bottega: true
    },
    {
        nome: "gambali di mithril",
        tipo: "gambali",
        difesa: 35,
        salute: 15,
        prezzoAcquisto: 250,
        prezzoVendita: 125,
        bottega: true
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
      descrizione: "Una massa gelatinosa e viscida che si muove lentamente, ma i suoi tentacoli possono sorprendentemente allungarsi " + 
          "per afferrare le prede. È particolarmente vulnerabile al fuoco.",
      livello: 1,
      salute: 50,
      attacco: 10,
      difesa: 15,
      precisione: 80
    },
    {
      nome: "ragno",
      descrizione: "Un agile aracnide velenoso che tesse intricate ragnatele per intrappolare le sue vittime. I suoi occhi brillano al " +
          "buio, conferendogli un vantaggio in ambienti oscuri.",
      livello: 2,
      salute: 60,  
      attacco: 12, 
      difesa: 8,
      precisione: 90
    },
    {
      nome: "scheletro",
      descrizione: "Uno scheletro rianimato, dotato di una forza sovrumana. I suoi attacchi sono lenti ma potenti, e la sua corazza ossea " +
          "lo rende resistente ai danni fisici.",
      livello: 4,
      salute: 120, 
      attacco: 22, 
      difesa: 30,  
      precisione: 75
    },
    {
      nome: "cinghiale",
      descrizione: "Un cinghiale feroce e aggressivo, con zanne affilate e una pelle dura. Carica i suoi nemici con una forza bruta inarrestabile.",
      livello: 3,
      salute: 110, 
      attacco: 20, 
      difesa: 18,  
      precisione: 85
    },
    {
      nome: "bandito",
      descrizione: "Un ladro astuto e agile, abile nell'uso di diverse armi. È un combattente esperto e conosce diverse tecniche di combattimento.",
      livello: 5,
      salute: 150, 
      attacco: 28, 
      difesa: 12,  
      precisione: 95
    },
    {
      nome: "grifone",
      descrizione: "Una creatura mitologica con il corpo di un leone e la testa di un'aquila. Può attaccare sia da terra che dall'aria, e il suo becco e gli artigli sono armi letali.",
      livello: 6,
      salute: 210, 
      attacco: 35, 
      difesa: 22,  
      precisione: 90
    },
    {
      nome: "drago",
      descrizione: "Un essere leggendario capace di sputare fuoco e volare. La sua pelle squamosa lo protegge da molti attacchi, e la sua forza è immensa.",
      livello: 8,
      salute: 400, 
      attacco: 50, 
      difesa: 35,  
      precisione: 95
    }
  ];
