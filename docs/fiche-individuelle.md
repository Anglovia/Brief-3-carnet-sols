# Fiche individuelle

> Une page, avant la livraison. Konan Anglovia, Kouassi, Anglovia : 

1. **Une fonction que j'ai écrite**, et comment elle marche : 
 `pointsADiscuter(observations, seuil)` (`src/synthese.js`). Elle reçoit le carnet et un seuil, et renvoie un **nouveau** tableau avec les observations dont le pH est **strictement inférieur** au seuil, dans l'ordre du carnet. Elle utilise `filter` : pour chaque observation, la condition `observation.pH < seuil` décide si elle est gardée. Avec le seuil 5,5, un pH de 5,4 est gardé et un pH de 5,5 ne l'est pas, car `<` exclut l'égalité. Le seuil est un paramètre (la constante `SEUIL_PH_A_DISCUTER` est donnée par le menu), et le carnet reçu n'est pas modifié. Pour un carnet vide, elle renvoie `[]`.

2. **Une difficulté, et sa solution** : 

- Modifier une observation : `verifierObservation` refusait l'identifiant car il « existait déjà » (l'observation était vue comme son propre doublon). Solution : la vérifier contre le carnet **sans** elle (`observations.filter(obs => obs.id !== id)`).
- `Number('')` vaut `0` : un pH vide aurait été accepté. Solution : utiliser `versNombre` (fourni), qui renvoie `NaN` pour un texte vide.
- `[10, 9.5, 5.2].sort()` trie comme du texte. Solution : un comparateur numérique `(a, b) => a.pH - b.pH`.

3. **L'entraide** (qui m'a aidé, qui j'ai aidé, sur quoi) : ✏️

LES PERSONNES QUE J'AI AIDE SONT :
-   RUTH TOMEDE sur le fichier stockage.js et app.js
-   ZIE MARIUS SANOGO sur les fonction ascynchrones , menu
-   ANGE AKUI CYRIACK KOUTOUAN sur le fichier app.js 
-   KAKEU ZRAN BRUCE sur le fichier app.js, synthese.js
-   KONATE ADAMA sur le fichier app.js
-   BOGBE Arnaud GIldas sur les fonctions asynchrones
-   KONATE kaba sur app.js


