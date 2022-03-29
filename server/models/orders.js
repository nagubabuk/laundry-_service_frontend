const mongoose = require("mongoose");



//the below schema helps us to make a order 
const OrderSchema = mongoose.Schema(
  {
    order_id: { type: String, required: true }, //order ID in the format ORDxxxx
    user_id: { type: mongoose.Types.ObjectId, reference: "User" }, //gets fetched from user model
    orderDetails: [                                    // inside this array object it stores orer details for each specific garment
      {
        item: { type: String },                       // either shirt.jeans,....
        quantity: { type: Number },                  // total quantity of garments
        wash: { type: Boolean, default: false },     // required or not
        press: { type: Boolean, default: false },     // required or not
        fold: { type: Boolean, default: false },       // required or not
        pack: { type: Boolean, default: false },       // required or not
        price: { type: Number, required: true },    //sub-total price for that specific garment type
      }
    ],
    total_quantity: { type: Number },        //total quantity of all garments
    total_price: { type: Number },           // total price
    status: {type: String,default:"Ready to Pick Up",required: true}, // status of order on past orders page
    //address: { type: String }     will be fetched from user model
  },
  { timestamps: true }           // time of creation of order
);
const order = mongoose.model("Orders",OrderSchema)   // created a order collection
module.exports = order