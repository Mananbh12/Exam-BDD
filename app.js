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
        console.error('Erreur lors de l\'initialisation de la base de données :', err);
        process.exit(1);
    }
};

initDB().then(connection => {

    app.post('/Client', async (req, res) => {
        const { nom, prenom, ville, adresse, code_postal } = req.body;
        const sql = 'INSERT INTO Client (nom, prenom, ville, adresse, code_postal) VALUES (?, ?, ?, ?, ?)';
        await connection.query(sql, [nom, prenom, ville, adresse, code_postal]);
        res.status(201).json({ message: 'Client ajouté avec succès' });
    });

    app.get('/Client', async (req, res) => {
        const [result] = await connection.query('SELECT * FROM Client');
        res.json(result);
    });

    app.put('/Client/:id', async (req, res) => {
        const { nom, prenom, ville, adresse, code_postal } = req.body;
        const sql = `UPDATE Client nom=?, prenom=?, ville=?, adresse=?, code_postal=?
                 WHERE id = ?`
        await connection.query(sql, [nom, prenom, ville, adresse, code_postal, client_id]);
        res.json({ message: 'Client mis à jour avec succès' });
    });

    app.delete('/Client/:id', async (req, res) => {
        await connection.query('DELETE FROM Client WHERE id_client = ?', [req.params.id]);
        res.json({ message: 'Client supprimé avec succès' });
    });

    app.post('/Categorie', async (req, res) => {
        const {nom} = req.body;
        const sql = 'INSERT INTO Categorie (nom) VALUES (?)';
        await connection.query(sql, [nom]);
        res.status(201).json({ message: 'Catégorie ajoutée avec succès' });
    });

    app.get('/Categorie', async (req, res) => {
        const [result] = await connection.query('SELECT * FROM Categorie');
        res.json(result);
    });

    app.put('/Categorie/:id', async (req, res) => {
        const {nom} = req.body;
        const sql = `UPDATE Categorie nom=?
                 WHERE id = ?`
        await connection.query(sql, [nom, categorie_id]);
        res.json({ message: 'Categorie mis à jour avec succès' });
    });

    app.delete('/Categorie/:id', async (req, res) => {
        await connection.query('DELETE FROM Categorie WHERE id_categorie = ?', [req.params.id]);
        res.json({ message: 'Categorie supprimée avec succès' });
    });

    app.post('/Fournisseur', async (req, res) => {
        const {nom} = req.body;
        const sql = 'INSERT INTO Fournisseur (nom) VALUES (?)';
        await connection.query(sql, [nom]);
        res.status(201).json({ message: 'Fournisseur ajouté avec succès' });
    });

    app.get('/Fournisseur', async (req, res) => {
        const [result] = await connection.query('SELECT * FROM Fournisseur');
        res.json(result);
    });

    app.put('/Fournisseur/:id', async (req, res) => {
        const {nom} = req.body;
        const sql = `UPDATE Fournisseur nom=?
                 WHERE id = ?`
        await connection.query(sql, [nom, categorie_id]);
        res.json({ message: 'Fournisseur mis à jour avec succès' });
    });

    app.delete('/Fournisseur/:id', async (req, res) => {
        await connection.query('DELETE FROM Fournisseur WHERE id_fournisseur = ?', [req.params.id]);
        res.json({ message: 'Fournisseur supprimé avec succès' });
    });

    app.post('/Produit', async (req, res) => {
        const {ref, quantite, prix_unitaire, id_f, id_c} = req.body;
        const sql = 'INSERT INTO Produit (ref, quantite, prix_unitaire, id_f, id_c) VALUES (?, ?, ?, ?, ?)';
        await connection.query(sql, [ref, quantite, prix_unitaire, id_f, id_c]);
        res.status(201).json({ message: 'Produit ajouté avec succès' });
    });

    app.get('/Produit', async (req, res) => {
        const [result] = await connection.query('SELECT * FROM Produit');
        res.json(result);
    });

    app.put('/Produit/:id', async (req, res) => {
        const {nom} = req.body;
        const sql = `UPDATE Produit ref= ?, quantite= ?, prix_unitaire= ?, id_f= ?, id_c= ?
                 WHERE id = ?`
        await connection.query(sql, [ref, quantite, prix_unitaire, id_f, id_c, produit_id]);
        res.json({ message: 'Produit mis à jour avec succès' });
    });

    app.delete('/Produit/:id', async (req, res) => {
        await connection.query('DELETE FROM Produit WHERE id_produit = ?', [req.params.id]);
        res.json({ message: 'Produit supprimé avec succès' });
    });

    app.post('/Commande', async (req, res) => {
        const {prix_total, id_c} = req.body;
        const sql = 'INSERT INTO Commande (prix_total, id_c) VALUES (?, ?)';
        await connection.query(sql, [prix_total, id_c]);
        res.status(201).json({ message: 'Commande ajoutée avec succès' });
    });

    app.get('/Commande', async (req, res) => {
        const [result] = await connection.query('SELECT * FROM Commande');
        res.json(result);
    });

    app.put('/Commande/:id', async (req, res) => {
        const {prix_total, id_c} = req.body;
        const sql = `UPDATE Commande prix_total=?, id_c=?
                 WHERE id = ?`
        await connection.query(sql, [prix_total, id_c, id_commande]);
        res.json({ message: 'Commande mis à jour avec succès' });
    });

    app.delete('/Commande/:id', async (req, res) => {
        await connection.query('DELETE FROM Commande WHERE id_commande = ?', [req.params.id]);
        res.json({ message: 'Commande supprimé avec succès' });
    });

    app.post('/Ligne_Commande', async (req, res) => {
        const {id_p, id_c} = req.body;
        const sql = 'INSERT INTO Ligne_Commande (id_p, id_c) VALUES (?, ?)';
        await connection.query(sql, [id_p, id_c]);
        res.status(201).json({ message: 'Ligne_Commande ajoutée avec succès' });
    });

    app.get('/Ligne_Commande', async (req, res) => {
        const [result] = await connection.query('SELECT * FROM Ligne_Commande');
        res.json(result);
    });

    app.put('/Ligne_Commande/:id', async (req, res) => {
        const {id_p, id_c} = req.body;
        const sql = `UPDATE Ligne_Commande prix_total=?, id_c=?
                 WHERE id = ?`
        await connection.query(sql, [id_p, id_c, id_ligne]);
        res.json({ message: 'Ligne_Commande mis à jour avec succès' });
    });

    app.delete('/Ligne_Commande/:id', async (req, res) => {
        await connection.query('DELETE FROM Ligne_Commande WHERE id_ligne = ?', [req.params.id]);
        res.json({ message: 'Ligne_Commande supprimé avec succès' });
    });



    const PORT = 3000;
    app.listen(PORT, () => {
        console.log(`Serveur démarré sur le port ${PORT}`);
    });


})