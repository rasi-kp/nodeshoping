const mongoose=require('mongoose');
const connect=mongoose.connect("mongodb://127.0.0.1:27017/store")
connect.then(() => {
    console.log("connection sucessfully");
})
.catch(()=>{
    console.log("error in connection");
})

const signup=new mongoose.Schema({
    name:{
        type:String,
        required:true},
    email:{
        type:String,
        required:true
    },
    password:{
        type:String,
        required:true
    }
})
const signupdata=new mongoose.model("users",signup)
module.exports=signupdata;

// const productSchema = new mongoose.Schema({
//     name: {
//         type: String,
//         required: true
//     },
//     description: String,
//     price: {
//         type: Number,
//         required: true
//     },
//     category: String,
//     imageUrl: String
// });
// // const logindata=new mongoose.model("users",login)


// const productdata=new mongoose.model("product",productSchema)


// module.exports=productdata;
