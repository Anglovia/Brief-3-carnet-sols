// BONUS — Pour aller plus loin. Facultatif : commencez seulement quand le socle est complet.
// Fiche : fiches/7-bonus.md · Vérifier : npm run test:bonus
// Ni pseudo-code de référence ni aide détaillée : à vous de combiner ce que vous avez appris.
// Les choix 6 et 7 du menu sont à écrire vous-même dans app.js (voir la fiche).
import { versNombre } from './outils.js';
import { trouverParId, verifierObservation } from './registre.js';
import { compterParTexture } from './synthese.js';

// Les champs qu'on a le droit de modifier. L'identifiant n'en fait pas partie.
export const CHAMPS_MODIFIABLES = ['parcelle', 'texture', 'pH', 'etatHumidite'];

// Supprime du carnet l'observation qui a cet identifiant.
// Renvoie l'observation supprimée, ou undefined si elle n'existe pas (le carnet ne change pas).
export function supprimerObservation(observations, id) {
  //throw new Error('TODO Bonus : coder supprimerObservation dans src/bonus.js');
  const observation = trouverParId(observations, id);

  if (observation === undefined) {
    return undefined;
  }

  const position = observations.findIndex(obs => obs.id === id);

  observations.splice(position, 1);

  return observation;
}

// Modifie UN champ d'une observation. La nouvelle valeur arrive sous forme de TEXTE et suit
// les mêmes règles qu'à l'ajout. Renvoie les erreurs : [] si la modification est faite ;
// sinon les messages, et l'observation ne change pas. Le pH modifié est enregistré comme un nombre.
// Erreurs : identifiant introuvable · champ 'id' (non modifiable) · champ absent de CHAMPS_MODIFIABLES
//           · valeur refusée par les règles de l'ajout.
export function modifierObservation(observations, id, champ, valeur) {
  //throw new Error('TODO Bonus : coder modifierObservation dans src/bonus.js');
  const observation = trouverParId(observations, id);

  if (observation === undefined) {
    return ["Observation introuvable."];
  }

  if (champ === "id") {
    return ["Le champ 'id' ne peut pas être modifié."];
  }

  if (CHAMPS_MODIFIABLES.includes(champ) === false) {
    return ["Champ non modifiable."];
  }

  const saisie = {
    ...observation,
    [champ]: valeur
  };

  const autresObservations = observations.filter(obs => obs.id !== id);

  const erreurs = verifierObservation(saisie, autresObservations);

  if (erreurs.length > 0) {
    return erreurs;
  }

  if (champ === "pH") {
    observation[champ] = versNombre(valeur);
  } else {
    observation[champ] = valeur;
  }

  return [];
}

// Renvoie une COPIE triée par pH décroissant. Le tableau reçu ne doit pas changer d'ordre.
export function trierParPhDecroissant(observations) {
  //throw new Error('TODO Bonus : coder trierParPhDecroissant dans src/bonus.js');
  const copie = [...observations];

  return copie.sort((a, b) => b.pH - a.pH);
}

// Renvoie { texture, nombre } pour la texture la plus fréquente, ou null si la liste est vide.
// En cas d'égalité, la première texture rencontrée l'emporte.
// Exemple : { texture: 'limoneux', nombre: 4 }
export function textureLaPlusFrequente(observations) {
  //throw new Error('TODO Bonus : coder textureLaPlusFrequente dans src/bonus.js');
  if (observations.length === 0) {
    return null;
  }

  const comptage = compterParTexture(observations);

  let meilleureTexture = null;
  let meilleurNombre = 0;

  for (const [texture, nombre] of Object.entries(comptage)) {

    if (nombre > meilleurNombre) {
      meilleureTexture = texture;
      meilleurNombre = nombre;
    }

  }

  return {
    texture: meilleureTexture,
    nombre: meilleurNombre
  };
}
