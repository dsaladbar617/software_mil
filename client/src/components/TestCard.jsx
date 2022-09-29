import { Card, Image, Text, Group, createStyles } from '@mantine/core';
import { useNavigate } from 'react-router-dom';
import { useContext } from 'react';
import { ShopContext } from '../ShopContext';

const useStyles = createStyles((theme) => ({
	root: {
		backgroundColor: theme.colors.gray
	}
}));

const TestCard = ({ shop }) => {
	const { setters } = useContext(ShopContext);
	const nav = useNavigate();
	const { classes } = useStyles();
	const { desc, name, location } = shop;
	return (
		<Card
			onClick={() => {
				nav(`/shop/${name}`);
				setters.setSelectedShop(shop);
			}}
			shadow="xl"
			p="lg"
			radius="lg"
			withBorder
			style={{ root: classes.root }}>
			<Card.Section>
				<Image
					src="/Conjure.png"
					height={185}
					fit="contain"
					alt="Conjure Flame"
				/>
			</Card.Section>

			<Group position="apart" mt="md" mb="xs">
				<Text weight={500}>{name}</Text>
				<Text weight={400}>{location}</Text>
			</Group>

			<Text size="sm" color="dimmed">
				{desc}
			</Text>
		</Card>
	);
};

export default TestCard;
