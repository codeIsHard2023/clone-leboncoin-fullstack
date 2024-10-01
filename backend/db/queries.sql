DROP TABLE ad
DROP TABLE ad_tag_tag
DROP TABLE category

PRAGMA foreign_keys = ON;

CREATE TABLE category (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    name TEXT NOT NULL
)

CREATE TABLE ad (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    title TEXT NOT NULL,
	description TEXT,
	owner TEXT NOT NULL,
	price INTEGER,
    picture TEXT,
    location TEXT,
    category_id INTEGER NOT NULL, 
	createdAt NUMERIC,
    FOREIGN KEY (category_id) REFERENCES category(id)
)

INSERT INTO category (name) VALUES ('vêtement'), ('vélos'), ('autres')


INSERT INTO ad (title, description, owner, price, picture, location, category_id, createdAt) VALUES
-- Vêtements
('T-shirt en coton', 'T-shirt confortable en 100% coton, taille M.', 'Alice Dupont', 1500, 'tshirt.jpg', 'Paris', 1, '2023-09-01 10:00:00'),
('Jean slim', 'Jean slim taille 38, très peu porté.', 'Jean Martin', 2500, 'jean.jpg', 'Lyon', 1, '2023-09-05 14:30:00'),
('Robe d’été', 'Robe légère idéale pour l’été, taille S.', 'Marie Curie', 3000, 'robe.jpg', 'Marseille', 1, '2023-08-15 09:45:00'),
('Veste en cuir', 'Veste en cuir véritable, taille L.', 'Paul Durand', 12000, 'veste.jpg', 'Bordeaux', 1, '2023-09-10 16:20:00'),
('Pull en laine', 'Pull en laine doux, taille M, couleur bleu.', 'Sophie Lemaire', 4000, 'pull.jpg', 'Toulouse', 1, '2023-08-25 12:00:00'),
('Short de bain', 'Short de bain neuf, taille L.', 'Lucas Simon', 2000, 'short.jpg', 'Nice', 1, '2023-08-30 11:15:00'),
('Chaussures de sport', 'Chaussures de sport taille 42, très bon état.', 'Nathalie Moreau', 6000, 'chaussures.jpg', 'Lille', 1, '2023-09-12 13:30:00'),
('Ceinture en cuir', 'Ceinture en cuir marron, taille ajustable.', 'Julien Bernard', 2500, 'ceinture.jpg', 'Strasbourg', 1, '2023-09-15 15:00:00'),
('Blouson léger', 'Blouson léger pour le printemps, taille S.', 'Emma Lefevre', 3500, 'blouson.jpg', 'Nantes', 1, '2023-09-20 18:45:00'),
('Écharpe en soie', 'Écharpe en soie, motif floral, comme neuve.', 'Claire Petit', 4500, 'echarpe.jpg', 'Montpellier', 1, '2023-09-25 17:00:00'),

-- Vélos
('Vélo de route', 'Vélo de route en très bon état, taille M.', 'Thomas Girard', 30000, 'velo_route.jpg', 'Paris', 2, '2023-09-01 10:30:00'),
('Vélo tout terrain', 'VTT avec suspensions, idéal pour les randonnées.', 'Laura Petit', 25000, 'vtt.jpg', 'Lyon', 2, '2023-09-04 14:00:00'),
('Vélo pliant', 'Vélo pliant, facile à transporter, couleur rouge.', 'Eric Lefevre', 15000, 'velo_pliant.jpg', 'Marseille', 2, '2023-08-20 09:15:00'),
('Vélo enfant', 'Vélo pour enfant, 20 pouces, très bon état.', 'Alice Laurent', 8000, 'velo_enfant.jpg', 'Bordeaux', 2, '2023-09-08 13:45:00'),
('Vélo électrique', 'Vélo électrique avec batterie neuve, très peu utilisé.', 'Paul Simon', 60000, 'velo_electrique.jpg', 'Toulouse', 2, '2023-09-11 12:30:00'),
('Vélo de ville', 'Vélo de ville avec porte-bagages, couleur bleu.', 'Sophie Durand', 22000, 'velo_ville.jpg', 'Nice', 2, '2023-09-14 11:00:00'),
('Vélo vintage', 'Vélo vintage des années 70, à retaper.', 'Julien Martin', 10000, 'velo_vintage.jpg', 'Lille', 2, '2023-09-17 16:50:00'),
('Casque de vélo', 'Casque de vélo en taille M, neuf.', 'Claire Dupont', 5000, 'casque.jpg', 'Strasbourg', 2, '2023-09-19 10:20:00'),
('Accessoires vélo', 'Pack d’accessoires pour vélo, état neuf.', 'Lucas Moreau', 7000, 'accessoires.jpg', 'Nantes', 2, '2023-09-22 14:40:00'),
('Vélos de course', 'Ensemble de 3 vélos de course à vendre, excellent état.', 'Emma Lemaire', 90000, 'velos_course.jpg', 'Montpellier', 2, '2023-09-26 15:10:00'),

-- Autres
('Console de jeux', 'Console de jeux dernière génération avec 2 manettes.', 'Marc Bernard', 25000, 'console.jpg', 'Paris', 3, '2023-08-30 12:00:00'),
('Table de salon', 'Table de salon en bois, style scandinave.', 'Nathalie Simon', 15000, 'table_salon.jpg', 'Lyon', 3, '2023-09-02 13:15:00'),
('Téléviseur LED', 'Téléviseur LED 55 pouces, presque neuf.', 'Julien Moreau', 35000, 'television.jpg', 'Marseille', 3, '2023-09-05 14:30:00'),
('Appareil photo', 'Appareil photo reflex avec objectif 18-55 mm.', 'Sophie Girard', 30000, 'appareil_photo.jpg', 'Bordeaux', 3, '2023-09-10 10:45:00'),
('Bicyclettes pour enfants', 'Pack de 2 bicyclettes pour enfants, état parfait.', 'Laura Dupont', 12000, 'bicyclettes.jpg', 'Toulouse', 3, '2023-09-12 15:00:00'),
('Jeux de société', 'Collection de jeux de société, comme neufs.', 'Eric Lefevre', 8000, 'jeux_societe.jpg', 'Nice', 3, '2023-09-15 11:30:00'),
('Clé USB 128 Go', 'Clé USB de 128 Go, à peine utilisée.', 'Claire Petit', 2000, 'cle_usb.jpg', 'Lille', 3, '2023-09-18 14:00:00'),
('Grille-pain', 'Grille-pain en excellent état, avec fonction bagel.', 'Marc Lemaire', 4000, 'grille_pain.jpg', 'Strasbourg', 3, '2023-09-20 09:45:00'),
('Cafetière', 'Cafetière électrique avec broyeur à café.', 'Alice Lefevre', 15000, 'cafetière.jpg', 'Nantes', 3, '2023-09-24 12:30:00'),
('Bureau en bois', 'Bureau en bois massif, parfait pour le télétravail.', 'Paul Bernard', 25000, 'bureau.jpg', 'Montpellier', 3, '2023-09-26 16:10:00');


SELECT * FROM ad

SELECT * FROM category

SELECT * FROM tag

SELECT * FROM ad_tags_tag

SELECT * FROM ad INNER JOIN category ON category.id = ad.category_id WHERE category.name = 'vêtement'

SELECT * FROM ad INNER JOIN category ON category.id = ad.category_id WHERE category.name = 'vélos'

SELECT price FROM ad INNER JOIN category ON category.id = ad.category_id WHERE category.name = 'autres'

SELECT * FROM ad INNER JOIN category ON category.id = ad.category_id WHERE category.name = 'vétements' OR category.name = 'vélos'

SELECT * FROM ad INNER JOIN category ON category.id = ad.category_id WHERE category.name IN ('vêtement','vélos')

SELECT AVG(price) FROM ad INNER JOIN category ON category.id = ad.category_id WHERE category.name = 'autres'

SELECT * FROM ad INNER JOIN category ON category.id = ad.category_id WHERE category.name LIKE 'v%'

SELECT * FROM ad WHERE location = 'Bordeaux'

SELECT * FROM ad WHERE id = '3'

DELETE FROM ad WHERE createdAt <= '2024-09-05' AND location = 'Bordeaux' 

UPDATE ad SET price = 14000 WHERE id=34

SELECT AVG(price)FROM ad GROUP BY location

SELECT COUNT(*) FROM ad

SELECT * FROM ad ORDER BY price ASC

SELECT AVG(price) FROM ad WHERE location='Paris'

DELETE FROM ad WHERE price < 11000

.tables