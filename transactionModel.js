import mongoose from "mongoose";


const transactionSchema=new mongoose.Schema({
  costumerId:{type:mongoose.Schema.Types.ObjectId,ref:"customer"},
  amount:{type:Number,required:true}
},{timestamps:true})



const Transaction=mongoose.model("transaction",transactionSchema)

export default Transaction
