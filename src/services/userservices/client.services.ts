import { ClientDocument } from "../../database/models/client.model";
import Client from "../../database/models/client.model";
import { BadRequestError } from "../../exceptions/error";
import { ObjectId } from "mongoose";
import config from "../../config";
export interface UserParams {
  limit: number;
  pages: number | null;
  status?: string | null;
  q?: string | null;
}
interface Query {
  firstname?: object;
  status?: string;
}
export default class ClientService {
  constructor(
    private body: ClientDocument,
    private files: Express.Multer.File[]
  ) {
    this.body = body;
    this.files = files;
  }

  create(): Promise<ClientDocument> {
    return Client.create({
      ...this.body,
      insuranceImage: `${this.files[1].destination}${this.files[0].filename}`.slice(8),
      licenseImage:`${this.files[0].destination}${this.files[1].filename}`.slice(8)
    })
      .then((client) => {
        return client;
      })
      .catch((error) => {
        throw new Error(error);
      });
  }
 static findClient(driverLicenseNumber:number):Promise<ClientDocument> {
    return Client.findOne({driverLicenseNumber}).then(client=>{
      if(!client) throw new BadRequestError("Client not found!")
       return client
    }).catch(error=>{throw new BadRequestError(error)})
  }
  findOrCreateClient():Promise<ClientDocument>{
    return Client.findOne({email:this.body.email}).then(client=>{
      if(!client){
        return Client.create({
          ...this.body,
          insuranceImage:config.server_url+`${this.files[0].destination}${this.files[0].filename}`.slice(config.split_val),
          licenseImage:config.server_url+`${this.files[1].destination}${this.files[1].filename}`.slice(config.split_val)
        })
      }
      return client
    })
    .then(createdOrExistingClient=>{
      return createdOrExistingClient
    })
    .catch(error=>
    {
      if(error instanceof BadRequestError){
        throw new BadRequestError(error.message)
     }
     throw new Error(error)
    }
    )
  }
  static async findByFilter(filter: UserParams): Promise<object | null> {
    const query: Query = {};
    const page: number | null = filter.pages;
    const limit: number = filter.limit;
    let filterObj: any = filter;
    let excludedFields: string[] = ["page", "limit"];
    excludedFields.forEach((el) => delete filterObj[el]);
    if (filterObj.q) {
      query["firstname"] = { $regex: new RegExp(filterObj.q), $options: "i" };
    }
    if (filterObj.status) {
      query["status"] = filterObj.status;
    }
    const totalCount = await Client.countDocuments(query);
    const clients = await Client.find(query).sort("-createdAt");
    return {
      total_client: totalCount,
      clients: clients,
      page:page,
      pages:Math.ceil(totalCount/limit),
      limit:limit
    };
  }
  static findById(id: ObjectId | string): Promise<object | null> {
    return Client.findById(id)
      .sort("-createdAt")
      .then((client) => client)
      .catch((error) => {
        throw new Error(error);
      });
  }
  static findAndUpdate(id: ObjectId | string): Promise<void> {
    return Client.findByIdAndUpdate(id, {status:"verified"})
      .then((client) => undefined)
      .catch((error) => {
        throw new Error(error);
      });
  }
}
