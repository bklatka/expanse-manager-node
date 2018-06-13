module.exports = (app, db) => {
  app.post('/add', (req, res) => {
    const expense = {
      name: req.body.name,
      type: req.body.type,
      value: req.body.value
    };
    db.collection('expenses').insert(expense, (err, result) => {
      if (err) {
        res.send({ error: 'An error has occurred' });
      } else {
        res.send(result.ops[0]);
      }
    });
  });
};
