const mongoose = require("mongoose");
const restuarantSchema = mongoose.Schema({
    name: {
        type: String,
        required: [true, "Restuarant's Name is necessary"]
    },
    phoneNo:{
        type: String,
        required: [true, "Phone Number is necessary"],
        validate: {
            validator: async function(v) {
                const count = await this.model('').countDocuments({ phoneNumber: v });
                return count === 0;
            },
            message: 'Phone number must be unique'
        }
    },
    description:{
        type: String,
        required: [true,"Description of the Restuarant is necessary"],
        validate: {
            validator: function(v) {
                return v.length >= 200;
            },
            message: props => `${props.value} is less than 200 characters!`
        }
    },
    logo:{
        type: String,
        required: [true, "logo is necessary"]
    },
    openingTime: {
        type: Date,
        required: [true,"Opening time is necessary"]
    },
    closingTime: {
        type: Date,
        required: [true,"Closing time is necessary"]
    },
    admin: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true,
        validate: {
            validator: async function(userId) {
                const user = await mongoose.model('User').findById(userId);
                return user && user.role === 'admin';
            },
            message: 'Admin must be registered with an admin role'
        }
    },
}, {timeStamps: true})

const Restuarant = mongoose.model("Restuarant",restuarantSchema)
module.exports = Restuarant