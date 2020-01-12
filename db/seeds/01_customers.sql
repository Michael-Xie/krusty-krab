-- Users table seeds here (Example)
INSERT INTO customers (username, password, cell_number) 
VALUES ('Alice', '123', '647-332-2233');

INSERT INTO customers (username, password, cell_number) 
VALUES ('Bobby', '123', '905-112-9821');

INSERT INTO customers (username, password, cell_number) 
VALUES ('Ricky', '123', '416-552-2323');

INSERT INTO customers (username, password, cell_number) 
VALUES ('Alison', '123', '905-905-4322');

INSERT INTO customers (username, password, cell_number) 
VALUES ('Terrance', '123', '646-555-5011');

INSERT INTO customers (username, password, cell_number) 
VALUES ('Vanessa', '123', '647-111-2222');

INSERT INTO customers (username, password, cell_number) 
VALUES ('Brandon', '123', '416-020-1122');

SELECT pg_catalog.setval('public.customers_id_seq', 7, true)
