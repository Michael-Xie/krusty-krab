-- Insert values into menu_items.
INSERT INTO menu_items (name, price, description, cook_time_millisec, image_url)
VALUES ('Krabby Patty', 125, 'This special burger is a staple of the Krusty Krab. In fact, it is so delicious that we cannot list the contents of the burger for fear that the special formula will fall into evil hands!', 10000, 'https://vignette.wikia.nocookie.net/spongebob/images/d/d4/Krabby_Patty_transparentpng.png/revision/latest?cb=20170310181007');

INSERT INTO menu_items (name, price, description, cook_time_millisec, image_url)
VALUES ('Double Krabby Patty', 150, '... temp desc.', 12000, 'blank');

INSERT INTO menu_items (name, price, description, cook_time_millisec, image_url)
VALUES ('Triple Krabby Patty', 200, '... temp desc.', 12000, 'blank');

INSERT INTO menu_items (name, price, description, cook_time_millisec, image_url)
VALUES ('Coral Bits', 125, '... temp desc.', 5000, 'blank');

INSERT INTO menu_items (name, price, description, cook_time_millisec, image_url)
VALUES ('Kelp Rings', 150, '... temp desc.', 8000, 'blank');

INSERT INTO menu_items (name, price, description, cook_time_millisec, image_url)
VALUES ('Krabby Meal', 350, '... temp desc.', 15000, 'blank');

INSERT INTO menu_items (name, price, description, cook_time_millisec, image_url)
VALUES ('Double Krabby Meal', 375, '... temp desc.', 18000, 'blank');

INSERT INTO menu_items (name, price, description, cook_time_millisec, image_url)
VALUES ('Triple Krabby Meal', 400, '... temp desc.', 21000, 'blank');

INSERT INTO menu_items (name, price, description, cook_time_millisec, image_url)
VALUES ('Salty Sea Dog', 125, '... temp desc.', 8000, 'blank');

INSERT INTO menu_items (name, price, description, cook_time_millisec, image_url)
VALUES ('Footlong', 200, '... temp desc.', 8000, 'blank');

INSERT INTO menu_items (name, price, description, cook_time_millisec, image_url)
VALUES ('Sailors Sunrise', 300, '... temp desc.', 15000, 'blank');

INSERT INTO menu_items (name, price, description, cook_time_millisec, image_url)
VALUES ('Golden Loaf', 200, '... temp desc.', 8000, 'blank');

INSERT INTO menu_items (name, price, description, cook_time_millisec, image_url)
VALUES ('Kelp Shake', 200, '... temp desc.', 6000, 'blank');

INSERT INTO menu_items (name, price, description, cook_time_millisec, image_url)
VALUES ('Seafoam Soda', 200, '... temp desc.', 5000, 'blank');
=======
INSERT INTO menu_items (name, price, description, cook_time_millisec, image_url, category_id)
VALUES ('Krabby Patty', 125, 'This special burger is a staple of the Krusty Krab. In fact, it is so delicious that we cannot list the contents of the burger for fear that the special formula will fall into evil hands!', 10000, 'https://vignette.wikia.nocookie.net/spongebob/images/d/d4/Krabby_Patty_transparentpng.png/revision/latest?cb=20170310181007', 1);

INSERT INTO menu_items (name, price, description, cook_time_millisec, image_url, category_id)
VALUES ('Double Krabby Patty', 150, '... temp desc.', 12000, 'blank', 1);

INSERT INTO menu_items (name, price, description, cook_time_millisec, image_url, category_id)
VALUES ('Triple Krabby Patty', 200, '... temp desc.', 12000, 'blank', 1);

INSERT INTO menu_items (name, price, description, cook_time_millisec, image_url, category_id)
VALUES ('Coral Bits', 125, '... temp desc.', 5000, 'blank', 3);

INSERT INTO menu_items (name, price, description, cook_time_millisec, image_url, category_id)
VALUES ('Kelp Rings', 150, '... temp desc.', 8000, 'blank', 3);

INSERT INTO menu_items (name, price, description, cook_time_millisec, image_url, category_id)
VALUES ('Krabby Meal', 350, '... temp desc.', 15000, 'blank', 2);

INSERT INTO menu_items (name, price, description, cook_time_millisec, image_url, category_id)
VALUES ('Double Krabby Meal', 375, '... temp desc.', 18000, 'blank', 2);

INSERT INTO menu_items (name, price, description, cook_time_millisec, image_url, category_id)
VALUES ('Triple Krabby Meal', 400, '... temp desc.', 21000, 'blank', 2);

INSERT INTO menu_items (name, price, description, cook_time_millisec, image_url, category_id)
VALUES ('Salty Sea Dog', 125, '... temp desc.', 8000, 'blank', 5);

INSERT INTO menu_items (name, price, description, cook_time_millisec, image_url, category_id)
VALUES ('Footlong', 200, '... temp desc.', 8000, 'blank', 5);

INSERT INTO menu_items (name, price, description, cook_time_millisec, image_url, category_id)
VALUES ('Sailors Sunrise', 300, '... temp desc.', 15000, 'blank', 5);

INSERT INTO menu_items (name, price, description, cook_time_millisec, image_url, category_id)
VALUES ('Golden Loaf', 200, '... temp desc.', 8000, 'blank', 5);

INSERT INTO menu_items (name, price, description, cook_time_millisec, image_url, category_id)
VALUES ('Kelp Shake', 200, '... temp desc.', 6000, 'blank', 4);

INSERT INTO menu_items (name, price, description, cook_time_millisec, image_url, category_id)
VALUES ('Seafoam Soda', 200, '... temp desc.', 5000, 'blank', 4);
