const mongoose = require('mongoose');
const { ObjectId } = mongoose.Schema.Types;
const FarmyardSchema = new mongoose.Schema({
  farmName: {
    type: String,
  },
  listOfChickens: [{ type: ObjectId, ref: 'chicken' }],

});
module.exports = Farmyard = mongoose.model('farmyard', FarmyardSchema);