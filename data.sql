

INSERT INTO Client (nom, prenom, ville, adresse, code_postal) VALUES 
('Dupont', 'Jean', 'Paris', '12 Rue de la Paix', '75001'),
('Martin', 'Sophie', 'Lyon', '34 Avenue des Champs', '69003'),
('Durand', 'Paul', 'Marseille', '56 Boulevard du Prado', '13008');


-- Insertion de catégories
INSERT INTO Categorie (nom) VALUES 
('T-Shirts'),
('Pulls'),
('Vestes');

-- Insertion de fournisseurs
INSERT INTO Fournisseur (nom) VALUES 
('Nike'),
('Adidas'),
('Loewe');

-- Insertion de produits
INSERT INTO Produit (ref, quantite_stock, prix_unitaire, id_f, id_c) VALUES 
('TS1001', 10, 30, 1, 1),
('PL2002', 5, 50, 2, 2),
('VS3003', 3, 120, 3, 3);

-- Insertion de commandes
INSERT INTO Commande (prix_total, date_commande, id_c) VALUES 
(300, CURDATE(), 1),
(250, CURDATE(), 2),
(360, CURDATE(), 3);


INSERT INTO Ligne_Commande (id_p, id_c)
VALUES
    (1, 1),  -- Produit 1 associé à Commande 1
    (2, 1),  -- Produit 2 associé à Commande 1
    (3, 2),  -- Produit 3 associé à Commande 2
    (3, 3);  -- Produit 3 associé à Commande 3 (remplaçant le produit 4 par un produit existant)

SELECT * FROM Commande WHERE date_commande BETWEEN '2025-01-01' AND '2025-12-31';


