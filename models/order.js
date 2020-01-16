module.exports = (db) => {
  const getMenuItems = () =>
    db.query(`
      SELECT menu_items.*, categories.id as category_id, categories.name as category_name
      FROM menu_items
        JOIN categories ON category_id = categories.id;
    `)
      .then(result => result.rows)

  const getMenuIds = (menu_item) =>
    db.query(`
      SELECT * FROM menu_items WHERE name = $1;
    `, [menu_item])
      .then(result => result.rows[0])

  const postOrderItems = (order_id, menu_item_id, quantity) =>
    db.query(`
      INSERT INTO order_items (order_id, menu_item_id, quantity)
      VALUES ($1, $2, $3)
      RETURNING *;
    `, [order_id, menu_item_id, quantity])
      .then(result => result.rows[0])

  const createOrder = (customer_id) =>
    db.query(`
      INSERT INTO orders (customer_id, status, favourite)
      VALUES ($1, 'f', 'f')
      RETURNING *;
    `, [customer_id])
      .then(result => result.rows[0])

  const getOrderData = (order_id) =>
      db.query(`
        SELECT * 
        FROM order_items
        JOIN menu_items ON menu_items.id = menu_item_id
        JOIN orders ON orders.id = order_id
        JOIN customers ON customers.id = orders.customer_id
        WHERE order_items.order_id = $1;
      `, [order_id])
        .then(result => result.rows)

  const getOrdersInProgress = (customer_id) => 
    db.query(`
      SELECT * FROM orders
      WHERE customer_id = $1
      AND status = 'f';
    `, [customer_id])
      .then(result => result.rows)

  return { getMenuItems, postOrderItems, getMenuIds, createOrder, getOrderData, getOrdersInProgress };
}
