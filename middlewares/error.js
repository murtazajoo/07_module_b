class ErrorHandler extends Error{
    constructor(message,statusCode){
        super(message),
        this.statusCode = statusCode
    }
}



export const errorMiddleware = (err,req,res,next)=>{
    const {message="Internal Server Error",statusCode = 500} = err
    res.status(statusCode).json({
        success:false,
        message:message
    })
}


export default ErrorHandler;