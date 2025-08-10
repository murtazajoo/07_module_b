import express from "express";
import { loginController } from "../controllers/login.js";



const router = express.Router();

router.post("/login",loginController)

router.get("/logout",(req,res)=>{
    res.clearCookie("token").end("lll")
})



export default router;