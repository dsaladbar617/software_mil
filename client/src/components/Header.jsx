import { TextInput, createStyles } from '@mantine/core';
import { useState, useContext } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { ShopContext } from '../ShopContext';
import styles from '../styles/Header.module.css';

const useStyles = createStyles(() => ({
	root: {
		border: 0,
		borderRadius: 6,
		maxWidth: 600,
		width: 500
	}
}));

const Header = () => {
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
