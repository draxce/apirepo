import mongoose from "mongoose";
import Kamion from "./kamion";
let Schema = mongoose.Schema;

let ReviewSchema = new Schema({
  title: {
    type: String,
    required: true
  } ,
  text: String,
  kamion: {
    type: Schema.Types.ObjectId,
    ref: "FoodTruck",
    required: true
  }
});

module.exports = mongoose.model("Review", ReviewSchema);
