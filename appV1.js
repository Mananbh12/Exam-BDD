const express = require('express');
const mysql = require('mysql2/promise');
const fs = require('fs');

const app = express();
app.use(express.json());

const dbConfig = {
    host: 'localhost',
    user: 'root',
    password: 'rootroot',
    multipleStatements: true
};

const executeSQLFile = async (connection, filePath) => {
    const sql = fs.readFileSync(filePath, 'utf8');
    await connection.query(sql);
    console.log(`${filePath} exécuté avec succès`);
};

const initDB = async () => {
    try {
        const connection = await mysql.createConnection(dbConfig);
        console.log('Connexion à MySQL réussie');

        await executeSQLFile(connection, 'db.sql');
        await connection.changeUser({ database: 'avionpapier' });
        await executeSQLFile(connection, 'data.sql');

        console.log('Base de données initialisée avec succès');
        return connection;
    } catch (err) {
        console.error("Erreur lors de l'initialisation de la base de données :", err);
        process.exit(1);
    }
};

initDB().then(connection => {

    // Client
    app.post('/Client', async (req, res) => {
        const { nom, prenom, ville, adresse, code_postal } = req.body;
        const sql = "INSERT INTO Client (nom, prenom, ville, adresse, code_postal) VALUES ('" + nom + "', '" + prenom + "', '" + ville + "', '" + adresse + "', '" + code_postal + "')";
        await connection.query(sql);
        res.status(201).json({ message: 'Client ajouté avec succès' });
    });

    app.get('/Client', async (req, res) => {
        const sql = "SELECT * FROM Client";
        const [result] = await connection.query(sql);
        res.json(result);
    });

    app.put('/Client/:id', async (req, res) => {
        const { nom, prenom, ville, adresse, code_postal } = req.body;
        const sql = "UPDATE Client SET nom='" + nom + "', prenom='" + prenom + "', ville='" + ville + "', adresse='" + adresse + "', code_postal='" + code_postal + "' WHERE id_client = " + req.params.id;
        await connection.query(sql);
        res.json({ message: 'Client mis à jour avec succès' });
    });

    app.delete('/Client/:id', async (req, res) => {
        const sql = "DELETE FROM Client WHERE id_client = " + req.params.id;
        await connection.query(sql);
        res.json({ message: 'Client supprimé avec succès' });
    });

    app.post('/Fournisseur', async (req, res) => {
        const { nom } = req.body;
        const sql = "INSERT INTO Fournisseur (nom) VALUES ('" + nom + "')";
        await connection.query(sql);
        res.status(201).json({ message: 'Fournisseur ajouté avec succès' });
    });

    app.get('/Fournisseur', async (req, res) => {
        const sql = "SELECT * FROM Fournisseur";
        const [result] = await connection.query(sql);
        res.json(result);
    });

    app.delete('/Fournisseur/:id', async (req, res) => {
        const sql = "DELETE FROM Fournisseur WHERE id_fournisseur = " + req.params.id;
        await connection.query(sql);
        res.json({ message: 'Fournisseur supprimé avec succès' });
    });

    app.post('/Categorie', async (req, res) => {
        const { nom } = req.body;
        const sql = "INSERT INTO Categorie (nom) VALUES ('" + nom + "')";
        await connection.query(sql);
        res.status(201).json({ message: 'Catégorie ajoutée avec succès' });
    });

    app.get('/Categorie', async (req, res) => {
        const sql = "SELECT * FROM Categorie";
        const [result] = await connection.query(sql);
        res.json(result);
    });

    app.delete('/Categorie/:id', async (req, res) => {
        const sql = "DELETE FROM Categorie WHERE id_categorie = " + req.params.id;
        await connection.query(sql);
        res.json({ message: 'Catégorie supprimée avec succès' });
    });

    app.post('/Produit', async (req, res) => {
        const { ref, quantite, prix_unitaire, id_f, id_c } = req.body;
        const sql = "INSERT INTO Produit (ref, quantite, prix_unitaire, id_f, id_c) VALUES ('" + ref + "', " + quantite + ", " + prix_unitaire + ", " + id_f + ", " + id_c + ")";
        await connection.query(sql);
        res.status(201).json({ message: 'Produit ajouté avec succès' });
    });

    app.get('/Produit', async (req, res) => {
        const sql = "SELECT * FROM Produit";
        const [result] = await connection.query(sql);
        res.json(result);
    });

    app.delete('/Produit/:id', async (req, res) => {
        const sql = "DELETE FROM Produit WHERE id_produit = " + req.params.id;
        await connection.query(sql);
        res.json({ message: 'Produit supprimé avec succès' });
    });

    app.post('/Commande', async (req, res) => {
        const { prix_total, id_c } = req.body;
        const sql = "INSERT INTO Commande (prix_total, id_c) VALUES (" + prix_total + ", " + id_c + ")";
        await connection.query(sql);
        res.status(201).json({ message: 'Commande ajoutée avec succès' });
    });

    app.get('/Commande', async (req, res) => {
        const sql = "SELECT * FROM Commande";
        const [result] = await connection.query(sql);
        res.json(result);
    });

    app.delete('/Commande/:id', async (req, res) => {
        const sql = "DELETE FROM Commande WHERE id_commande = " + req.params.id;
        await connection.query(sql);
        res.json({ message: 'Commande supprimée avec succès' });
    });

    app.get('/DetailCommandeLignes', async (req, res) => {
        const sql = "SELECT Commande.*, Ligne_Commande.*, Produit.* FROM Commande JOIN Ligne_Commande ON Commande.id_commande = Ligne_Commande.id_c JOIN Produit ON Ligne_Commande.id_p = Produit.id_produit";
        const [result] = await connection.query(sql);
        res.json(result);
    });

    app.get('/ListeClientCommandes', async (req, res) => {
        const sql = "SELECT Client.*, Commande.* FROM Commande JOIN Client ON Commande.id_c = Client.id_client";
        const [result] = await connection.query(sql);
        res.json(result);
    });

    app.get('/ListeProduitCategorie', async (req, res) => {
        const sql = "SELECT Categorie.*, Produit.* FROM Produit JOIN Categorie ON Produit.id_c = Categorie.id_categorie";
        const [result] = await connection.query(sql);
        res.json(result);
    });

    app.get('/ListeProduitFournisseur', async (req, res) => {
        const sql = "SELECT Fournisseur.*, Produit.* FROM Produit JOIN Fournisseur ON Produit.id_f = Fournisseur.id_fournisseur";
        const [result] = await connection.query(sql);
        res.json(result);
    });

    const PORT = 3000;
    app.listen(PORT, () => {
        console.log(`Serveur démarré sur le port ${PORT}`);
    });

});
