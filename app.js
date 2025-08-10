
import express from "express";
import mongoose from "mongoose";
import { configDotenv } from "dotenv"
import path from "path";
import cors from "cors"
import  authRouter  from "./routes/auth.js";
import  companyRouter  from "./routes/company.js";
import  productRouter  from "./routes/product.js";
import { bulkVerify, publicProduct } from "./controllers/public.js";
import { isAdmin } from "./middlewares/auth.js";
import cookieParser from "cookie-parser";


const app = express();


configDotenv({
    path: "./.env"
})

const PORT = process.env.PORT || 3000;



app.use(express.json()); 
app.use(express.urlencoded({ extended: true })); 
app.use(express.static(path.join(path.resolve(), 'public'))); 
app.set('view engine', 'ejs'); 
app.use(cookieParser())
app.use(cors({
    origin:"*",
    credentials:true,
}))
// Database Connection
mongoose.connect(process.env.MONGO_URI)
    .then(() => console.log('MongoDB Connected...'))
    .catch(err => console.error(err));

// ROUTES
app.post('/07_module_b/verification', bulkVerify);
app.get('/07_module_b/01/:gtin', publicProduct);
app.use('/07_module_b/', authRouter);
app.use('/07_module_b/',isAdmin, companyRouter);
app.use('/07_module_b/',isAdmin, productRouter);



app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});