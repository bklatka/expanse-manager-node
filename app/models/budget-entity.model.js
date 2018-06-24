const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const collectionName = require('../collections').budget;

const BudgetEntitySchema = new Schema({
  name: {
    type: String,
    required: [true, 'Name is required']
  },
  type: {
    type: String,
    enum: ['income', 'outcome'],
    required: [true, 'You have to define type of entity']
  },
  value: {
    type: Number,
    required: [true, 'Value is required']
  }
});

module.exports = mongoose.model(collectionName, BudgetEntitySchema);
