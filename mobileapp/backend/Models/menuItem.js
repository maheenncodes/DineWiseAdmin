const mongoose = require("mongoose");

const menuItemSchema = mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "Please add a name"],
      trim: true,
    },
    category: {
      type: String,
      required: [true, "Please add a category"],
      trim: true,
    },
    price: {
      type: String,
      required: [true, "Please add a price"],
      trim: true,
    }, 
    description: {
        type: String,
        required: [true, "Please add a description for the menu item"],
        trim: true,
      },
    ingredients: {
        type: [String], // An array of strings, each representing an ingredient
      //  required: [true, "Please specify the ingredients for the menu item"],
      },
    image: {
      type: Object,
      default: {},
    },

  },
  {
    timestamps: true,
  }
);

const MenuItem = mongoose.model("MenuItem", menuItemSchema);
module.exports = MenuItem;