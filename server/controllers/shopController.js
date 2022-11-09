import shops from '../shopModel.js';

const addShop = (req, res) => {
	// Get the data from the request body that will be used to add a shop to the database
	let data = req.body;
	// Create a document(entry) in the database.
	shops.create(data);
	// Send back response
	res.status(200).send(`you have added ${data.name}`);
};

const addAllShops = (req, res) => {
	let data = req.body;
	shops.insertMany(data);
	res.status(201).send('you have updated the db');
};

const updateShop = async (req, res) => {
	// Get the data from the request body that will be used to update the correct shop in the database
	let data = req.body;
	// Search for the correct shop by name and update with the data that has been input in the request body
	let found = await shops.findOneAndUpdate({ name: data.name }, data);
	// Send back response
	res.status(200).send(`You have updated ${found.name}`);
};

const getShops = async (req, res) => {
	// Get all of the documents in the collection
	let data = await shops.find();
	// Send back response with all shop data in JSON format
	res.status(200).json(data);
};

const removeShop = async (req, res) => {
	// Get the data from the request body that will be used to remove the correct shop in the database
	let data = req.body;
	// Search for the shop by the correct name and erase it.
	let deleted = await shops.deleteOne({ name: data.name });
	// Send back a response.
	res.status(200).send(`You have removed ${data.name}`);
};

const addProject = async (req, res) => {
	// Get the data from the request body that will be used to add a project to a shop in the database
	let data = req.body;
	// Search for the shop by name and then append the project from the req.body to the projects array.
	let updated = await shops.findOneAndUpdate(
		{ name: data.name },
		{
			$push: {
				projects: data.project
			}
		}
	);
	// Send back a response.
	res.status(200).send(`Project has been added to ${data.name}`);
};

const findShop = async (req, res) => {
	// Get shop name from the req parameters.
	let shopName = req.params.shopName;
	// Find the correct shop by name. Case insensitive.
	let shop = await shops
		.find({ name: shopName })
		.collation({ locale: 'en', strength: 1 });
	// Send back a response with the found shop.
	res.status(200).json(shop);
};

const findProject = async (req, res) => {
	// Get project name from the req parameters.
	let projectName = req.params.projName;
	// Get shop name from the req parameters.
	let shopName = req.params.shopName;

	// Find the correct shop by name. Case insensitive.
	let data = await shops
		.find({ name: shopName }, 'projects name contact')
		.collation({ locale: 'en', strength: 1 });
	// Find the correct project by name. Case insensitive.
	let found = data[0].projects.find(
		(project) => project.name.toLowerCase() === projectName.toLowerCase()
	);

	// Create new object with the shops name and contact and the found project.
	let newData = {
		shopName: data[0].name,
		contact: data[0].contact,
		project: found
	};
	// Send back a response with the new object created above.
	res.status(200).json(newData);
};

//Makes an all projects page regardless of shop that match clicked tag fuck you Ross
const getAllShopsProjects = async (req, res) => {
	let query = req.params.queryValue;

	let allDocs = await shops
		.find({
			projects: { $elemMatch: { tags: `${query}` } }
		})
		.collation({ locale: 'en', strength: 1 });

	let finalProjects = allDocs.map((docs) => {
		return {
			shopName: docs.name,
			projects: docs.projects.filter((project) => {
				if (project.tags.join().toLowerCase().includes(query.toLowerCase())) {
					console.log(project);
					return project;
				}
			}),
			shopContact: docs.contact
		};
	});

	res.status(200).json(finalProjects);
};

const getAutoComplete = async (req, res) => {
	let allTerms = await shops.find(
		{},
		{
			name: 1,
			'projects.name': 1,
			'projects.tags': 1,
			'projects.lang': 1,
			_id: 0
		}
	);

	let test = allTerms.map((term) => {
		// console.log(term);
		return {
			name: term.name,
			projName: term.projects.map((project) => project.name),
			tags: term.projects.map((project) => project.tags),
			lang: term.projects.map((project) => project.lang)
		};
	});

	let finalTest = test.map((item) => Object.values(item)).flat(3);

	let caseSens = finalTest.map((item) => item.toLowerCase());

	let result = Array.from(new Set(caseSens));

	let final = result.map((item) => ({
		value: `${item.charAt(0).toUpperCase()}${item.slice(1)}`
	}));

	res.status(200).json(final);
};

export {
	addShop,
	addAllShops,
	getShops,
	updateShop,
	removeShop,
	addProject,
	findShop,
	findProject,
	getAllShopsProjects,
	getAutoComplete
};
