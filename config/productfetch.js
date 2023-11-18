const mongoose=require('mongoose');
const connect=mongoose.connect("mongodb://127.0.0.1:27017/store")
connect.then(() => {
    console.log("connection sucessfully");
})
.catch(()=>{
    console.log("error in connection");
})

const productSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    image_url: String,
    description: String,
    price: {
        type: Number,
        required: true
    },
    category: String,
    
});

const productdata=new mongoose.model('products',productSchema)

module.exports=productdata;