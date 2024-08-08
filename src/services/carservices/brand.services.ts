import Brand, { BrandDocument } from "../../database/models/brand.model";
import config from "../../config";
import { ObjectId } from "mongoose";

export default class BrandServices {
  constructor(
      readonly body: BrandDocument,
      private file: Express.Multer.File,
  ) {
    this.body = body
    this.file = file
    }
saveBrand:()=>Promise<void> = async()=>{
const brand = await Brand.create({
    name:this.body['name'],
    image:config.server_url+`${this.file.destination}${this.file.filename}`.slice(config.split_val)
})
}
updateBrand:(id:string)=>Promise<void> = async(id)=>{
const updatedBrand = await Brand.findOneAndUpdate({_id:id},{
    name:this.body['name'],
    image:config.server_url+`${this.file.destination}${this.file.filename}`.slice(config.split_val)
})
}
static findAllBrands:()=>Promise<BrandDocument[]> = async()=>{
    const fetchedBrands = await Brand.find()
    return fetchedBrands
}
static findSingleBrand:(id:string|ObjectId)=>Promise<BrandDocument | null> = async(id)=>{
    const singleBrand = await Brand.findById(id)
    return singleBrand
}
static deleteBrand:(id:string|ObjectId)=>Promise<void> = async(id)=>{
    const deleteBrand = await Brand.findByIdAndDelete(id)
}
}
