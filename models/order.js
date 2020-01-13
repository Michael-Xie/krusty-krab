module.exports = (db) => {
  const getMenuItems = () =>
    db.query(`
    SELECT * FROM menu_items;
    `)
    .then(result => result.rows)
    .catch(err => console.log(err));

  return { getMenuItems };
}
