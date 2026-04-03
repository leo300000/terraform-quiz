# 🏔️ Terraform Quiz

Site interactif pour tester et pratiquer les bases de Terraform.  
6 thèmes couverts, avec des QCM et des exercices de complétion de code HCL.

---

## Thèmes disponibles

| Thème | Contenu |
|---|---|
| 🏗️ Les bases | init, plan, apply, destroy, fmt, workflow |
| 🔌 Providers | configuration, alias, required_providers, lock file |
| 📦 Resources | syntaxe, références, count, depends_on, lifecycle |
| 🔧 Variables & Outputs | variable, locals, TF_VAR_, outputs |
| 💾 State | tfstate, remote backend S3, import, locking |
| 🧩 Modules | structure, source, inputs/outputs, init |

---

## Prérequis

- [Node.js](https://nodejs.org/) v18 ou supérieur
- npm (inclus avec Node.js)

---

## Lancer l'atelier en local

```bash
# 1. Cloner le repo
git clone https://github.com/leo300000/terraform-quiz.git
cd terraform-quiz

# 2. Installer les dépendances
npm install

# 3. Démarrer le serveur de développement
npm run dev
```

Ouvre ensuite [http://localhost:5173](http://localhost:5173) dans ton navigateur.

---

## Build pour la production

```bash
npm run build
```

Les fichiers statiques sont générés dans le dossier `dist/`.  
Tu peux les servir avec n'importe quel serveur HTTP (Nginx, Apache, Netlify, Vercel, GitHub Pages...).

---

## Structure du projet

```
terraform-quiz/
├── src/
│   ├── components/
│   │   ├── Home.jsx       # Page d'accueil — sélection du thème
│   │   ├── Quiz.jsx       # Moteur de quiz (QCM + complétion de code)
│   │   └── Results.jsx    # Écran de résultats avec score et révision
│   ├── data/
│   │   └── questions.js   # Toutes les questions classées par thème
│   ├── App.jsx
│   └── App.css
├── index.html
└── package.json
```

Pour ajouter des questions, édite `src/data/questions.js` en suivant le format existant.
