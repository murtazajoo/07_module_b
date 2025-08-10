
import { Company } from "../models/company.js";
import { Product } from "../models/products.js";


// Create : /company/create
export const createCompany = async (req, res) => {
  try {
    const {
      companyName,
      companyAddress,
      companyTelephone,
      companyEmail,
      ownerName,
      ownerMobileNumber,
      ownerEmail,
      contactName,
      contactMobileNumber,
      contactEmail,
    } = req.body;

    const newCompany = new Company({
      companyName,
      companyAddress,
      companyTelephone,
      companyEmail,
      owner: {
        name: ownerName,
        mobileNumber: ownerMobileNumber,
        email: ownerEmail,
      },
      contact: {
        name: contactName,
        mobileNumber: contactMobileNumber,
        email: contactEmail,
      },
    });

    await newCompany.save();


        res.status(201).json({
            success: true,
            company: newCompany
        });

  } catch (error) {
    res
      .status(400).json({
          success: false,
          message: "Failed to create company",
          error: error.message
      });
  }
};




// Get all  companies : /company/all
export const getCompanies = async (req, res) => {
    try {
        const companies = await Company.find({ isDeactivated: false });


        res.json({
            companies: companies
        });

    } catch (error) {
        res.status(500).render('error', {
            message: 'Failed to retrieve companies.',
            error: error
        });
    }
};




// Update company : /company/update/:id
export const updateCompany = async (req, res) => {
    try {
        const companyId = req.params.id;

        const {
            companyName,
            companyAddress,
            companyTelephone,
            companyEmail,
            ownerName,
            ownerMobileNumber,
            ownerEmail,
            contactName,
            contactMobileNumber,
            contactEmail
        } = req.body;

        const updatedData = {
            companyName,
            companyAddress,
            companyTelephone,
            companyEmail,
            owner: {
                name: ownerName,
                mobileNumber: ownerMobileNumber,
                email: ownerEmail
            },
            contact: {
                name: contactName,
                mobileNumber: contactMobileNumber,
                email: contactEmail
            }
        };
        

        const updatedCompany = await Company.findByIdAndUpdate(companyId, updatedData, { new: true});

        res.status(200).json({
            success:true,
            updatedCompany
        })

    } catch (error) {
        res.status(400).render('error', { message: 'Failed to update company', error });
    }
};






// Get one company : /company/:id
export const getOneCompany = async (req,res) =>{

     const companyId = req.params.id;

     const company = await Company.findById(companyId);
     const productsOfCompany = await Product.find({ company: companyId });
    //  res.render('company-details', { company, productsOfCompany });
    res.json({
        company,
        productsOfCompany
    });
}








// Deactivate company : /company/deactivate/:id
export const deactivateCompany = async (req, res) => {
  try {
    const companyId = req.params.id;
    await Company.findByIdAndUpdate(companyId, { isDeactivated: true });
    // When a company is deactivated, all associated products are marked as hidden [cite: 60]
    await Product.updateMany({ company: companyId }, { isHidden: true });
    res.redirect("/admin/companies");
  } catch (error) {
    res
      .status(500)
      .render("error", { message: "Failed to deactivate company", error });
  }
};
