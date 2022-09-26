import mongoose from "mongoose";

const Schema = mongoose.Schema;

let shop = new Schema({
	name: String,
	desc: String,
	projects: Array,
	img: String
});

export default mongoose.model("shops", shop);
