import { Card, Image, createStyles, Box } from '@mantine/core';
import { useNavigate, useLocation } from 'react-router-dom';
import { useContext } from 'react';
import { ShopContext } from '../../ShopContext';
import styles from '../../styles/TestCard.module.css';

const useStyles = createStyles((theme) => ({
	root: {
		backgroundColor: theme.colors.gray,
		color: theme.black
	}
}));

const CardTemplate = ({ data }) => {
	const location = useLocation();
	const { setters } = useContext(ShopContext);
	const nav = useNavigate();
	const { classes } = useStyles();
	// Deconstruct the data prop to get the name and img property
	const { name, img } = data;
	// Get the value of the url
	const url = location.pathname;
	return (
		<Box>
			<Card
				onClick={() => {
					// Depending on users location navigate to the correct details page and set the correct shop/project in the global context.
					if (url.includes('projects')) {
						setters.setSelectedProject(data);
						console.log(data);
						nav(`${url}/${name}`);
					} else {
						setters.setSelectedShop(data);
						nav(`/shop/${name}`);
					}
				}}
				shadow="xl"
				radius="lg"
				withBorder
				style={{ root: classes.root }}>
				<Box
					className={styles.ar_image}
					sx={{
						padding: 10,
						textAlign: 'center'
					}}>
					<Image
						className={styles.article_image}
						src={`/${img}.png`}
						height={285}
						fit="contain"
						alt={`${name}'s logo`}></Image>
					<p className={styles.name}>{name}</p>
				</Box>
			</Card>
		</Box>
	);
};

export default CardTemplate;
