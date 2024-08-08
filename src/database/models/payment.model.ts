import mongoose,{ Schema,Model,Document, ObjectId } from "mongoose";

enum Status{
  UNPAID = "unpaid",
  PAID = "paid"
}

 export interface PaymentDocument extends Document{
    createdAt:Date,
    updatedAt:Date,
    clientName:string,
    order:ObjectId,
    session_id:string,
    status:Status,
    amount:number
 }

 const PaymentSchema:Schema = new Schema<PaymentDocument>({
    clientName:{
        type:String,
        required:[true,"Client name is required"]
    },
    order:{
        type:mongoose.Types.ObjectId,
        required:[true,"Order id required"],
        ref:"Order"
    },
    session_id:{
        type:String,
        required:[true,"Session Id is required"]
    },
    status:{
        type:String,
        enum:[Status.PAID,Status.UNPAID],
        required:[true,"Status required"]
    },
    amount:{
        type:Number,
        required:[true,"Amount is required"]
    },
    createdAt: {
        type: Date,
        required: true,
        default: new Date(),
      },
      updatedAt: {
        type: Date,
        required: true,
        default: new Date(),
      },
 })
 const Payment:Model<PaymentDocument> = mongoose.model<PaymentDocument>("Payment",PaymentSchema) 

 export default Payment