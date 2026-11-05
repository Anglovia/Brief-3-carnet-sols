// Carnet d'observation des sols — point d'entrée : le menu.
// À vous d'écrire tout le menu : accueil, chargement des données, menu affiché avant chaque choix,
// actions, sortie et gestion des erreurs. Comportement et textes imposés : fiches/3-ajouter-lister.md.
// Lancer : node app.js
import { demander, fermerSaisie, ouvrirSaisie } from './src/saisie.js';
import { chargerJson, enregistrerJson } from './src/stockage.js';
import { HUMIDITES, TEXTURES, ajouterObservation, formaterObservation, listerObservations, trouverParId } from './src/registre.js';
import { filtrerParParcelle, filtrerParTexture, trierParPh } from './src/recherche.js';
import { SEUIL_PH_A_DISCUTER, compterParTexture, phMinMax, pointsADiscuter } from './src/synthese.js';
import { CHAMPS_MODIFIABLES, modifierObservation, supprimerObservation, textureLaPlusFrequente, trierParPhDecroissant } from './src/bonus.js';

const FICHIER_DONNEES = 'donnees/observations.json';

let observations = [];

function afficherAccueil() {
  console.log('==================================================');
  console.log("   CARNET D'OBSERVATION DES SOLS");
  console.log('   Ferme pédagogique');
  console.log('==================================================');
}

async function chargerCarnet() {
  try {
    const donnees = await chargerJson(FICHIER_DONNEES);
    if (!Array.isArray(donnees)) {
      throw new Error('le fichier ne contient pas un tableau');
    }
    observations = donnees;
    console.log(`${observations.length} observation(s) chargée(s) depuis ${FICHIER_DONNEES}.`);
  } catch (erreur) {
    observations = [];
    console.log(`Impossible de lire ${FICHIER_DONNEES} : ${erreur.message}. Le carnet démarre vide.`);
  }
}

function afficherMenu() {
  console.log('');
  console.log('--------------------- MENU ---------------------');
  console.log('1. Ajouter une observation');
  console.log('2. Lister les observations');
  console.log('3. Rechercher (point, parcelle, texture)');
  console.log('4. Trier par pH');
  console.log('5. Synthèse des observations');
  console.log('6. Supprimer une observation');
  console.log('7. Modifier une observation');
  console.log('0. Quitter');
}

// choix 1

async function ajouter() {
  console.log('--- Ajouter une observation ---');
  const id = await demander('Point observé (ex. S11) : ');
  if (id === null) return;
  const parcelle = await demander('Parcelle (ex. P1) : ');
  if (parcelle === null) return;
  const texture = await demander(`Texture (${TEXTURES.join(', ')}) : `);
  if (texture === null) return;
  const pH = await demander('pH (nombre de 0 à 14, sans unité, virgule acceptée) : ');
  if (pH === null) return;
  const etatHumidite = await demander(`État d'humidité (${HUMIDITES.join(', ')}) : `);
  if (etatHumidite === null) return;

  const saisie = {
    id: id.toUpperCase(),
    parcelle: parcelle.toUpperCase(),
    texture: texture.toLowerCase(),
    pH,
    etatHumidite: etatHumidite.toLowerCase(),
  };

  const erreurs = ajouterObservation(observations, saisie);
  if (erreurs.length > 0) {
    console.log('Observation refusée :');
    for (const erreur of erreurs) {
      console.log(`  - ${erreur}`);
    }
    console.log(`Le carnet compte toujours ${observations.length} observation(s).`);
    return;
  }

  await enregistrerJson(FICHIER_DONNEES, observations);
  console.log(`Observation ${saisie.id} ajoutée. Le carnet compte ${observations.length} observation(s).`);
}

// choix 2

function lister() {
  console.log(`--- Liste des observations (${observations.length}) ---`);
  console.log(listerObservations(observations));
}

// choix 3

async function rechercher() {
  console.log('--- Rechercher ---');
  console.log('1. Par point (identifiant)');
  console.log('2. Par parcelle');
  console.log("3. Les observations d'une texture");
  const sousChoix = await demander('Votre choix : ');
  if (sousChoix === null) return;

  if (sousChoix === '1') {
    const reponse = await demander('Point : ');
    if (reponse === null) return;
    const id = reponse.toUpperCase();
    const observation = trouverParId(observations, id);
    console.log(observation === undefined ? `Observation ${id} introuvable.` : formaterObservation(observation));
  } else if (sousChoix === '2') {
    const reponse = await demander('Parcelle : ');
    if (reponse === null) return;
    const parcelle = reponse.toUpperCase();
    const trouvees = filtrerParParcelle(observations, parcelle);
    console.log(`${trouvees.length} observation(s) sur la parcelle ${parcelle} :`);
    console.log(listerObservations(trouvees));
  } else if (sousChoix === '3') {
    const reponse = await demander('Texture : ');
    if (reponse === null) return;
    const texture = reponse.toLowerCase();
    const trouvees = filtrerParTexture(observations, texture);
    console.log(`${trouvees.length} observation(s) de texture ${texture} :`);
    console.log(listerObservations(trouvees));
  } else {
    console.log('Choix inconnu : retour au menu.');
  }
}

// choix 4

async function trier() {
  console.log('--- Trier ---');
  console.log('1. Par pH croissant');
  console.log('2. Par pH décroissant');
  const sousChoix = await demander('Votre choix : ');
  if (sousChoix === null) return;

  if (sousChoix === '1') {
    console.log(listerObservations(trierParPh(observations)));
  } else if (sousChoix === '2') {
    console.log(listerObservations(trierParPhDecroissant(observations)));
  } else {
    console.log('Choix inconnu : retour au menu.');
  }
}

// choix 5

function synthese() {
  console.log('--- Synthèse des observations ---');
  console.log(`Nombre d'observations : ${observations.length}`);

  const extremes = phMinMax(observations);
  if (extremes === null) {
    console.log('pH minimum et maximum : aucune donnée');
  } else {
    console.log(`pH minimum : ${extremes.min} · pH maximum : ${extremes.max}`);
  }

  console.log('Observations par texture :');
  for (const [texture, nombre] of Object.entries(compterParTexture(observations))) {
    console.log(`  ${texture} : ${nombre}`);
  }

  const frequente = textureLaPlusFrequente(observations);
  if (frequente === null) {
    console.log('Texture la plus fréquente : aucune donnée');
  } else {
    console.log(`Texture la plus fréquente : ${frequente.texture} (${frequente.nombre} observation(s))`);
  }

  const aDiscuter = pointsADiscuter(observations, SEUIL_PH_A_DISCUTER);
  console.log(`Points à discuter avec le coach (pH < ${SEUIL_PH_A_DISCUTER}) : ${aDiscuter.length}`);
  for (const observation of aDiscuter) {
    console.log(`  ${formaterObservation(observation)}`);
  }

  console.log('Rappels : le pH est sans unité. Aucune moyenne de pH n\'est calculée (échelle logarithmique).');
  console.log('Ces points ne sont pas un diagnostic de fertilisation : ils servent à préparer l\'échange avec le coach.');
}

// choix 6

async function supprimer() {
  const reponse = await demander('Identifiant : ');
  if (reponse === null) return;
  const id = reponse.toUpperCase();

  const supprimee = supprimerObservation(observations, id);
  if (supprimee === undefined) {
    console.log(`Observation ${id} introuvable.`);
    return;
  }

  await enregistrerJson(FICHIER_DONNEES, observations);
  console.log(`Observation ${id} supprimée. Le carnet compte ${observations.length} observation(s).`);
}

// choix 7

async function modifier() {
  const reponseId = await demander('Identifiant : ');
  if (reponseId === null) return;
  const champ = await demander(`Champ à modifier (${CHAMPS_MODIFIABLES.join(', ')}) : `);
  if (champ === null) return;
  const reponseValeur = await demander('Nouvelle valeur : ');
  if (reponseValeur === null) return;

  const id = reponseId.toUpperCase();
  // Même normalisation qu'à l'ajout : parcelle en majuscules, texture et humidité en minuscules.
  let valeur = reponseValeur;
  if (champ === 'parcelle') valeur = valeur.toUpperCase();
  if (champ === 'texture' || champ === 'etatHumidite') valeur = valeur.toLowerCase();

  const erreurs = modifierObservation(observations, id, champ, valeur);
  if (erreurs.length > 0) {
    console.log('Modification refusée :');
    for (const erreur of erreurs) {
      console.log(`  - ${erreur}`);
    }
    return;
  }

  await enregistrerJson(FICHIER_DONNEES, observations);
  console.log(`Observation ${id} modifiée.`);
}


async function executerChoix(choix) {
  switch (choix) {
    case '1': await ajouter(); break;
    case '2': lister(); break;
    case '3': await rechercher(); break;
    case '4': await trier(); break;
    case '5': synthese(); break;
    case '6': await supprimer(); break;
    case '7': await modifier(); break;
    default:
      console.log(`Choix inconnu : « ${choix} ». Tapez un chiffre du menu.`);
  }
}

async function main() {
  ouvrirSaisie();
  //console.log("À compléter : écrivez le menu dans app.js (fiches/3-ajouter-lister.md).");
  afficherAccueil();

  await chargerCarnet();

  while (true) {

    afficherMenu();
    const choix = await demander('Votre choix : ');
    if (choix === null || choix === '0') {
      console.log('Au revoir !');
      break;
    }

    try {
      await executerChoix(choix);
    } catch (erreur) {
      if (String(erreur.message).startsWith('TODO')) {
        console.log(`À compléter : ${erreur.message}`);
      } else {
        console.log(`Erreur inattendue : ${erreur.message}`);
      }
    }
  }
  fermerSaisie();
}

main();
