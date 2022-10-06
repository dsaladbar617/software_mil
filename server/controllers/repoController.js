import axios from 'axios';
import * as dotenv from 'dotenv';

dotenv.config();

const gitHub = axios.create({
	baseURL: 'https://api.github.com',
	headers: {
		Authorization: `token ${process.env.GITHUB_TOKEN}`
	}
});
const gitLab = axios.create({
	baseURL: 'https://gitlab.com/api/v4',
	headers: {
		'PRIVATE-TOKEN': `${process.env.GITLAB_TOKEN}`
		// 'Content-Type': 'application/json'
	}
});

const getGitHubRepos = async (req, res) => {
	let username = req.params.username;
	console.log(username);

	let repos = await gitHub
		.get(`/users/${username}/repos`)
		.then((response) => response.data);

	let allLangs = await Promise.all(
		repos.map((repo) =>
			gitHub.get(repo.languages_url).then((response) => response.data)
		)
	);

	const totalLang = (arr) => {
		let finalObj = {};

		arr.forEach((elem) => {
			for (const property in elem) {
				finalObj[property] !== undefined
					? (finalObj[property] += elem[property])
					: (finalObj[property] = elem[property]);
			}
		});

		let totalNum = Object.values(finalObj).reduce(
			(total, item) => (total += item)
		);

		for (let property in finalObj) {
			finalObj[property] = parseFloat(
				((finalObj[property] / totalNum) * 100).toFixed(2)
			);
			console.log(typeof finalObj[property]);
		}
		let final = Object.entries(finalObj).map((item) => {
			return { name: item[0], value: item[1] };
		});

		return final;
	};

	// res.status(200).json(allLangs);
	res.status(200).json(totalLang(allLangs));
};

const getGitLabRepos = async (req, res) => {
	let projectId = req.params.projectId;

	let languageData = await gitLab
		.get(`/projects/${projectId}/languages`)
		.then((response) => response.data);

	console.log(languageData);

	res.status(200).json(languageData);
};

export { getGitHubRepos, getGitLabRepos };
