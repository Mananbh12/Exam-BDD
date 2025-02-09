Pour accéder à la V1, se rendre dans la branche V1 du projet
Pour accéder à la V2, se rendre dans la branche V2 du projet

Pour mettre en place le projet, lancer MySqlWorkBench (ou équivalent). Ouvrir et exécuter db.sql pour créer la BDD avionpapier. 
Ouvrir et exécuter data.sql pour que les tables de avionpapier soient remplies de données et ainsi testables.

Se rendre dans un IDE et y ouvrir appV1.js pour tester la V1 et app.js pour tester la V2 
Dans un premier temps installer express et mysql2 via le terminal avec la commande :

```npm install express mysql2```

Puis lancer le serveur via :

```node appV1.js``` ou ```node app.js```

Puis utiliser l'extension POSTMAN (ou leur site web) pour simuler des requêtes http de divers types selon l'endpoint que vous souhaitez tester.
Vous trouverez des exemples de requêtes et de body dans l'audit de la V2.
