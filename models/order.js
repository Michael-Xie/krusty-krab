module.exports = (db) => {
  const getMenuItems = () =>
    db.query(`
    SELECT menu_items.*, categories.id as category_id, categories.name as category_name FROM menu_items
      JOIN categories ON category_id = categories.id;
    `)
    .then(result => result.rows)
    .catch(err => console.log(err));

  return { getMenuItems };
}
