import { TextInput, createStyles, Button } from '@mantine/core';
import { useState, useContext } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { ShopContext } from '../ShopContext';
import styles from '../styles/Header.module.css';
import { IconSun, IconMoon } from '@tabler/icons';
import { useMantineColorScheme } from '@mantine/core';

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
	const { setters } = useContext(ShopContext);
	const nav = useNavigate();
	const { classes } = useStyles();
	const [value, setValue] = useState('');

	const handleUserInput = (e) => {
		setValue(e.target.value);
		setters.setSearchValue(e.target.value);
	};

	return (
		<>
			<div className={styles.head}>
				<h1
					className={styles.title}
					onClick={() => {
						nav('/');
					}}>
					Sorftwair Shoops
				</h1>
				<Button className={styles.theme_button} onClick={toggleColorScheme}>
					{colorScheme === 'dark' ? (
						<IconSun size={18} />
					) : (
						<IconMoon size={18} />
					)}
				</Button>
			</div>
			{location.pathname.includes('shop') ? null : (
				<div className={styles.search}>
					<TextInput
						placeholder="Search..."
						value={value}
						// onChange={(event) => {
						// 	setters.setSearchValue(event.currentTarget.value);
						// }}
						onChange={handleUserInput}
						styles={{ root: classes.root, label: classes.label }}
					/>
				</div>
			)}
		</>
	);
};

export default Header;
