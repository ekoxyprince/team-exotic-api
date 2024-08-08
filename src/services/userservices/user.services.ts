import { UserDocument } from "../../database/models/user.model";
import config from "../../config";
import Order from "../../database/models/order.model";
import Payment from "../../database/models/payment.model";
import Client from "../../database/models/client.model";
import Car from "../../database/models/car.model";
import Brand from "../../database/models/brand.model";

export default class UserService{
    constructor(private user:UserDocument){
        this.user = user
    }
    getDetails():UserDocument{
      return this.user
    }
    updateDetails(body:UserDocument,files:Express.Multer.File[]):void{
        const arrBody:string[] = Object.keys(body)
        for(let i:number = 0; i<arrBody.length;i++){
            const key:string = arrBody[i]
            if(key in this.user){
                this.user[key] = Object.values(body)[i]
            }
        }
        this.user['profileImage'] = config.server_url+`${files[0].destination}${files[0].filename}`.slice(config.split_val)
        this.user['coverImage'] =config.server_url+`${files[1].destination}${files[1].filename}`.slice(config.split_val)
        this.user.save()
    }
    getDashboardDetails = async()=>{
        const details = this.user
        const newOrders = await Order.countDocuments({orderStatus:"booked"})
        const allOrders = await Order.countDocuments() 
        const payments = await Payment.countDocuments()
        const newUsers = await Client.countDocuments({status:"unverified"})
        const allUsers = await Client.countDocuments()
        const availableCars = await Car.countDocuments({status:'active',category:'exotic'})
        const completedRentals = await Order.countDocuments({orderStatus:'completed'})
        const allCars = await Car.countDocuments()
        const brands = await Brand.countDocuments()
        const estValues = await Payment.aggregate([{$match:{status:"paid"}},{$group:{_id:null,amount:{$sum:"$amount"}}}])
        return {
            admin_details:details,
            new_orders:newOrders,
            total_orders:allOrders,
            total_payments:payments,
            new_users:newUsers,
            total_users:allUsers,
            total_cars:allCars,
            total_brands:brands,
            est_revenue:estValues[0]?.amount || 0,
            available_cars:availableCars,
            completed_rentals:completedRentals
        }
    }
}