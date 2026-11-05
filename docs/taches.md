# Tableau des tâches

> Planifiez vous-même, puis tenez le tableau à jour. Une preuve : un commit, un test vert, un document.

| Tâche | Prévu | Fait le | Preuve |
| --- | --- | --- | --- |
| Poste et dépôt prêts ; besoin compris ; documents commencés | Jour 3 | 2026-11-05 | commit « redaction du README et documents du dossier docs » |
| Fiche 2 : lire et écrire le JSON | Jour 1 | 2026-11-03 | commit «lire et ecrire  dans le fiche JSON » ; `npm run test:stockage` vert |
| Fiche 3 : ajouter et lister ; choix 1 et 2 ; erreurs | Jour 1 | 2026-11-03 | commit «traitement des fonctions de gestion du fichier registre » et <<ajout du  menu avec les options ajouter et lister dans le fichier  app>> ; `npm run test:registre`, `node app.js`  vert |
| Fiche 4 : rechercher et trier ; choix 3 et 4 | Jour 1 | 2026-11-03 | commit « ajout des fonctions de filtrage et de tri dans le fichier recherche » et <<ajout des options rechercher et trier dans le menu du fichier app>>; `npm run test:recherche`, `node app.js` vert |
| Fiche 5 : synthèse ; choix 5 | Jour 3 | 2026-11-03 | commit «ajoute du calcul des pH min/max le comptage par texture et les points à discuter dans le fichier  synthese» et << ajout de l'option synthèse dans le menu du ficher app>> ; `npm run test:synthese`, `node app.js` vert |
| Tests par un camarade ; mes propres tests | Jour 3 | 2026-11-05 | `test/cas-limites.test.js` ; `docs/releve-tests.md` |
| Fiche agronomique ; README ; documents | Jour 3 | 2026-11-05 | commit « redaction du README et documents du dossier docs » ; fiche relue par le coach |
| Dépôt cloné et lancé ailleurs ; démonstration répétée | Jour 3 | 2026-11-05 | `docs/releve-tests.md` (section « autre poste ») |
| Bonus | Jour 1 | 2026-11-03 | commit «ajout de suppression, modification, tri décroissant et recherche de texture la plus fréquente dans le fichier bonus» et <<ajout de supprimer et modifier une observation dans le menu du fichier app>> ; `npm run test:bonus`, `node app.js` vert |

**Blocages** (le message exact, ce que j'ai essayé, la solution) : 

- Modifier une observation : `verifierObservation` refusait l'identifiant car il « existait déjà » (l'observation était vue comme son propre doublon). Solution : la vérifier contre le carnet sans elle (`observations.filter(obs => obs.id !== id)`).
- `Number('')` vaut `0` : un pH vide aurait été accepté. Solution : utiliser `versNombre` (fourni), qui renvoie `NaN` pour un texte vide.
- `[10, 9.5, 5.2].sort()` trie comme du texte. Solution : un comparateur numérique `(a, b) => a.pH - b.pH`.
