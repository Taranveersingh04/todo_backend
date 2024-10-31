const mongoose = require("mongoose");

const connect = async () => {
  try {
    await mongoose.connect("mongodb+srv://baggataranveersingh:hxPx1bn4ZYxp1143@cluster0.0yupumu.mongodb.net/");
    console.log("DB Connected >>>");
  } catch (error) {
    console.error("DB Connection Error:", error.message);
  }
};

module.exports = { connect };