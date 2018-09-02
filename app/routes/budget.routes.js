const urlSegment = '/budget/';

const BudgetEntity = require('../models/budget-entity.model');

module.exports = app => {
  app.post(urlSegment, (req, res) => {
    const { title, type, value } = req.body;
    const entity = new BudgetEntity({
      title,
      type,
      value
    });
    entity.save((err, result) => {
      if (err) res.status(400).send({ error: err.message });
      else res.send(result);
    });
  });

  app.get(urlSegment, (req, res) => {
    BudgetEntity.find({}, (err, entities) => {
      if (err) res.status(400).send(err);
      else res.send(entities);
    });
  });

  app.put(`${urlSegment}/:entityId`, (req, res) => {
    const entityId = req.params['entityId'];
    BudgetEntity.findOneAndUpdate(
      { _id: entityId },
      req.body,
      { new: true },
      (err, updated) => {
        if (err) res.status(400).send(err);
        else res.send(updated);
      }
    );
  });

  app.delete(`${urlSegment}/:entityId`, (req, res) => {
    const entityId = req.params['entityId'];
    BudgetEntity.deleteOne({ _id: entityId }, err => {
      if (err) res.status(400).send(err);
      else res.send(true);
    });
  });
};
