-- Drop table if table exists.
DROP TABLE IF EXISTS orders CASCADE;

CREATE TABLE orders (
  id SERIAL PRIMARY KEY NOT NULL,
  customer_id INTEGER REFERENCES customers(id),
  status BOOLEAN,
  favourite BOOLEAN
);


