const budgetRoutes = require('./budget.routes');

module.exports = (app, db) => {
  budgetRoutes(app, db);
};
