const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const collectionName = require('../collections').budget;

const BudgetEntitySchema = new Schema({
  name: String,
  type: 'income' | 'outcome',
  value: Number
});

module.exports = mongoose.model(collectionName, BudgetEntitySchema);
