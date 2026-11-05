# Carnet d'observation des sols

> Projet individuel du SAS DFS, brief 3 (sujet : [SUJET.md](SUJET.md)). Remplacez chaque ✏️ par votre texte, puis supprimez cette ligne.

## Contexte

Ce carnet est destiné à l'assistant terrain Agritech de la ferme pédagogique. Son geste professionnel : observer un point de sol avec la fiche de terrain, puis relever sa texture (sableux, limoneux ou argileux), son pH et son état d'humidité. Son besoin : conserver ces relevés, retrouver rapidement les points d'une parcelle ou d'une texture, et repérer les valeurs à vérifier avec le coach agronomie. Il saisit pour chaque point un identifiant, une parcelle, une texture, un pH (nombre de 0 à 14, sans unité) et un état d'humidité. Le programme lui affiche la liste des observations, les résultats de recherche, un tri par pH et une synthèse (pH minimum et maximum, nombre de points par texture, points dont le pH est inférieur à 5,5). Le carnet enregistre des **constats** : il ne pose aucun diagnostic et ne donne aucun conseil de fertilisation. Les points « à discuter » servent seulement à préparer l'échange avec le coach.

## Prérequis et lancement

- Node.js 20 ou plus récent, Git ; aucune bibliothèque à installer.

```bash
git clone https://github.com/VOTRE-COMPTE/brief-3-carnet-sols.git
cd brief-3-carnet-sols
node app.js
npm test
```

Sous PowerShell, si `npm` est bloqué : `npm.cmd test`.

## Fonctionnalités

✏️ *Cochez seulement ce qui marche : `- [x]`.*

- [x] Données lues et enregistrées dans `donnees/observations.json`
- [x] Ajouter une observation, saisies invalides refusées sans arrêter le programme
- [x] Lister les observations, message si le carnet est vide
- [x] Rechercher par point ou par parcelle ; filtrer par texture
- [x] Trier par pH
- [x] Synthèse : pH minimum et maximum, nombre par texture, points à discuter (pH < 5,5)
- [x] Bonus : supprimer et modifier une observation (choix 6 et 7)
- [x] Bonus : tri par pH décroissant, texture la plus fréquente

## Données

Les observations sont dans `donnees/observations.json` : dix points de départ (S01 à S10), **fictifs**, auxquels le programme ajoute les nouveaux relevés. Chaque observation a cinq champs : `id`, `parcelle`, `texture`, `pH` (nombre sans unité) et `etatHumidite` (voir [docs/dictionnaire-donnees.md](docs/dictionnaire-donnees.md)). Les textures et les états d'humidité sont des classes d'exercice.

## Limites

✏️ *Au moins trois. Par exemple : le carnet repère des valeurs à discuter, mais ne produit aucun diagnostic de fertilisation.*

- Le carnet repère des valeurs à discuter, mais ne produit **aucun diagnostic de fertilisation** ni aucun conseil.
- Une seule observation par point : pas de date de relevé, donc pas de suivi dans le temps.
- Programme en ligne de commande, pour un seul utilisateur à la fois : le fichier JSON n'est pas prévu pour un accès simultané.

## Documents

[Dictionnaire des données](docs/dictionnaire-donnees.md) · [Tâches](docs/taches.md) · [Relevé des tests](docs/releve-tests.md) · [Journal de recherche](docs/journal-recherche.md) · [Fiche agronomique](docs/fiche-agronomique.md) · [Fiche individuelle](docs/fiche-individuelle.md)

## Auteur

✏️ *Konan Anglovia Kouassi, anglovia . Entraide : avec qui, sur quoi.*
