const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const ProfileSchema = new Schema(
  {
    user: { type: Schema.Types.ObjectId, ref: "User" },
    bio: { type: String, required: true },
    social: {
      facebook: { type: String, required: true },
      instagram: { type: String, required: true },
      twitter: { type: String, required: true },
      youtube: { type: String, required: true },
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Profile", ProfileSchema);
