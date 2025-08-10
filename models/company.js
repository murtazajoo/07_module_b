import mongoose from "mongoose";
const companySchema = new mongoose.Schema({
    companyName: { type: String, required: true },
    companyAddress: String,
    companyTelephone: String,
    companyEmail: { type: String, required: true },
    owner: {
        name: String,
        mobileNumber: String,
        email: String,
    },
    contact: {
        name: String,
        mobileNumber: String,
        email: String,
    },
    isDeactivated: { type: Boolean, default: false },
}, { timestamps: true });

export const Company = mongoose.model('Company', companySchema);