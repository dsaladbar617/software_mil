import {
	TextInput,
	createStyles,
	Button,
	Container,
	useMantineColorScheme
} from '@mantine/core';
import { useState, useContext } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { ShopContext } from '../ShopContext';
import styles from '../styles/Header.module.css';
import { IconSun, IconMoon, IconChevronLeft, IconAnkh } from '@tabler/icons';

const useStyles = createStyles(() => ({
	root: {
		border: 0,
		borderRadius: 6,
		maxWidth: 600,
		width: 500
	}
}));

const Header = () => {
	const { colorScheme, toggleColorScheme } = useMantineColorScheme();

	const location = useLocation();
	const { values, setters } = useContext(ShopContext);
	const nav = useNavigate();
	const { classes } = useStyles();
	const [value, setValue] = useState('');

	const handleUserInput = (e) => {
		setValue(e.target.value);
		setters.setSearchValue(e.target.value);
	};

	return (
		<div className={styles.sticky}>
			<div className={styles.head}>
				{location.pathname.includes('shop') ? (
					<Button
						color="gray"
						className={styles.back}
						onClick={() => {
							// setters.setSearchValue('');
							location.pathname.includes('projects') ? nav(-1) : nav('/');
						}}>
						{' '}
						<IconChevronLeft size={18} />{' '}
					</Button>
				) : null}
				<h1
					className={styles.title}
					onClick={() => {
						setters.setSearchValue('');
						nav('/');
					}}>
					<IconAnkh size={24} /> Sorftwair Shoops <IconAnkh size={24} />
				</h1>
				<Button
					color="gray"
					className={styles.theme_button}
					onClick={toggleColorScheme}>
					{colorScheme === 'dark' ? (
						<IconSun size={18} />
					) : (
						<IconMoon size={18} />
					)}
				</Button>
			</div>

			{location.pathname.includes('projects') ||
			!location.pathname.includes('shop') ? (
				<div className={styles.search}>
					<TextInput
						placeholder="Search..."
						value={values.searchValue}
						onChange={handleUserInput}
						styles={{ root: classes.root, label: classes.label }}
					/>
				</div>
			) : null}
		</div>
	);
};

export default Header;
