-- Drop menu_items if it exits and create it.
DROP TABLE IF EXISTS menu_items CASCADE;

CREATE TABLE menu_items (
  id SERIAL PRIMARY KEY NOT NULL,
  name TEXT NOT NULL,
  price SMALLINT NOT NULL,
  description TEXT NOT NULL,
  cook_time_millisec INTEGER NOT NULL,
  image_url TEXT NOT NULL
);
