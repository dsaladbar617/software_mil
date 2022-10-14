import { Card, Image, createStyles, Box } from '@mantine/core';
import { useNavigate, useLocation } from 'react-router-dom';
import { useContext } from 'react';
import { ShopContext } from '../ShopContext';
import styles from '../styles/TestCard.module.css';

const useStyles = createStyles((theme) => ({
	root: {
		backgroundColor: theme.colors.gray,
		color: theme.black
	}
}));

const TestCard = ({ data }) => {
	const location = useLocation();
	const { setters } = useContext(ShopContext);
	const nav = useNavigate();
	const { classes } = useStyles();
	const { name, img } = data;
	const url = location.pathname;

	return (
		<Box>
			<Card
				onClick={() => {
					if (url.includes('projects')) {
						setters.setSelecetedProject(data);
						console.log(data);
						nav(`${url}/${name}`);
					} else {
						setters.setSelectedShop(data);
						nav(`/shop/${name}`);
					}
					setters.setSearchValue('');
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

export default TestCard;
