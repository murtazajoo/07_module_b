export const loginController = async (req,res,next)=>{
    const {pass} = req.body;

    if(pass){

        if(pass === "admin"){
                res.status(200).cookie("admin","true",{
                     sameSite:"Lax", secure:true,httpOnly: 
                     true,
                }).redirect("/07_module_b/company/all");
        }else{
            res.status(401).end("Unauthorized");
        }
    }  else{
        res.status(400).end("Bad Request");
}
}