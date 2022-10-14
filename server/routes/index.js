import express from 'express';
import {
	getShops,
	addShop,
	updateShop,
	removeShop,
	addProject,
	findShop,
	getGitHubRepos,
	getGitLabRepos,
	findProject
} from '../controllers/index.js';
const router = express.Router();

router.route('/api').get(getShops);
router.route('/api').post(addShop);
router.route('/api').patch(updateShop);
router.route('/api').delete(removeShop);
router.route('/api/projects').patch(addProject);
router.route('/api/get/:shopName').get(findShop);
router.route('/api/repos/hub/:username').get(getGitHubRepos);
router.route('/api/repos/lab/:projectId').get(getGitLabRepos);
router.route('/api/get/:shopName/:projName').get(findProject);

export default router;
