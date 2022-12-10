const { Schema, model, SchemaTypes } = require("mongoose");
const emailRegexp = require("../../helpers/validateEmail");

const contactSchema = new Schema(
  {
    name: {
      type: String,
      required: [true, "Set name for contact"],
    },
    email: {
      type: String,
      match: emailRegexp,
      unique: true,
      required: [true, "Set email for contact"],
    },
    phone: {
      type: String,
      unique: true,
      required: [true, "Set phone for contact"],
    },
    favorite: {
      type: Boolean,
      default: false,
    },
    owner: {
      type: SchemaTypes.ObjectId,
      ref: "user",
      required: true,
    },
  },
  {
    versionKey: false,
    timestamps: true,
  }
);

const Contact = model("contact", contactSchema);

module.exports = Contact;
