// client.schema.js (rendezvous client)
import mongoose from "mongoose";
const RendezvousSchema = mongoose.Schema({
  plan: {
    type: mongoose.Schema.ObjectId,
    ref: "Plan",
    required: "Plan is required",
  },
  serial: { // rendezvous code
    type: String,
    required: true
  },
  email: {
    type: String,
  },
  name: {
    type: String,
  },
  cin: {
    type: String,
    required: true,
  },
}, { timestamps: true });
export default mongoose.model("Rendezvous", RendezvousSchema);
