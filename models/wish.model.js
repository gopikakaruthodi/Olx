import mongoose from "mongoose";
const wishSchema = new mongoose.Schema({
    buyerId:{type:String},
    product:{type:Object}
})
export default mongoose.model.lists||mongoose.model("list",wishSchema);