import mongoose from 'mongoose';

const Schema = mongoose.Schema;

// Create the schema for a shop instance used to create documents in the mongodb database.
let shop = new Schema({
	name: String,
	desc: String,
	projects: Array,
	img: String,
	location: String,
	contact: String
});

export default mongoose.model('shops', shop);
