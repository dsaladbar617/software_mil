import { Button, Paper, Text } from '@mantine/core';
import { useNavigate } from 'react-router-dom';

const HomePage = () => {
	const nav = useNavigate();

	return (
		<>
			<Paper>
				<Text size="xl">
					This is the homepage for the Air Force Sorftwaire Shoops.{' '}
				</Text>
			</Paper>
			<Button
				onClick={() => {
					nav('/shop');
				}}>
				Shops
			</Button>
		</>
	);
};

export default HomePage;
