const mocha = require('mocha');
const assert = require('assert');
const connectToDb = require('../app/db-connection').connect;
const dropCollection = require('../app/db-connection').dropCollection;
const budgetCollectionName = require('../app/collections').budget;
const BudgetEntity = require('../app/models/budget-entity.model');

describe('Saving to DB', () => {
  before(done => {
    connectToDb(done);
  });

  beforeEach(done => {
    dropCollection(budgetCollectionName).then(
      () => {
        done();
      },
      () => {
        done();
      }
    );
  });

  it('Should save model to DB', done => {
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
