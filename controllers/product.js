import { Product } from "../models/products.js";

// Get all products : /products/
export const getAllProducts = async (req, res) => {
  try {
    const products = await Product.find({ isHidden: false }).populate(
      "company"
    );
    res.status(200).json({
      success: true,
      products,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Failed to retrieve products",
      error: error.message,
    });
  }
};

// Get product by GTIN : /products/:gtin
export const getProduct = async (req, res) => {
  try {
    let gtin = req.params.gtin;
    const isJson = req.params.gtin.endsWith(".json");
    if (isJson) {
      gtin = gtin.slice(0, -5);
    }

    const product = await Product.findOne({ gtin, isHidden: false }).populate(
      "company"
    );
    if (!product) {
      return res.status(404).json({
        success: false,
        message: "Product not found",
      });
    }
    res.status(200).json({
      success: true,
      product,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Failed to retrieve product",
      error: error.message,
    });
  }
};

// Hide product : /products/hide/:gtin
export const hideProduct = async (req, res) => {
  try {
    const gtin = req.params.gtin;
    const product = await Product.findOneAndUpdate(
      { gtin },
      { isHidden: true },
      { new: true }
    );
    if (!product) {
      return res.status(404).json({
        success: false,
        message: "Product not found",
      });
    }
    res.status(200).json({
      success: true,
      message: "Product hidden successfully",
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Failed to hide product",
      error: error.message,
    });
  }
};

// Delete product : /products/delete/:gtin
export const deleteProduct = async (req, res) => {
  const gtin = req.params.gtin;
  const product = await Product.findOne({ gtin });
  if (!product) {
    return res.status(404).json({
      success: false,
      message: "Product not found",
    });
  }
  if (!product.isHidden) {
    return res.status(400).json({
      success: false,
      message: "Product is not hidden",
    });
  }
  await Product.deleteOne({ gtin });
  res.status(200).json({
    success: true,
    message: "Product deleted successfully",
  });
};

// Create new product /admin/products/new

export const createProduct = async (req, res) => {
  try {
    const {
      name_en,
      name_fr,
      gtin,
      description_en,
      description_fr,
      brand,
      countryOfOrigin,
      grossWeight,
      netWeight,
      weightUnit,
      company,
    } = req.body;

    const productData = {
      name: { en: name_en, fr: name_fr },
      gtin,
      description: { en: description_en, fr: description_fr },
      brand,
      countryOfOrigin,
      weight: {
        gross: grossWeight,
        net: netWeight,
        unit: weightUnit,
      },
      company,
    };

    const newProduct = new Product(productData);
    await newProduct.save();
    res.status(201).json({
      success: true,
      message: "Product created successfully",
      product: newProduct,
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: "Failed to create product",
      error: error.message,
    });
  }
};
