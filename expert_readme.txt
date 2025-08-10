
This Project was using Express and Mongodb

the .env include 
- MONGO_URI = mongodb://localhost:27017/module_07
- PORT = 4000

## Public-facing Pages

- Public GTIN bulk verification page
	http:// `hosturl`  /07_module_b/

- Public Product Page
	http://` hosturl`  /07_module_b/01/`gtin`


## login
- path  /07_module_b/login
	you need to provide  `pass` in form or in json to 		login
	the pass is `admin`



## Admin only paths

all paths start with `/07_module_b/`

###  Managing Companies

-  `/company/create` is used to create a company

  -  `/company/deactivate/:id` is used to deactivate a company

-  `/company/all` is used to get all active companies 

-  `/company/edit/:id` is used to update a company
-  `/company/details/:id` is used to get details of a company a company

### Managing Products

-  `/products` or `products.json` is used to get all products
- `/products/:gtin` is used to get a paticular product
-  `/products/hide/:gtin` is used to hide a products
-  `/products/delete/:gtin` is used to delete a hidden products