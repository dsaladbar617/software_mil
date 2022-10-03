import { Card, Image, createStyles, Overlay, Box, Text } from '@mantine/core';
import { useNavigate } from 'react-router-dom';
import { useContext } from 'react';
import { ShopContext } from '../ShopContext';
import styles from '../styles/TestCard.module.css';

const useStyles = createStyles((theme) => ({
	root: {
		backgroundColor: theme.colors.gray
	}
}));

const TestCard = ({ shop }) => {
	const { setters } = useContext(ShopContext);
	const nav = useNavigate();
	const { classes } = useStyles();
	const { name, img } = shop;

	return (
		<Box>
			<Card
				onClick={() => {
					nav(`/shop/${name}`);
					setters.setSelectedShop(shop);
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
						radius={250}
						fit="contain"
						alt={`${name}'s logo`}></Image>
					<p className={styles.name}>{name}</p>
				</Box>
			</Card>
		</Box>
	);
};

export default TestCard;
