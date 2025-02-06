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
        const {ref, quantite_stock, prix_unitaire, id_f, id_c} = req.body;
        const sql = 'INSERT INTO Produit (ref, quantite_stock, prix_unitaire, id_f, id_c) VALUES (?, ?, ?, ?, ?)';
        await connection.query(sql, [ref, quantite_stock, prix_unitaire, id_f, id_c]);
        res.status(201).json({ message: 'Produit ajouté avec succès' });
    });

    app.get('/Produit', async (req, res) => {
        const [result] = await connection.query('SELECT * FROM Produit');
        res.json(result);
    });

    app.put('/Produit/:id', async (req, res) => {
        const {nom} = req.body;
        const sql = `UPDATE Produit ref= ?, quantite_stock= ?, prix_unitaire= ?, id_f= ?, id_c= ?
                 WHERE id = ?`
        await connection.query(sql, [ref, quantite_stock, prix_unitaire, id_f, id_c, produit_id]);
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
        try {
            const { id_p, id_c, quantite } = req.body;
    
            if (!id_p || !id_c || !quantite) {
                return res.status(400).json({ error: "Les champs 'id_p', 'id_c' et 'quantite' sont requis." });
            }
    
            // Vérifier si le stock est suffisant
            const stockQuery = `SELECT quantite_stock FROM Produit WHERE id_produit = ?`;
            const [stockResult] = await connection.query(stockQuery, [id_p]);
    
            if (stockResult.length === 0) {
                return res.status(404).json({ error: "Produit non trouvé." });
            }
    
            const stockDispo = stockResult[0].quantite;
            
            if (stockDispo < quantite) {
                return res.status(400).json({ error: "Stock insuffisant pour ce produit." });
            }
    
            // Ajouter la ligne de commande
            const insertQuery = `INSERT INTO Ligne_Commande (id_p, id_c, quantite) VALUES (?, ?, ?)`;
            await connection.query(insertQuery, [id_p, id_c, quantite]);
    
            // Décrémenter le stock du produit
            const updateStockQuery = `UPDATE Produit SET quantite_stock = quantite_stock - ? WHERE id_produit = ?`;
            await connection.query(updateStockQuery, [quantite, id_p]);
    
            res.status(201).json({ message: 'Commande ajoutée avec succès, stock mis à jour.' });
    
        } catch (error) {
            res.status(500).json({ error: "Erreur serveur", details: error.message });
        }
    });
    
    

    app.get('/Ligne_Commande', async (req, res) => {
        const [result] = await connection.query('SELECT * FROM Ligne_Commande');
        res.json(result);
    });

    app.put('/Ligne_Commande/:id', async (req, res) => {
        try {
            const { id_p, id_c, quantite } = req.body;
            const id_ligne = req.params.id;
    
            if (!id_p || !id_c || !quantite) {
                return res.status(400).json({ error: "Les champs 'id_p', 'id_c' et 'quantite' sont requis." });
            }
    
            const sql = `UPDATE Ligne_Commande 
                         SET id_p = ?, id_c = ?, quantite = ?
                         WHERE id_ligne = ?`;
            const [result] = await connection.query(sql, [id_p, id_c, quantite, id_ligne]);
    
            if (result.affectedRows === 0) {
                return res.status(404).json({ error: "Aucune Ligne_Commande trouvée avec cet ID." });
            }
    
            res.json({ message: 'Ligne_Commande mise à jour avec succès' });
    
        } catch (error) {
            res.status(500).json({ error: "Erreur serveur", details: error.message });
        }
    });
    

    app.delete('/Ligne_Commande/:id', async (req, res) => {
        try {
            const id_ligne = req.params.id;
    
            // Récupérer les informations de la ligne de commande
            const getCommandeQuery = `SELECT id_p, quantite FROM Ligne_Commande WHERE id_ligne = ?`;
            const [commandeResult] = await connection.query(getCommandeQuery, [id_ligne]);
    
            if (commandeResult.length === 0) {
                return res.status(404).json({ error: "Ligne de commande non trouvée." });
            }
    
            const { id_p, quantite } = commandeResult[0];
    
            // Supprimer la ligne de commande
            const deleteQuery = `DELETE FROM Ligne_Commande WHERE id_ligne = ?`;
            await connection.query(deleteQuery, [id_ligne]);
    
            // Réapprovisionner le stock du produit
            const updateStockQuery = `UPDATE Produit SET quantite_stock = quantite_stock + ? WHERE id_produit = ?`;
            await connection.query(updateStockQuery, [quantite, id_p]);
    
            res.json({ message: "Commande annulée et stock restauré." });
    
        } catch (error) {
            res.status(500).json({ error: "Erreur serveur", details: error.message });
        }
    });
    

    // lister les commandes avec leurs lignes
    app.get('/DetailCommandeLignes', async (req, res) => {
        const [result] = await connection.query(`
            SELECT Commande.*, Ligne_Commande.*, Produit.*
            FROM Commande
            JOIN Ligne_Commande ON Commande.id_commande = Ligne_Commande.id_c
            JOIN Produit ON Ligne_Commande.id_p = Produit.id_produit
        `);
            res.json(result);
        });
    
    
    app.get('/ListeClientCommandes', async (req, res) => {
        const [result] = await connection.query(`
            SELECT Client.*, Commande.*
            FROM Commande
            JOIN Client ON Commande.id_c = Client.id_client;
        `);
            res.json(result);
        });

    app.get('/ListeProduitCategorie', async (req, res) => {
        const [result] = await connection.query(`
            SELECT Categorie.*, Produit.*
            FROM Produit
            JOIN Categorie ON Produit.id_c = Categorie.id_categorie;
        `);
            res.json(result);
        });

    app.get('/ListeProduitFournisseur', async (req, res) => {
        const [result] = await connection.query(`
            SELECT Fournisseur.*, Produit.*
            FROM Produit
            JOIN Fournisseur ON Produit.id_f = Fournisseur.id_fournisseur;
        `);
            res.json(result);
        });

        // Fonctionnalités avancées de la V2

    app.get('/commande_annee', async (req, res) => {
        try {
            const { start, end } = req.query; 
    
            if (!start || !end) {
                return res.status(400).json({ error: "Les paramètres 'start' et 'end' sont requis." });
            }
    
            const query = `
                SELECT * FROM Commande 
                WHERE date_commande BETWEEN ? AND ?
            `;
    
            const [result] = await connection.query(query, [start, end]); 
            res.json(result);
            
        } catch (error) {
            res.status(500).json({ error: "Erreur serveur", details: error.message });
        }
    });

    app.get('/client/:id/commandes', async (req, res) => {
        try {
            const clientId = req.params.id;
            
            if (isNaN(clientId)) {
                return res.status(400).json({ error: "L'ID du client doit être un nombre." });
            }
    
            const query = 'SELECT * FROM Commande WHERE id_c = ?';
            const [result] = await connection.execute(query, [clientId]);
    
            res.json(result);
        } catch (error) {
            res.status(500).json({ error: "Erreur serveur", details: error.message });
        }
    });
    
    

    app.get('/produit/:id/commandes', async (req, res) => {
        try {
            const produitId = req.params.id;
    
            if (isNaN(produitId)) {
                return res.status(400).json({ error: "L'ID du produit doit être un nombre." });
            }
    
            const query = `
                SELECT Commande.* 
                FROM Commande
                JOIN Ligne_Commande ON Commande.id_commande = Ligne_Commande.id_c
                WHERE Ligne_Commande.id_p = ?
            `;
    
            const [result] = await connection.execute(query, [produitId]);
    
            res.json(result);
    
        } catch (error) {
            console.error("Erreur SQL :", error);
            res.status(500).json({ error: "Erreur serveur", details: error.message });
        }
    });

    //bien qu'il y ai de la concaténation, l'utilisation de requête paramétrées rend impossible l'injection

    app.get('/recherche', async (req, res) => {
        try {
            const { id_client, start, end, statut, id_produit } = req.query;
    
            let query = `
                SELECT Commande.* FROM Commande
                LEFT JOIN Ligne_Commande ON Commande.id_commande = Ligne_Commande.id_c
                LEFT JOIN Produit ON Ligne_Commande.id_p = Produit.id_produit
                WHERE 1=1
            `;
            
            const params = [];
    
            if (id_client) {
                query += " AND Commande.id_c = ?";
                params.push(id_client);
            }
    
            if (start && end) {
                query += " AND Commande.date_commande BETWEEN ? AND ?";
                params.push(start, end);
            }
    
            if (statut) {
                query += " AND Commande.statut = ?";
                params.push(statut);
            }
    
            if (id_produit) {
                query += " AND Produit.id_produit = ?";
                params.push(id_produit);
            }
    
            const [result] = await connection.execute(query, params);
    
            res.json(result);
    
        } catch (error) {
            console.error("Erreur SQL :", error);
            res.status(500).json({ error: "Erreur serveur", details: error.message });
        }
    });
    
    app.get('/stats/produits-populaires', async (req, res) => {
    try {
        const query = `
            SELECT 
                Produit.id_produit, 
                Produit.ref, 
                COUNT(Ligne_Commande.id_p) AS nombre_vendus
            FROM Ligne_Commande
            JOIN Produit ON Ligne_Commande.id_p = Produit.id_produit
            GROUP BY Produit.id_produit, Produit.ref
            ORDER BY nombre_vendus DESC
            LIMIT 5;
        `;

        const [result] = await connection.execute(query);
        res.json(result);
    } catch (error) {
        res.status(500).json({ error: "Erreur serveur", details: error.message });
    }
    });


    app.get('/stats/ventes', async (req, res) => {
        try {
            const { start, end } = req.query;
    
            if (!start || !end) {
                return res.status(400).json({ error: "Les paramètres 'start' et 'end' sont requis." });
            }
    
            const query = `
                SELECT SUM(prix_total) AS total_ventes
                FROM Commande
                WHERE date_commande BETWEEN ? AND ?;
            `;
    
            const [result] = await connection.execute(query, [start, end]);
            res.json(result[0]); // On retourne un objet { total_ventes: X }
    
        } catch (error) {
            res.status(500).json({ error: "Erreur serveur", details: error.message });
        }
    });
    

    




    const PORT = 3000;
    app.listen(PORT, () => {
        console.log(`Serveur démarré sur le port ${PORT}`);
    });


})