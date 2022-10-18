import {
	TextInput,
	createStyles,
	Button,
	useMantineColorScheme
} from '@mantine/core';
import { useState, useContext } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { ShopContext } from '../../ShopContext';
import styles from '../../styles/Header.module.css';
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
	const url = location.pathname.split('/');
	const urlEnd = url[url.length - 1];

	const handleUserInput = (e) => {
		setValue(e.target.value);
		setters.setSearchValue(e.target.value);
	};

	return (
		<div className={styles.sticky}>
			<div className={styles.head_container}>
				<div className={styles.head}>
					{location.pathname.includes('shop') ? (
						<Button
							color="gray"
							className={styles.back}
							onClick={() => {
								nav(-1);
								// location.pathname.includes('projects') ? nav(-1) : nav('/');
							}}>
							{' '}
							<IconChevronLeft size={18} />{' '}
						</Button>
					) : null}
					<div
						className={styles.title}
						onClick={() => {
							setters.setSearchValue('');
							nav('/');
						}}>
						<img src="/tyet.png" alt="tyet symbol" />
						<h1>Sorftwair Shoops</h1>
					</div>
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
				<div className={styles.duh}>
					{urlEnd === 'shop' || urlEnd === 'projects' ? (
						// location.pathname.includes('projects') ||
						// !location.pathname.includes('shop') ?
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
			</div>
		</div>
	);
};

export default Header;
