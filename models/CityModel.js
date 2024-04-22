const mongoose = require('mongoose');
const CitySchema = mongoose.Schema(
   {
      name: String
   }
);

const CityModel = mongoose.model("cities", CitySchema);
module.exports = CityModel;
