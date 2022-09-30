// import connection from "../db.js";
import shops from '../shopModel.js';

const addShop = (req, res) => {
	let data = req.body;
	shops.create(data);
	res.status(200).send(`you have added ${data.name}`);
};

const updateShop = async (req, res) => {
	let data = req.body;
	let filter = { name: data.name };
	let found = await shops.findOneAndUpdate(filter, data);
	console.log(found);
	res.status(200).send(`You have updated ${found.name}`);
};

const getShops = async (req, res) => {
	let data = await shops.find();
	res.status(200).json(data);
};

const removeShop = async (req, res) => {
	let data = req.body;
	let deleted = await shops.deleteOne({ name: data.name });
	console.log(deleted);
	res.status(200).send(`You have removed ${deleted.deletedCount} entry`);
};

const addProject = async (req, res) => {
	let data = req.body;
	let updated = await shops.findOneAndUpdate(
		{ name: data.name },
		{
			$push: {
				projects: data.project
			}
		}
	);

	console.log(updated);

	res.status(200).send('yuhhhhhh');
};

export { addShop, getShops, updateShop, removeShop, addProject };
