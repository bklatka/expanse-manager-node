const ObjectId = require('mongodb').ObjectId;

module.exports = (app, db) => {
  app.post('/expenses', (req, res) => {
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

  app.delete('/expenses/:id', (req, res) => {
    const id = req.params.id;
    const details = { _id: new ObjectId(id) };
    db.collection('expenses').remove(details, (err, item) => {
      if (err) {
        res.send({ error: 'Error removing object' });
      } else {
        res.send(item);
      }
    });
  });

  app.put('/expenses/:id', (req, res) => {
    const id = req.params.id;
    const details = { _id: new ObjectId(id) };
    const updated = { name: res.body.name, value: res.body.value };
    db.collection('expenses').update(details, updated, (err, item) => {
      if (err) {
        res.send({ error: 'Error occured' });
      } else {
        res.send(item);
      }
    });
  });

  app.get('/expenses', (req, res) => {
    db.collection('expenses')
      .find({})
      .toArray((err, list) => {
        if (err) {
          res.send({ error: 'Error getting data' });
        } else {
          res.send(list);
        }
      });
  });

  app.get('/expenses/:id', (req, res) => {
    const id = req.params.id;
    const details = { _id: new ObjectId(id) };
    db.collection('expenses').findOne(details, (err, item) => {
      if (err) {
        res.send({ error: 'An error has occurred' });
      } else {
        res.send(item);
      }
    });
  });
};
