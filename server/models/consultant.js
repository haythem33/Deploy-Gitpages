const mongoose = require ('mongoose');

var ConsultantSchema = mongoose.Schema({
  code : {
    type : String
  },
  username: {
    type: String
  },
  email: {
    type: String
  },
  password: {
    type: String
  },
  profiltitle: {
    type: String
  },
  category: {
    type: String
  },
  Aboutme :[{
    Name: String,
    LastName: String,
    Telephone: String,
    City: String,
    Photo: String
  }],
  Experience :[{
    Duration: Number,
    CompanyName: String,
    Description: String,
  }],
  Skills: [{

  }],
  Disponibility : {
    type: String,
  },
  Price : [{
    perday: String,
    pertendays: String,
    permonth: String,
  }],
  Portfolio :[{
    PortfolioTitle: String,
    PortfolioPhoto: String,
    PortfolioLink: String,
  }],
})
module.exports = ConsultantSchema;
