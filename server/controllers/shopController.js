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

const findShop = async (req, res) => {
	// let shopName = req.body.name;
	let shopName = req.params.shopName;

	console.log(shopName);

	let shop = await shops
		.find({ name: shopName })
		.collation({ locale: 'en', strength: 1 });

	res.status(200).json(shop);
};

const findProject = async (req, res) => {
	let projectName = req.params.projName;
	let shopName = req.params.shopName;

	let data = await shops
		.find({ name: shopName }, 'projects name contact')
		.collation({ locale: 'en', strength: 1 });

	let found = data[0].projects.find(
		(project) => project.name.toLowerCase() === projectName.toLowerCase()
	);

	let newData = {
		shopName: data[0].name,
		contact: data[0].contact,
		project: found
	};
	console.log(newData);
	res.status(200).json(newData);
};

export {
	addShop,
	getShops,
	updateShop,
	removeShop,
	addProject,
	findShop,
	findProject
};
