const mongoose = require ("mongoose")

const bookingSchema = new mongoose.Schema({
place:{type:mongoose.Schema.Types.ObjectId, required: true, ref:"Place"},
user:{type:mongoose.Schema.Types.ObjectId, required:true},
checkInDate:{type:Date, required:true},
checkOutDate:{type:Date, required:true},
guest:{type:Number, required:true},
mobile:{type:Number, required:true},
price:{type:Number, Required:true}
})

const BookingModel = mongoose.model("Booking", bookingSchema)

module.exports = BookingModel