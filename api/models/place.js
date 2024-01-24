const mongoose = require ("mongoose");

const placeSchema = new mongoose.Schema({
    owner:{type:mongoose.Schema.Types.ObjectId, ref:"User"},
    title:String,
    address: String,
    addedPhotos:[String],
    discription:String,
    perks:[String],
    extraInfo:String,
    checkInTime:Number,
    checkOutTime:Number,
    guest:Number,
    price:Number

})

const placeModel = mongoose.model("Place",placeSchema)
module.exports = placeModel