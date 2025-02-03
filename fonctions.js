const mysql = require("mysql2/promise");
const { initializeDatabase } = require("./db");

const dbConfig = {
    host: "localhost",
    user: "root",
    password: "rootroot",
    database: "avionpapier",
};

(async () => {
    await initializeDatabase();

    async function addClient(nom, prenom, ville, adresse, code_postal) {
        let connection;
        try {
            connection = await mysql.createConnection(dbConfig);
            console.log("Connecté à la base de données.");

            const [result] = await connection.execute(
                "INSERT INTO Client (nom, prenom, ville, adresse, code_postal) VALUES (?, ?, ?, ?, ?)",
                [nom, prenom, ville, adresse, code_postal]
            );
            const resultId = result.insertId;
            console.log(`Client ajouté avec succès ! ID: ${resultId}`);

        } catch (error) {
            console.error("Erreur lors de l'ajout du client :", error);
        } finally {
            if (connection) await connection.end();
        }
    }

    async function addFournisseur(nom,) {
        let connection;
        try {
            connection = await mysql.createConnection(dbConfig);
            console.log("Connecté à la base de données.");

            const [result] = await connection.execute(
                "INSERT INTO Fournisseur (nom) VALUES (?)",
                [nom]
            );
            const resultId = result.insertId;
            console.log(`Fournisseur ajouté avec succès ! ID: ${resultId}`);

        } catch (error) {
            console.error("Erreur lors de l'ajout du fournisseur :", error);
        } finally {
            if (connection) await connection.end();
        }
    }

    async function addCategorie(nom) {
        let connection;
        try {
            connection = await mysql.createConnection(dbConfig);
            console.log("Connecté à la base de données.");

            const [result] = await connection.execute(
                "INSERT INTO Categorie (nom) VALUES (?)",
                [nom]
            );
            const resultId = result.insertId;
            console.log(`Catégorie ajoutée avec succès ! ID: ${resultId}`);

        } catch (error) {
            console.error("Erreur lors de l'ajout de la catégorie :", error);
        } finally {
            if (connection) await connection.end();
        }
    }

    async function addProduit(reference, quantite, prix_unitaire, id_f, id_c) {
        let connection;
        try {
            connection = await mysql.createConnection(dbConfig);
            console.log("Connecté à la base de données.");

            const [result] = await connection.execute(
                "INSERT INTO Produit (reference, quantite, prix_unitaire, id_f, id_c) VALUES (?, ?, ?, ?, ?)",
                [reference, quantite, prix_unitaire, id_f, id_c]
            );
            const resultId = result.insertId;
            console.log(`Produit ajouté avec succès ! ID: ${resultId}`);

        } catch (error) {
            console.error("Erreur lors de l'ajout du produit :", error);
        } finally {
            if (connection) await connection.end();
        }
    }

    async function addCommande(prix_total, id_c) {
        let connection;
        try {
            connection = await mysql.createConnection(dbConfig);
            console.log("Connecté à la base de données.");

            const [result] = await connection.execute(
                "INSERT INTO Commande (prix_total, id_c) VALUES (?, ?)",
                [prix_total, id_c]
            );
            const resultId = result.insertId;
            console.log(`Commande créée avec succès ! ID: ${resultId}`);

        } catch (error) {
            console.error("Erreur lors de la création de la commande :", error);
        } finally {
            if (connection) await connection.end();
        }
    }

    async function addLigneCommande(id_p, id_c) {
        let connection;
        try {
            connection = await mysql.createConnection(dbConfig);
            console.log("Connecté à la base de données.");

            const [result] = await connection.execute(
                "INSERT INTO Ligne_Commande (id_p, id_c) VALUES (?, ?)",
                [id_p, id_c]
            );
            const resultId = result.insertId;
            console.log(`Ligne de commande ajoutée avec succès ! ID: ${resultId}`);

        } catch (error) {
            console.error("Erreur lors de l'ajout de la ligne dans la commande :", error);
        } finally {
            if (connection) await connection.end();
        }
    }

    async function updateClient(client_id, nom, prenom, ville, adresse, code_postal) {
        let connection;
        try {
            connection = await mysql.createConnection(dbConfig);
            console.log("Connecté à la base de données.");

            await connection.execute(
                `UPDATE Client nom=?, prenom=?, ville=?, adresse=?, code_postal=?
                 WHERE id = ?`,
                [nom, prenom, ville, adresse, code_postal, client_id] 
            );
    
            console.log(`Coordonnées client mises à jour ! ID: ${client_id}`);
        } catch (error) {
            console.error("Erreur lors de la mise à jour des données :", error);
        } finally {
            if (connection) await connection.end();
        }
    }

    async function updateFournisseur(fournisseur_id, nom) {
        let connection;
        try {
            connection = await mysql.createConnection(dbConfig);
            console.log("Connecté à la base de données.");
    
            await connection.execute(
                `UPDATE Client nom=?
                 WHERE id = ?`,
                [nom, fournisseur_id] 
            );
    
            console.log(`Fournisseur mises à jour ! ID: ${fournisseur_id}`);
        } catch (error) {
            console.error("Erreur lors de la mise à jour des données :", error);
        } finally {
            if (connection) await connection.end();
        }
    }

    async function updateFournisseur(categorie_id, nom) {
        let connection;
        try {
            connection = await mysql.createConnection(dbConfig);
            console.log("Connecté à la base de données.");
    
            await connection.execute(
                `UPDATE Client nom=?
                 WHERE id = ?`,
                [nom, categorie_id] 
            );
    
            console.log(`Fournisseur mises à jour ! ID: ${categorie_id}`);
        } catch (error) {
            console.error("Erreur lors de la mise à jour des données :", error);
        } finally {
            if (connection) await connection.end();
        }
    }

    async function updateProduit(id_produit, reference, quantite, prix_unitaire, id_f, id_c) {
        let connection;
        try {
            connection = await mysql.createConnection(dbConfig);
            console.log("Connecté à la base de données.");
    
            await connection.execute(
                `UPDATE Client reference= ?, quantite= ?, prix_unitaire= ?, id_f= ?, id_c= ?
                 WHERE id = ?`,
                [reference, quantite, prix_unitaire, id_f, id_c, id_produit] 
            );
    
            console.log(`Produit mis à jour ! ID: ${categorie_id}`);
        } catch (error) {
            console.error("Erreur lors de la mise à jour des données :", error);
        } finally {
            if (connection) await connection.end();
        }
    }


    await addClient("Bhardwaj", "Manan", "29rue", "Aulnay", 93600);
    await addCategorie("Pull");
    await addCommande(220,1);
    await addFournisseur("Loewe");
    await addProduit("101",1,220,1,1);
    await addLigneCommande(1,1);
})();