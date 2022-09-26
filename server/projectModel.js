import mongoose from "mongoose";

const Schema = mongoose.Schema;

let project = new Schema({
	name: String,
	tags: Array,
	lang: Array,
	proj_link: String,
	desc: String
});

export default mongoose.model("projects", project);
