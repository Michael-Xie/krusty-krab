DROP TABLE IF EXISTS payment_info CASCADE;

CREATE TABLE payment_info (
  id SERIAL PRIMARY KEY NOT NULL,
  card_name TEXT NOT NULL,
  card_number SMALLINT NOT NULL,
  card_expire TEXT NOT NULL,
  card_csv TEXT NOT NULL
);
