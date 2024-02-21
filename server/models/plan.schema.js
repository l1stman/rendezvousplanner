// plan.schema.js
import mongoose from "mongoose";
const planSchema = mongoose.Schema({
  owner: {
    type: mongoose.Schema.ObjectId,
    ref: "Account",
    required: "Owner is required",
  },
  title: {
    type: String,
  },
  description: {
    type: String,
  },
  date: {
    type: Date
  },
  thumbnail: {
    type: String,
  },
  serials: { // rendezvous codes
    type: Array,
  }
});

export default mongoose.model("Plan", planSchema);
