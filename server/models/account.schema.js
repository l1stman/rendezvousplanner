// account.schema.js
import mongoose from "mongoose"
const accountSchema = new mongoose.Schema({
    email: {
        type: String,
        required: true,
        unique: true,
    },
    password: {
        type: String,
        required: true,
    },
});

// Export the model
export default mongoose.model('Account', accountSchema);