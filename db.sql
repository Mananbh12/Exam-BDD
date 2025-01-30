DROP DATABASE IF EXISTS avionpapier;
CREATE DATABASE avionpapier;
USE avionpapier;

DROP TABLE IF EXISTS Client;
DROP TABLE IF EXISTS Produit;
DROP TABLE IF EXISTS Fournisseur;
DROP TABLE IF EXISTS Commande;
DROP TABLE IF EXISTS Categorie;

CREATE TABLE Client (
    id_client INT AUTO_INCREMENT PRIMARY KEY,
    nom VARCHAR(50) NOT NULL,
    prenom VARCHAR(50) NOT NULL,
    ville VARCHAR(50) NOT NULL,
    adresse VARCHAR(50) NOT NULL,
    code_postal INT NOT NULL
);



CREATE TABLE Fournisseur (
    id_fournisseur INT AUTO_INCREMENT PRIMARY KEY,
    nom VARCHAR(50) NOT NULL
);


CREATE TABLE Categorie (
    id_categorie INT AUTO_INCREMENT PRIMARY KEY,
    nom VARCHAR(50) NOT NULL
);

CREATE TABLE Produit (
    id_produit INT AUTO_INCREMENT PRIMARY KEY,
    ref VARCHAR(50) NOT NULL,
    quantite INT NOT NULL,
    prix_unitaire INT NOT NULL,
    id_f INT NOT NULL,
	id_c INT NOT NULL,
    FOREIGN KEY (id_f) REFERENCES Fournisseur(id_fournisseur) ON DELETE CASCADE,
    FOREIGN KEY (id_c) REFERENCES Categorie(id_categorie) ON DELETE CASCADE
);




CREATE TABLE Commande (
    id_commande INT AUTO_INCREMENT PRIMARY KEY,
    prix_total INT NOT NULL,
    id_c INT NOT NULL,
    FOREIGN KEY (id_c) REFERENCES Client(id_client) ON DELETE CASCADE
);

CREATE TABLE Ligne_Commande (
	id_ligne INT AUTO_INCREMENT PRIMARY KEY,
	id_p INT NOT NULL,
    id_c INT NOT NULL,
    FOREIGN KEY (id_p) REFERENCES Produit(id_produit) ON DELETE CASCADE,
    FOREIGN KEY (id_c) REFERENCES Commande(id_commande) ON DELETE CASCADE
);



