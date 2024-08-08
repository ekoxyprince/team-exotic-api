type ErrorDetails = {path:string,value:string,field:string}

export class CustomError extends Error{
    details:ErrorDetails | undefined
    constructor(message:string,details?:ErrorDetails){
        super(message)
        this.details = details
        Object.setPrototypeOf(this,CustomError.prototype)
    }
}
export  class AuthenticationError extends CustomError{
      code:number | undefined
       constructor(message:string,details?:ErrorDetails){
        super(message,details)
        this.code = 401
        Object.setPrototypeOf(this,AuthenticationError.prototype)
       }
}
export  class AuthorizationError extends CustomError{
    code:number | undefined
     constructor(message:string,details?:ErrorDetails){
      super(message,details)
      this.code = 403
      Object.setPrototypeOf(this,AuthorizationError.prototype)
     }
}
export  class ValidationError extends CustomError{
    code:number | undefined
     constructor(message:string,details?:ErrorDetails){
      super(message,details)
      this.code = 422
      Object.setPrototypeOf(this,ValidationError.prototype)
     }
}
export  class NotfoundError extends CustomError{
    code:number | undefined
     constructor(message:string,details?:ErrorDetails){
      super(message,details)
      this.code = 404
      Object.setPrototypeOf(this,NotfoundError.prototype)
     }
}
export class BadRequestError extends CustomError{
    code:number|undefined
    constructor(message:string,details?:ErrorDetails){
        super(message,details)
        this.code = 400
        Object.setPrototypeOf(this,BadRequestError.prototype)
    }
}