const titre = document.querySelector('#titre');
const gauche = document.querySelector('#gauche');
const droite = document.querySelector('#droite');
const imageGauche = document.querySelector('#image-gauche');
const imageDroite = document.querySelector('#image-droite');
const resultatGauche = document.querySelector('#resultat-gauche');
const resultatDroite = document.querySelector('#resultat-droite');
const boutonRejouer = document.querySelector('#boutonRejouer');
let choixGauche = null;
let choixDroite = null;
let scoreGauche = null;
let scoreDroite = null;

imageGauche.addEventListener('click', () => {
    gauche.style.backgroundColor = "black";
    choixGauche = tirageAleatoire();
    afficherChoix(imageGauche, choixGauche);
    verifierVictoire(choixGauche, choixDroite);
});

imageDroite.addEventListener('click', () => {
    droite.style.backgroundColor = "black";
    choixDroite = tirageAleatoire();
    afficherChoix(imageDroite, choixDroite);
    verifierVictoire(choixGauche, choixDroite);
});

function tirageAleatoire() {
    const choix = ['pierre', 'feuille', 'ciseau'];
    const indexAleatoire = Math.floor(Math.random() * choix.length);
    boutonRejouer.style.display = 'block';
    return choix[indexAleatoire];
}

function afficherChoix(elementImage, choix) {
    elementImage.style.backgroundImage = `url('images/${choix}.jpg')`;
    if (elementImage === imageGauche) {
        resultatGauche.textContent = choix;
    } else {
        resultatDroite.textContent = choix;
    }
}

function verifierVictoire(choixGauche, choixDroite) {
    if (choixGauche && choixDroite) {
        if (choixGauche === choixDroite) {
            scoreGauche = 0.5;
            scoreDroite = 0.5;
        } else if (
            (choixGauche === "pierre" && choixDroite === "ciseau") ||
            (choixGauche === "feuille" && choixDroite === "pierre") ||
            (choixGauche === "ciseau" && choixDroite === "feuille")
        ) {
            scoreGauche = 1;
            scoreDroite = 0;
        } else {
            scoreGauche = 0;
            scoreDroite = 1;
        }
        boutonRejouer.style.display = "block";
        resultatJeu(scoreGauche, scoreDroite, choixGauche, choixDroite)
    }
}

function resultatJeu(scoreGauche, scoreDroite, choixGauche, choixDroite) {
    if (scoreGauche === scoreDroite) {
        resultatGauche.textContent = choixGauche;
        resultatDroite.textContent = choixDroite;
        phraseTitre = "Egalité"
        gauche.style.backgroundColor = "red";
        droite.style.backgroundColor = "red";
    } else if (scoreGauche > scoreDroite) {
        resultatGauche.textContent = "Gagné";
        resultatDroite.textContent = "Perdu";
        gauche.style.backgroundColor = "green";
        droite.style.backgroundColor = "red";
        phraseTitre = choixGauche;
    } else {
        resultatGauche.textContent = "Perdu";
        resultatDroite.textContent = "Gagné";
        gauche.style.backgroundColor = "red";
        droite.style.backgroundColor = "green";
        phraseTitre = choixDroite;
    }
    modifTitre(phraseTitre)
}

function modifTitre(phraseTitre) {
    if (phraseTitre === "Egalité") {
        titre.textContent = "Egalité, ça craint !!";
    } else if (phraseTitre === "pierre") {
        titre.textContent = "La pierre écrase le ciseau";
    } else if (phraseTitre === "feuille") {
        titre.textContent = "La feuille recouvre la pierre";
    } else if (phraseTitre === "ciseau") {
        titre.textContent = "Le ciseau coupe la feuille";
    }
}

window.addEventListener('load', () => {
    boutonRejouer.style.display = 'none';
});

boutonRejouer.addEventListener('click', () => {
    imageGauche.style.backgroundImage = "url('images/depart.jpg')";
    imageDroite.style.backgroundImage = "url('images/depart.jpg')";
    resultatGauche.textContent = "";
    resultatDroite.textContent = "";
    choixGauche = null;
    choixDroite = null;
    scoreGauche = null;
    scoreDroite = null;
    gauche.style.backgroundColor = "white";
    droite.style.backgroundColor = "white";
    titre.textContent = "CHIFOUMI"
});
