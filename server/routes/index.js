import express from 'express';
import {
	getShops,
	addShop,
	addAllShops,
	updateShop,
	removeShop,
	addProject,
	findShop,
	getGitHubRepos,
	getGitLabRepos,
	findProject,
	getAllShopsProjects,
	getAutoComplete
} from '../controllers/index.js';
import path from 'path';

var env = process.env.NODE_ENV || 'development';

const router = express.Router();

// Endpoints for the frontend to interact with backend.
router.route('/api').get(getShops);
router.route('/api').post(addShop);
router.route('/api/addall').post(addAllShops);
router.route('/api').patch(updateShop);
router.route('/api').delete(removeShop);
router.route('/api/projects').patch(addProject);
router.route('/api/getprojects/:queryValue').get(getAllShopsProjects);
router.route('/api/get/:shopName').get(findShop);
router.route('/api/repos/hub/:username').get(getGitHubRepos);
router.route('/api/repos/lab/:projectId').get(getGitLabRepos);
router.route('/api/get/:shopName/:projName').get(findProject);
router.route('/api/autocomplete').get(getAutoComplete);

if (env.toLowerCase() == 'production') {
	router.get('*', async (req, res, next) => {
		res.sendFile(path.join('/server', 'public', 'index.html'));
	});
}

export default router;
