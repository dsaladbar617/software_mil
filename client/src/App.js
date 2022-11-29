import './App.css';
import Header from './components/UI/Header';
import { ShopProvider } from './ShopContext';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import ShopDetail from './components/Shop/ShopDetail';
import { MantineProvider, ColorSchemeProvider } from '@mantine/core';
import { useLocalStorage } from '@mantine/hooks';
import ShopProjects from './components/Shop/ShopProjects';
import ShopPage from './components/Shop/ShopPage';
import ProjectDetail from './components/Project/ProjectDetail';
import HomePage from './components/UI/HomePage';
import AllProjects from './components/Project/AllProjects';

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
				theme={{
					colorScheme: colorScheme,
					colors: {
						dark: [
							'#d5d7e0', // color dark mode
							'#acaebf',
							'#8c8fa3',
							'#666980',
							'#4d4f66',
							'#34354a',
							'#2b2c3d',
							'#1d1e30', // background color dark mode
							'#0c0d21',
							'#01010a'
						]
					}
				}}
				withGlobalStyles
				withCSSVariables
				withNormalizeCSS>
				<ShopProvider>
					<Router>
						<Header />
						<Routes>
							<Route path="/" element={<HomePage />} />
							<Route path="/shop" element={<ShopPage />} />
							<Route path="/shop/:shopName" element={<ShopDetail />} />
							<Route
								path="/shop/:shopName/projects"
								element={<ShopProjects />}
							/>
							<Route
								path="/shop/:shopName/projects/:projectName"
								element={<ProjectDetail />}
							/>
							<Route path="/projects/:searched" element={<AllProjects />} />
						</Routes>
						{/* <ReactQueryDevtools /> */}
					</Router>
				</ShopProvider>
			</MantineProvider>
		</ColorSchemeProvider>
	);
}

export default App;
