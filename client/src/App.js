import './App.css';
import Header from './components/Header';
import { ShopProvider } from './ShopContext';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import ShopsList from './components/ShopsList';
import ShopDetail from './components/ShopDetail';
import { MantineProvider, ColorSchemeProvider } from '@mantine/core';
import { useLocalStorage } from '@mantine/hooks';
import ShopProjects from './components/ShopProjects';
import HomePage from './components/HomePage';
import ProjectDetail from './components/ProjectDetail';

import { ReactQueryDevtools } from '@tanstack/react-query-devtools';

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
				withCSSVariables
				withNormalizeCSS>
				<ShopProvider>
					<Router>
						<Header />
						<Routes>
							<Route path="/" element={<HomePage />} />
							<Route path="/shop/:shopName" element={<ShopDetail />} />
							<Route
								path="/shop/:shopName/projects"
								element={<ShopProjects />}
							/>
							<Route
								path="/shop/:shopName/projects/:projectName"
								element={<ProjectDetail />}
							/>
						</Routes>
						<ReactQueryDevtools />
					</Router>
				</ShopProvider>
			</MantineProvider>
		</ColorSchemeProvider>
	);
}

export default App;
