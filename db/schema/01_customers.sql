-- Drop and recreate Users table (Example)
DROP TABLE IF EXISTS customers CASCADE;

CREATE TABLE customers (
  id SERIAL PRIMARY KEY NOT NULL,
  username TEXT NOT NULL,
  passowrd TEXT NOT NULL,
  cell_number TEXT NOT NULL
);

