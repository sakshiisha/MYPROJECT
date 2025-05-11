const mongoose = require("mongoose");
const initData = require("./init.js");
const Listing = require("../models/listing.js");

const MONGO_URL = "mongodb://127.0.0.1:27017/StudentBnB"

main().then(() =>{
    console.log("connected to db")
}).catch(err =>{
    console.log(err)
})

async function main(){
    await mongoose.connect(MONGO_URL)
}

const initDB = async () => {
   await Listing.deleteMany({});
   const updatedData = initData.data.map((obj) => ({
      ...obj,
      owner: '681f21bf66ee3477a089e08d' // <-- Make sure this is a valid User _id in your DB
   }));
   await Listing.insertMany(updatedData);
   console.log("data was saved");
};


initDB()