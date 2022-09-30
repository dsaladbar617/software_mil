import './App.css';
import { useState } from 'react';
import Header from './components/Header';
import { ShopProvider } from './ShopContext';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import ShopsList from './components/ShopsList';
import ShopDetail from './components/ShopDetail';
import {
	MantineProvider,
	ColorSchemeProvider,
	colorScheme
} from '@mantine/core';
import { useLocalStorage } from '@mantine/hooks';

// import { useState } from 'react';

function App() {
	const [colorScheme, setColorScheme] = useLocalStorage({
		key: 'mantine-color-scheme',
		defaultValue: 'dark',
		getInitialValueInEffect: true
	});
	const toggleColorScheme = () =>
		setColorScheme(colorScheme === 'dark' ? 'light' : 'dark');

	return (
		<ColorSchemeProvider
			colorScheme={colorScheme}
			toggleColorScheme={toggleColorScheme}>
			<MantineProvider
				theme={{ colorScheme }}
				withGlobalStyles
				withNormalizeCSS>
				<ShopProvider>
					<Router>
						<Header />
						<Routes>
							<Route path="/" element={<ShopsList />} />
							<Route path="/shop/:shopName" element={<ShopDetail />} />
						</Routes>
					</Router>
				</ShopProvider>
			</MantineProvider>
		</ColorSchemeProvider>
	);
}

export default App;
