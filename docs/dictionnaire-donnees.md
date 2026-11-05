# Dictionnaire des données

> Un champ par ligne, d'après `SUJET.md` et le fichier de `donnees/`. La première ligne sert de modèle.

| Champ | Signification | Type | Règle de validation | Unité | Exemple |
| --- | --- | --- | --- | --- | --- |
| `id` | Identifiant unique du point observé | texte | non vide, absent des données ; saisi en majuscules | — | `S04` |
| `parcelle` | Parcelle où se trouve le point | texte | non vide (n'importe quel texte) ; saisie en majuscules | — | `P2` |
| `texture` | Classe de texture du sol | texte | une des trois valeurs autorisées ; saisie en minuscules | — | `sableux` |
| `pH` | Acidité du sol relevée au point | nombre | nombre de 0 à 14, bornes comprises ; virgule acceptée à la saisie ; enregistré comme nombre | — | `4.8` |
| `etatHumidite` | Humidité du sol au moment du relevé | texte | une des trois valeurs autorisées ; saisie en minuscules | — | `sec` |

**Listes de valeurs autorisées** : 

La liste des valeur autorisées est :
    - La testure du sol qui doit etre : sableux, limoneux, ou argileux
    - L'etat d'humiditer du sole  qui doit etre : sec, intermédiaire, ou humide
    - 

**Sources** : `donnees/observations.json`
