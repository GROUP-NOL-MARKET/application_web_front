# Getting Started with Create React App

This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

## Available Scripts

In the project directory, you can run:

### `npm start`

Runs the app in the development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in your browser.

The page will reload when you make changes.\
You may also see any lint errors in the console.

### `npm test`

Launches the test runner in the interactive watch mode.\
See the section about [running tests](https://facebook.github.io/create-react-app/docs/running-tests) for more information.

### `npm run build`

Builds the app for production to the `build` folder.\
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.\
Your app is ready to be deployed!

See the section about [deployment](https://facebook.github.io/create-react-app/docs/deployment) for more information.

### `npm run eject`

**Note: this is a one-way operation. Once you `eject`, you can't go back!**

If you aren't satisfied with the build tool and configuration choices, you can `eject` at any time. This command will remove the single build dependency from your project.

Instead, it will copy all the configuration files and the transitive dependencies (webpack, Babel, ESLint, etc) right into your project so you have full control over them. All of the commands except `eject` will still work, but they will point to the copied scripts so you can tweak them. At this point you're on your own.

You don't have to ever use `eject`. The curated feature set is suitable for small and middle deployments, and you shouldn't feel obligated to use this feature. However we understand that this tool wouldn't be useful if you couldn't customize it when you are ready for it.

## Learn More

You can learn more in the [Create React App documentation](https://facebook.github.io/create-react-app/docs/getting-started).

To learn React, check out the [React documentation](https://reactjs.org/).

### Code Splitting

This section has moved here: [https://facebook.github.io/create-react-app/docs/code-splitting](https://facebook.github.io/create-react-app/docs/code-splitting)

### Analyzing the Bundle Size

This section has moved here: [https://facebook.github.io/create-react-app/docs/analyzing-the-bundle-size](https://facebook.github.io/create-react-app/docs/analyzing-the-bundle-size)

### Making a Progressive Web App

This section has moved here: [https://facebook.github.io/create-react-app/docs/making-a-progressive-web-app](https://facebook.github.io/create-react-app/docs/making-a-progressive-web-app)

### Advanced Configuration

This section has moved here: [https://facebook.github.io/create-react-app/docs/advanced-configuration](https://facebook.github.io/create-react-app/docs/advanced-configuration)

### Deployment

This section has moved here: [https://facebook.github.io/create-react-app/docs/deployment](https://facebook.github.io/create-react-app/docs/deployment)

### `npm run build` fails to minify

This section has moved here: [https://facebook.github.io/create-react-app/docs/troubleshooting#npm-run-build-fails-to-minify](https://facebook.github.io/create-react-app/docs/troubleshooting#npm-run-build-fails-to-minify)

## Fonctionnement de l'application en question

L'application est structurée en plusieurs sections :

1. #### La page d'accueil

Elle est la page que visite en premier l'utilisateur qui se connecte à l'application web. Elle est également structurée en plusieurs sections :

##### Deux navbars (Les composants liés aux deux navbars sont dans le dossier Navbar situé dans le dossier Accueil) :

    * **Navbar 1** : C'est lui qui est le premier élément de la page d'accueil. Il est structuré en différentes sections inline avec le numéro de téléphone d'urgence, les sections de navigatons à propos et contact ainsi qu'un bouton d'action à l'achat immédiat de produit.
    * **Navbar 2** : C'est le deuxième élément visible sur la page d'accueil. Il est constitué du logo de l'entreprise en question, de la localisation, d'une barre de recherche, d'une option de connexion et d'inscription, des éléments de navigation d'aide, de favoris et du panier.
    * **Navbar 3** : Le navbar 3 est joint au header pour un rendu fluide et professionnel.

##### Le header (Le composant lié au header se trouve directement dans le dossier Accueil).

    * **Navbar 3** : Il est constitué des différentes catégories de produits dont dispose la structure et aussi de quelques liens de navigations.
    * **Le carousel et les blocs d'affiches supperposées** : Les composants liés à cette structure se retrouvent dans le dossier Accueil précisément dans le fichier header.

##### Les différentes sections de catégories de produit :

    La section des différentes catégories de produit est pareille, disons le même design pour tout. Et le nom de chaque section est spécifié à travers le nom de son composant dans le dossier Accueil.
    Entre autre il y a d'autres composants tels que les vente flash, les publicités : le nom des composants dans le dossier en dit exactement sur l'élément pris en compte.
    Les différentes affiches avec un bouton d'action d'achat sont implémentés dans le fichier **Suite** se trouvant dans le dossier Accueil.

##### Un page d'A propos:

    Une petite section qui montre l'apperçu de l'entreprise en question et de ces activités. Le composant qui en est chargé se retrouve dans le fichier Apropos dans le dossier Accueil.

##### Le footer :

    C'est le pied de page contenant tous les liens de redirections et les politiques de vente...

2. #### La page d'À propos

   Cette page est liée à la représentation de l'entreprise. Ce que l'entreprise fait, ce qu'il est ainsi que tout ce qui est lié à l'histoire de l'entreprise. Le composant chargé de cela est le composant About.js situé directement dans le dossier Components.

3. #### La page de Contact

   Cette page est liée au contact et dipose d'un formulaire de contact, et aussi de l'intégration de l'iframe de map pour la localisation. Le composant chargé de cela est le composant Contact qui se trouve directement dans le dossier Component...

4. #### La page du panier

   La page du panier est la première étape vers l'achat de certains produits... Le composant chargé de cette action est Cart.js et se trouve directement dans le dossier Components.

5. #### La page de paiement
