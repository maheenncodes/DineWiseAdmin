const mongoose = require('mongoose');


const restaurantSchema = mongoose.Schema(
{
  
    name: {
        type: String,
        required: [true, "Please add a restaurant name"],
        trim: true,
      },
      location: {
        type: String,
        required: [true, "Please add a location"],
        trim: true,
      },
      contactInfo: {
        phone: {
          type: String,
          trim: true,
        },
        email: {
          type: String,
          trim: true,
          match: [
            /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
            "Please enter a valid email",
          ],
        },
    },
      openingHours: {
        type: String,
        trim: true,
      },
      images: [String], // Array of image URLs
      reviews: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Review',
      }],
     
      menu: {
        items: [
          {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'MenuItem',
          },
        ],
      },
},
{
  timestamps: true,
});

const Restaurant = mongoose.model('Restaurant', restaurantSchema);

module.exports = Restaurant;