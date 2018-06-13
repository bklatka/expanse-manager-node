const ObjectId = require('mongodb').ObjectId;

const urlSegment = '/budget';
const collectionName = require('../collections').budget;

module.exports = (app, db) => {
  app.post(urlSegment, (req, res) => {
    const expense = {
      name: req.body.name,
      type: req.body.type,
      value: req.body.value
    };
    db.collection(collectionName).insert(expense, (err, result) => {
      if (err) {
        res.send({ error: 'An error has occurred' });
      } else {
        res.send(result.ops[0]);
      }
    });
  });

  app.delete(`${urlSegment}/:id`, (req, res) => {
    const id = req.params.id;
    const details = { _id: new ObjectId(id) };
    db.collection(collectionName).remove(details, (err, item) => {
      if (err) {
        res.send({ error: 'Error removing object' });
      } else {
        res.send(item);
      }
    });
  });

  app.put(`${urlSegment}/:id`, (req, res) => {
    const id = req.params.id;
    const details = { _id: new ObjectId(id) };
    const updated = { name: res.body.name, value: res.body.value };
    db.collection(collectionName).update(details, updated, (err, item) => {
      if (err) {
        res.send({ error: 'Error occured' });
      } else {
        res.send(item);
      }
    });
  });

  app.get(urlSegment, (req, res) => {
    db.collection(collectionName)
      .find({})
      .toArray((err, list) => {
        if (err) {
          res.send({ error: 'Error getting data' });
        } else {
          res.send(list);
        }
      });
  });

  app.get(`${urlSegment}/:id`, (req, res) => {
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
