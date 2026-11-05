# Relevé des tests

> Écrivez le résultat attendu avant d'essayer. Un écart n'est pas une faute : notez-le, corrigez, refaites le test.

**Calculs à la main** : refaites à la main les résultats de référence de `SUJET.md`, puis comparez avec votre programme. 


- pH minimum : **4,8** (S04) ; pH maximum : **7,6** (S08) → le choix 5 affiche bien 4.8 et 7.6.
- Textures : sableux S01, S04, S08 = **3** ; limoneux S02, S05, S07, S10 = **4** ; argileux S03, S06, S09 = **3** → total 10.
- Points de pH strictement inférieur à 5,5 : S01 (5,2), S04 (4,8), S06 (5,4), S09 (5,1) = **4** ; S02 (6,1) et les autres sont au-dessus. Un pH de 5,5 ne serait pas retenu.
- Tri croissant : commence par S04 (4,8), finit par S08 (7,6) ; tri décroissant : l'inverse.


**Essais dans le menu** : un ajout valide (encore là après redémarrage), chaque règle refusée, une recherche introuvable, chaque tri, la synthèse, un choix inconnu.

| Action | Attendu | Obtenu | Testeur |
| --- | --- | --- | --- |
| Ajouter `s11`, `p6`, `Limoneux`, `5,8`, `Humide` | « Observation S11 ajoutée. Le carnet compte 11 observation(s). », encore là après relance | conforme | auto-test |
| Ajouter avec un pH de `14,1` (puis `-1`, vide, `abc`) | « Observation refusée : - Le pH doit être un nombre entre 0 et 14. », carnet inchangé | conforme | auto-test |
| Ajouter avec les pH `0` et `14` | acceptés (bornes comprises) | conforme | auto-test |
| Ajouter `S01` (doublon), texture `sable`, pH `x` | une ligne d'erreur par règle non respectée, le menu revient | conforme | auto-test |
| Rechercher `s04`, puis `S99` | ligne de S04 ; « Observation S99 introuvable. » | conforme | auto-test |
| Rechercher la parcelle `P3`, la texture `argileux` | 2 observations ; 3 observations | conforme | auto-test |
| Trier par pH croissant puis lister | commence par S04 ; la liste (choix 2) reste dans l'ordre d'origine | conforme | auto-test |
| Synthèse, puis ajout d'un pH `5,5`, puis synthèse | S01, S04, S06, S09 ; le point à 5,5 n'apparaît pas | conforme | auto-test |
| Ajout d'un pH `4,2`, puis synthèse | minimum 4.2 ; 5 points à discuter | conforme | auto-test |
| Choix `9`, puis Entrée sans rien taper | « Choix inconnu : « 9 ». Tapez un chiffre du menu. », le menu revient | conforme | auto-test |
| Fichier de données absent ou JSON invalide | « Impossible de lire … Le carnet démarre vide. », le programme continue | conforme | auto-test |
| Synthèse d'un carnet vide | « pH minimum et maximum : aucune donnée », 0 point à discuter | conforme | auto-test |
| Bonus : supprimer `s03`, puis `S99` ; modifier le pH de S03 (`6,9`, puis `14,5`), l'`id` | suppression et modification enregistrées ; refus avec message pour `S99`, `14,5` et `id` | conforme | auto-test |


**Sur un autre poste** (`git clone`, `node app.js`, `npm test`, en suivant le README) : ✏️
-   ZIE MARIUS SANOGO 
-   RUTH TOMEDE 
-   ANGE AKUI CYRIACK KOUTOUAN s
-   KAKEU ZRAN BRUCE 
-   KONATE ADAMA 
-   BOGBE Arnaud GIlDAS
-   KONATE KABA

