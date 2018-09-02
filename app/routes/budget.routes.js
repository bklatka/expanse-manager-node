const urlSegment = '/budget';

const BudgetEntity = require('../models/budget-entity.model');

module.exports = app => {
  app.post(urlSegment, (req, res) => {
    const { name, type, value } = req.body;
    const entity = new BudgetEntity({
      name,
      type,
      value
    });
    entity.save((err, result) => {
      if (err) res.send({ error: err.errors.type.message }, 400);
      else res.send(result);
    });
  });

  app.get(urlSegment, (req, res) => {
    BudgetEntity.find({}, (err, entities) => {
      if (err) res.send(err, 400);
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
        if (err) res.send(err, 400);
        else res.send(updated);
      }
    );
  });

  app.delete(`${urlSegment}/:entityId`, (req, res) => {
    const entityId = req.params['entityId'];
    BudgetEntity.deleteOne({ _id: entityId }, err => {
      if (err) res.send(err, 400);
      else res.send(true);
    });
  });
};
