import './App.css';
import Header from './components/Header';
import { ShopProvider } from './ShopContext';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import ShopsList from './components/ShopsList';
import ShopDetail from './components/ShopDetail';
// import { useState } from 'react';

function App() {
	// const [opened, setOpened] = useState(false);
	return (
		<ShopProvider>
			<Router>
				<Header />
				<Routes>
					<Route path="/" element={<ShopsList />} />
					<Route path="/shop/:shopName" element={<ShopDetail />} />
				</Routes>
			</Router>
		</ShopProvider>
	);
}

export default App;
