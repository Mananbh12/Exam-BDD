const mysql = require("mysql2/promise");
const fs = require("fs");

// Configuration de la base de données
const dbConfig = {
    host: "localhost",
    user: "root",
    password: "rootroot",
    multipleStatements: true,
};

// Fonction pour initialiser la base de données
async function initializeDatabase() {
    try {
        const connection = await mysql.createConnection(dbConfig);

        const schema = fs.readFileSync("db.sql", "utf8");
        await connection.query(schema);
        console.log("Base de données initialisée avec succès !");
        await connection.end();
    } catch (error) {
        console.error("Erreur lors de l'initialisation de la base :", error);
    }
}

module.exports = { initializeDatabase };
