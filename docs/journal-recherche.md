# Journal de recherche

> Chaque recherche utile : ce que vous cherchiez, où (cours, [MDN](https://developer.mozilla.org/fr/docs/Web/JavaScript), [Node.js](https://nodejs.org/api/), un camarade, une IA…), ce que vous avez compris. Ce que vous gardez, vous devez pouvoir l'expliquer.

| Ce que je cherchais | Où | Ce que j'ai compris | Utilisé dans |
| --- | --- | --- | --- |
| Lire un fichier JSON et le transformer en tableau | MDN (`JSON.parse`), doc Node.js (`fs/promises`, `readFile`) | `readFile` renvoie une promesse : il faut `await` ; `JSON.parse` transforme le texte en tableau ; une erreur remonte toute seule | `src/stockage.js` |
| Écrire un tableau en JSON indenté | MDN (`JSON.stringify`) | le 3e argument (`2`) indente de 2 espaces ; `writeFile` remplace le contenu | `src/stockage.js` |
| Transformer chaque élément d'un tableau, les rassembler en texte | MDN (`Array.prototype.map`, `join`) | `map` fabrique un nouveau tableau ; `join('\n')` met un séparateur entre les éléments, pas après le dernier | `src/registre.js` (`listerObservations`) |
| Trouver un élément, savoir si une valeur fait partie d'une liste | MDN (`find`, `some`, `includes`) | `find` renvoie l'élément ou `undefined` ; `includes` teste l'appartenance | `src/registre.js` |
| Pourquoi `Number('')` vaut 0 ; convertir `5,8` | `src/outils.js` (`versNombre`), console `node` | `versNombre` gère la virgule et renvoie `NaN` pour vide ; `Number.isNaN` détecte le cas | `src/registre.js` (`verifierObservation`) |
| Trier des nombres sans modifier l'original | MDN (`sort`, fonction de comparaison, copie avec `[...tableau]`) | sans comparateur, `sort` compare du texte (10 avant 9.5) ; `sort` modifie le tableau : on trie une copie | `src/recherche.js` |
| Filtrer en gardant l'ordre | MDN (`filter`) | `filter` renvoie un nouveau tableau, éventuellement vide | `src/recherche.js`, `src/synthese.js` |
| Compter avec un objet, parcourir clés et valeurs | MDN (`Object.entries`, `for...of`, propriété à clé calculée) | `objet[cle]` vaut `undefined` si la clé n'existe pas encore ; `Object.entries` donne des paires `[clé, valeur]` | `src/synthese.js`, `app.js` |
| Menu qui se répète, attraper les erreurs | MDN (`while`, `switch`, `try...catch`) ; `src/saisie.js` (readline) | la boucle tourne jusqu'à `0` ou `null` ; `try/catch` empêche une erreur d'arrêter le programme | `app.js` |
| Retirer un élément d'un tableau, modifier un seul champ | MDN (`findIndex`, `splice`, syntaxe de décomposition d'objet) | `splice(position, 1)` retire un élément ; `{ ...objet, [champ]: valeur }` copie en changeant un champ | `src/bonus.js` |
| Lancer le programme dans un test, avec des réponses tapées d'avance | doc Node.js (`child_process.spawnSync`, `node:test`) | `input` simule le clavier ; on travaille dans un dossier temporaire pour ne pas toucher aux vraies données | `test/menu.test.js` |
| Aide à la correction et à la rédaction du projet (app.js, tests, documents) | **(IA)** | j'ai relu et testé le code proposé ;| `app.js`, `docs/` |

