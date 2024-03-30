const mongoose=require("mongoose");

const productSchema=new mongoose.Schema({
    productname:{
        type:String,
        required:[true,"Please Enter product Name"],
        trim:true
    },
    description:{
        type:String,
        required:[true,"Please Enter Product Description"]
    },
    price:{
        type:Number,
        required:[true,"Please Enter product Price"],
        maxLength:[8,"Price Cannot Exceed 8 Characters"]
    },
    ratings:{
        type:Number,
        default:0
    },
    discount:{
         type:Number,
         default:0
    }
    ,
    category:{
         type:String,
         require:[true,"Please Enter Product Category"]
    },
    Stock:{
        type:Number,
        require:[true,"Please Enter Product Stock"],
        maxLength:[4,"Stock cannot exceed 4 characters"],
        default:1
    },
    createdAt:{
        type:Date,
        default:Date.now
    }

})

module.exports=mongoose.model("Products",productSchema)