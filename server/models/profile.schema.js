// profile.schema.js
import mongoose from "mongoose";
const profileSchema = new mongoose.Schema({
  owner: {
    type: mongoose.Schema.ObjectId,
    ref: "Account",
    required: "Owner is required",
  },
  name: {
    type: String,
  },
  mobile: {
    type: String,
  },
  avatar_url: {
    type: String,
  },
  bio: {
    type: String,
  },
});

// Export the model
export default mongoose.model("Profile", profileSchema);
