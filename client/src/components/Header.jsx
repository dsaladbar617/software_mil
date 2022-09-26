import { TextInput, createStyles } from "@mantine/core";
import { useState } from "react";
import styles from "./Header.module.css";

const useStyles = createStyles(() => ({
	root: {
		border: 0,
		borderRadius: 6,
		maxWidth: 600,
		width: 500
	}
}));

const Header = () => {
	const { classes } = useStyles();
	const [searchValue, setSearchValue] = useState("");
	return (
		<>
			<div className={styles.head}>
				<h1>Sorftwair Shoops</h1>
			</div>
			<div className={styles.search}>
				<TextInput
					placeholder="Search..."
					value={searchValue}
					onChange={(event) => setSearchValue(event.currentTarget.value)}
					styles={{ root: classes.root, label: classes.label }}
				/>
			</div>
		</>
	);
};

export default Header;
