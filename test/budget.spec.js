const mocha = require('mocha');
const assert = require('assert');
const connectToDb = require('../app/db-connection');
const BudgetEntity = require('../app/models/budget-entity.model');

describe('Saving to DB', () => {
  it('Should save model to DB', done => {
    connectToDb();
    const entity = new BudgetEntity({
      name: 'Test name',
      type: 'input',
      value: 200
    });

    entity.save().then(() => {
      assert(!entity.isNew);
      done();
    });
  });
});
