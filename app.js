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
        await connection.query('DELETE FROM Client WHERE id = ?', [req.params.id]);
        res.json({ message: 'Client supprimé avec succès' });
    });

    const PORT = 3000;
    app.listen(PORT, () => {
        console.log(`Serveur démarré sur le port ${PORT}`);
    });


})