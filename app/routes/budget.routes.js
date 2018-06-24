
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
      if (err) res.send({ error: err.errors.type.message });
      else res.send(result);
    });
  });

  app.get(urlSegment, (req, res) => {
    BudgetEntity.find({}, (err, entities) => {
      if (err) res.send(err);
      else res.send(entities);
    });
  });

  app.put(`${urlSegment}/:entityId`, (req, res) => {
    const entityId = req.params['entityId'];
    BudgetEntity.findOneAndUpdate({ _id: entityId }, req.body, { new: true }, (err, updated) => {
        if (err) res.send(err);
        else res.send(updated);
    })
  });
};
