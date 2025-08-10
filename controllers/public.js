import { Product } from "../models/products.js";

export const bulkVerify = async (req, res) => {
    try {
        const { gtinList } = req.body;
        if (!gtinList) {
            return res.json([]);
        }

        const submittedGtins = gtinList.split(/\r\n/)
                                     .map(gtin => gtin.trim())
                                    

        const results = await Promise.all(submittedGtins.map(async gtin => {

            const product = await Product.findOne({ gtin: gtin, isHidden: false });

            if (product) {
                return { gtin: gtin, valid: true };
            } else {
                return { gtin: gtin, valid: false };
            }
        }));

        const allValid = results.every(result => result.valid);
        
        res.render('public/bulk', { results ,allValid});

    } catch (error) {
        console.error("Bulk verification failed:", error);
        res.status(500).json({ message: "An error occurred during verification." });
    }
};




export const publicProduct = async (req, res) => {
    const { gtin } = req.params;
    const lang = req.query.lang || 'en';

    try {
        const product = await Product.findOne({ gtin: gtin, isHidden: false }).populate('company');

        if (product) {
            return res.render('public/product', { product,lang });
        } else {
            return res.json({ gtin: gtin, valid: false });
        }
    } catch (error) {
        console.error("Public product check failed:", error);
        res.status(500).json({ message: "An error occurred during product verification." });
    }
};