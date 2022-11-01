import {
	TextInput,
	createStyles,
	Button,
	useMantineColorScheme,
	Autocomplete
} from '@mantine/core';
import { useContext, useEffect, useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { ShopContext } from '../../ShopContext';
import styles from '../../styles/Header.module.css';
import { IconSun, IconMoon, IconChevronLeft } from '@tabler/icons';
import axios from 'axios';

// Create a default style to apply to the mantine TextInput
const useStyles = createStyles(() => ({
	root: {
		border: 0,
		borderRadius: 6,
		maxWidth: 600,
		width: 500
	}
}));

const Header = () => {
	// Mantine function to switch between light and dark mode
	const { colorScheme, toggleColorScheme } = useMantineColorScheme();
	// React hook to get the current location of the user. In this case url pathname
	const location = useLocation();
	// Get the getters and setters from the global context
	const { values, setters } = useContext(ShopContext);
	// React hook to navigate to a different route
	const nav = useNavigate();
	// Make the mantine styling function accesible to the component
	const { classes } = useStyles();
	// return the url as an array.
	const urlArr = location.pathname.split('/');
	// Get the last element which is used to determine the navigation options.
	const urlEnd = urlArr[urlArr.length - 1];

	// Function used to set the searchValue in the global context.
	const handleUserInput = (e) => {
		// console.log(e);
		setters.setSearchValue(e);
	};

	const [auto, setAuto] = useState([]);

	useEffect(() => {
		console.log(auto);
		if (auto.length === 0) {
			axios.get('/api/autocomplete').then((res) => {
				console.log(res.data);
				setAuto(res.data);
			});
		}
	}, []);

	// console.log(auto);

	return (
		<div className={styles.sticky}>
			<div className={styles.head_container}>
				<div className={styles.head}>
					{
						// If the url includes the string shop return the back button. Otherwise do not render the back button.
						location.pathname.includes('shop') ||
						location.pathname.includes('projects') ? (
							<Button
								color="gray"
								className={styles.back}
								onClick={() => {
									console.log(urlArr);
									if (urlArr[1] === 'projects') {
										nav(-1);
									} else {
										urlArr.pop();
										let navUrl = urlArr.join('/');
										nav(navUrl);
									}
								}}>
								{' '}
								<IconChevronLeft size={18} />{' '}
							</Button>
						) : null
					}
					<div
						className={styles.title}
						onClick={() => {
							// Navigate to the homepage and clear the searchValue in the global context.
							setters.setSearchValue('');
							nav('/shop');
						}}>
						{/* Placeholder for icon */}
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
				<div className={styles.themeToggle}>
					{
						// use urlEnd value to determine if the searchbar will be rendered or not
						urlEnd === 'shop' || urlEnd === 'projects' ? (
							<div className={styles.search}>
								<Autocomplete
									initiallyOpened={false}
									placeholder="Search..."
									value={values.searchValue}
									limit={3}
									onChange={handleUserInput}
									styles={{ root: classes.root, label: classes.label }}
									data={auto}
								/>
							</div>
						) : null
					}
				</div>
			</div>
		</div>
	);
};

export default Header;
