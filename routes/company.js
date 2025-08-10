import express from "express";
import { createCompany, deactivateCompany, getCompanies, getOneCompany, updateCompany } from "../controllers/company.js";



const router = express.Router();

router.post("/company/create",createCompany);
router.get("/company/deactivate/:id",deactivateCompany)
router.get("/company/all",getCompanies)
router.put("/company/edit/:id",updateCompany)
router.get("/company/details/:id", getOneCompany)


router.get("/logout",(req,res)=>{
    res.clearCookie("token").end("lll")
})



export default router;