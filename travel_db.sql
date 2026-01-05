
-- 2. KREIRANJE TABELA

-- Agencije (ID je broj koji se sam povećava)
CREATE TABLE agencies (
    id SERIAL PRIMARY KEY,
    name VARCHAR(100) NOT NULL,
    address VARCHAR(255),
    email VARCHAR(100) UNIQUE NOT NULL
);

-- Putovanja (ID je VARCHAR jer koristiš 'TR-01', agencyId mora biti pod navodnicima)
CREATE TABLE trips (
    id VARCHAR(50) PRIMARY KEY, 
    destination VARCHAR(100) NOT NULL,
    description TEXT,
    price DECIMAL(10, 2) NOT NULL,
    image_url TEXT,
    "agencyId" INTEGER REFERENCES agencies(id) ON DELETE CASCADE
);

-- Putnici (ID je VARCHAR, trip_id mora biti VARCHAR jer referencira trips.id)
CREATE TABLE travelers (
    id VARCHAR(50) PRIMARY KEY, 
    name VARCHAR(100) NOT NULL,
    age INTEGER NOT NULL,
    trip_id VARCHAR(50) REFERENCES trips(id) ON DELETE SET NULL
);

-- 3. UBACIVANJE PODATAKA

-- Ubacivanje agencija
INSERT INTO agencies (name, address, email) VALUES 
('Sarajevo Travel', 'Titova 1, Sarajevo', 'info@satravel.ba'),
('Mostar Tours', 'Stari Most bb, Mostar', 'contact@mostartours.ba');

-- Ubacivanje putovanja (Povezujemo sa ID 1 i 2 iz agencija)
-- OBAVEZNO koristiti "agencyId" pod navodnicima ovdje
INSERT INTO trips (id, destination, description, price, image_url, "agencyId") VALUES 
('TR-01', 'Zenica', 'Posjeta čuvenoj zgradi Lamela i centru grada.', 30.00, 'Zenica.jpg', 1),
('TR-02', 'Konjic', 'Stara Ćuprija i posjeta Titovom bunkeru.', 55.00, 'Konjic.jpg', 1),
('TR-03', 'Sarajevo', 'Obilazak Baščaršije i Vrela Bosne.', 40.00, 'Sarajevo.jpg', 2);

-- Ubacivanje putnika (Povezujemo sa ID putovanja 'TR-01', 'TR-02'...)
INSERT INTO travelers (id, name, age, trip_id) VALUES 
('T-01', 'Edin Džeko', 37, 'TR-01'),
('T-02', 'Amra Silajdžić', 36, 'TR-01'),
('T-03', 'Luka Modrić', 38, 'TR-02');