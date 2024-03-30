const express = require("express")
const cors=require("cors")

const Products = require("./models/productModel");
const ApiFeatures = require("./utils/apifeatures");

const PORT=4000;
const app= express();

app.use(express.json())

//create product
app.post('/api/products/create',async (req, res) => {
   
   const product = await Products.create(req.body);
   res.status(201).json({
     success: true,
     product,
   });
 });

//get all  product
app.get('/api/products',async (req,res)=>{
    const resultPerPage=10;

    const productsCount=await Products.countDocuments();
  
    const apiFeature = new ApiFeatures(Products.find(), req.query)
      .search()
      .filter()
     
  
      let products=await apiFeature.query;
      console.log(products)
  
      let filteredProductsCount = products.length;
  
      apiFeature.pagination(resultPerPage);
  
      products=await apiFeature.query.clone();
  
    res.status(200).json({
      success: true,
      products,
      productsCount,
      resultPerPage,
      filteredProductsCount,
    });
})


//Get Product Details   = get the detail of a single product (particular product not all product)
exports.getProductDetails = catchAsyncErrors(async (req, res, next) => {
  const product = await Products.findById(req.params.id);

  if (!product) {
    return next(new ErrorHander("Product not found", 404));
  }

  res.status(200).json({
    success: true,
    product,
 
  });
});


app.listen(PORT,() => {
    console.log(`server is listening on port ${PORT}`)
})










