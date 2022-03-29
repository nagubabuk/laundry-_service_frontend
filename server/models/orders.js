const mongoose = require("mongoose");



//the below schema helps us to make a order 
const OrderSchema = mongoose.Schema(
  {
    order_id: { type: String, required: true }, 
    user_id: { type: mongoose.Types.ObjectId, reference: "User" }, 
    orderDetails: [                                    
      {
        item: { type: String },                       
        quantity: { type: Number },                  
        wash: { type: Boolean, default: false },     
        press: { type: Boolean, default: false },     
        fold: { type: Boolean, default: false },      
        pack: { type: Boolean, default: false },       
        price: { type: Number, required: true },    
      }
    ],
    total_quantity: { type: Number },        
    total_price: { type: Number },           
    status: {type: String,default:"Ready to Pick Up",required: true}, 
    
  },
  { timestamps: true }          
);
const order = mongoose.model("Orders",OrderSchema)   
module.exports = order