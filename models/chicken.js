const mongoose = require('mongoose');
const { ObjectId } = mongoose.Schema.Types;
const ChickenSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  birthday: {
    type: Date,
  },
  weight: {
    type: Number,
    required: true,
  },
  steps: {
    type: Number,
    default: 0,
  },
  isRunning: {
    type: Boolean,
    default: false,
  },
});
module.exports = Chicken = mongoose.model('chicken', ChickenSchema);