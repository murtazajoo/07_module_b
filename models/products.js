import mongoose from "mongoose"

const productSchema = new mongoose.Schema(
  {
    name: {
      en: { type: String, required: true },
      fr: { type: String, required: true },
    },
    description: {
      en: String,
      fr: String,
    },
    gtin: {
      type: String,
      required: true,
      unique: true, 
    },

    brand: String,
    countryOfOrigin: { type: String, default: "France" },
    weight: {
      gross: Number,
      net: Number,
      unit: String,
    },
    image: {
        type:String,
        default:"https://lipsum.app/640x480"
    }, 
    isHidden: { type: Boolean, default: false },
    company: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Company", 
      required: true,
    },
  },
  { timestamps: true }
);

export const Product = mongoose.model("Product", productSchema);

