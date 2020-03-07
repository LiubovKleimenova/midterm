DROP TABLE IF EXISTS cats CASCADE;
CREATE TABLE cats (
  id SERIAL PRIMARY KEY NOT NULL,
  owner_id INTEGER REFERENCES users(id) ON DELETE CASCADE,
  name VARCHAR(255) NOT NULL,
  description TEXT,
  main_photo_url VARCHAR(255) NOT NULL,
  fee INTEGER NOT NULL DEFAULT 0,
  birthdate DATE,
  region VARCHAR(255),
  size VARCHAR(255),
  species VARCHAR(255),
  is_available BOOLEAN DEFAULT TRUE
);