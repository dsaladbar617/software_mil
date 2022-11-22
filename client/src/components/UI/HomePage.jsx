import { Button, Card, Text, useMantineTheme } from '@mantine/core';
import { useNavigate } from 'react-router-dom';
import styles from '../../styles/HomePage.module.css';

const HomePage = () => {
	const nav = useNavigate();
	const theme = useMantineTheme();

	return (
		<>
			<Card className={styles.container}>
				<Card.Section className={styles.section}>
					<Text size="xl" className={styles.textBox}>
						Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
						eiusmod tempor incididunt ut labore et dolore magna aliqua. Arcu dui
						vivamus arcu felis bibendum ut. Ullamcorper dignissim cras tincidunt
						lobortis feugiat vivamus at. Pulvinar mattis nunc sed blandit libero
						volutpat sed. Est ullamcorper eget nulla facilisi etiam dignissim.
						Purus in massa tempor nec feugiat nisl pretium. Lacus sed turpis
						tincidunt id aliquet risus. Diam volutpat commodo sed egestas.
						Volutpat consequat mauris nunc congue nisi. Non quam lacus
						suspendisse faucibus interdum posuere lorem. Est sit amet facilisis
						magna. Adipiscing bibendum est ultricies integer quis auctor elit
						sed vulputate. Eu nisl nunc mi ipsum faucibus vitae aliquet nec
						ullamcorper. Mattis vulputate enim nulla aliquet porttitor lacus. At
						augue eget arcu dictum varius. Nullam ac tortor vitae purus faucibus
						ornare suspendisse. Lectus mauris ultrices eros in cursus turpis
						massa tincidunt dui. Elementum eu facilisis sed odio. Netus et
						malesuada fames ac. Aliquam id diam maecenas ultricies. Volutpat
						commodo sed egestas egestas fringilla phasellus faucibus scelerisque
						eleifend. Porta non pulvinar neque laoreet. Odio euismod lacinia at
						quis risus sed vulputate odio ut. Vitae tortor condimentum lacinia
						quis vel eros donec ac odio. Sed id semper risus in. Faucibus ornare
						suspendisse sed nisi lacus sed viverra tellus in. Quis enim lobortis
						scelerisque fermentum. Luctus venenatis lectus magna fringilla.
						Aliquam id diam maecenas ultricies. Egestas egestas fringilla
						phasellus faucibus scelerisque eleifend donec. Sed lectus vestibulum
						mattis ullamcorper velit. A pellentesque sit amet porttitor eget
						dolor morbi. Eu lobortis elementum nibh tellus molestie nunc. Vitae
						proin sagittis nisl rhoncus. Pharetra convallis posuere morbi leo
						urna molestie at elementum. Habitant morbi tristique senectus et
						netus et malesuada fames ac. Tellus molestie nunc non blandit massa
						enim nec dui nunc. Dictum non consectetur a erat nam. Viverra justo
						nec ultrices dui sapien eget. Ac feugiat sed lectus vestibulum
						mattis. Elementum pulvinar etiam non quam lacus suspendisse
						faucibus. Posuere ac ut consequat semper viverra. Ipsum a arcu
						cursus vitae. Ornare lectus sit amet est placerat in egestas.
						Pharetra et ultrices neque ornare aenean euismod elementum. Tempor
						orci dapibus ultrices in iaculis nunc sed augue lacus. Nulla aliquet
						enim tortor at auctor urna. Ultricies tristique nulla aliquet enim
						tortor at auctor urna nunc. Fermentum dui faucibus in ornare quam
						viverra orci sagittis eu. Eget nulla facilisi etiam dignissim diam
						quis enim. Tellus elementum sagittis vitae et leo. Elit duis
						tristique sollicitudin nibh sit amet commodo. Lacus sed turpis
						tincidunt id aliquet risus feugiat. Ultrices neque ornare aenean
						euismod elementum. Sit amet dictum sit amet justo donec enim diam.
						Congue eu consequat ac felis donec. Ullamcorper velit sed
						ullamcorper morbi tincidunt ornare. Sed arcu non odio euismod
						lacinia at quis risus. Vulputate ut pharetra sit amet aliquam.
						Placerat in egestas erat imperdiet sed. Elementum curabitur vitae
						nunc sed velit dignissim sodales ut. Et malesuada fames ac turpis
						egestas maecenas pharetra. Nisl purus in mollis nunc sed id semper.
						Amet consectetur adipiscing elit ut aliquam purus sit amet luctus.
						Ante metus dictum at tempor commodo ullamcorper a lacus vestibulum.
						Sed libero enim sed faucibus turpis in eu mi. Turpis cursus in hac
						habitasse platea dictumst quisque sagittis purus. Porttitor rhoncus
						dolor purus non enim praesent. Elementum integer enim neque volutpat
						ac tincidunt vitae semper.
					</Text>
					<Button
						className={styles.btn}
						color="gray"
						onClick={() => {
							nav('/shop');
						}}
						sx={{ padding: 9 }}>
						View Shops
					</Button>
				</Card.Section>
			</Card>
		</>
	);
};

export default HomePage;
