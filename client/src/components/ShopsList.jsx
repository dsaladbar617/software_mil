import { useEffect, useState, useContext } from 'react';
// import ShopCard from './ShopCard';
import { ShopContext } from '../ShopContext';
import axios from 'axios';
import styles from '../styles/ShopsList.module.css';
import TestCard from './TestCard';

const ShopsList = () => {
	const { values } = useContext(ShopContext);
	const [shops, setShops] = useState([]);

	useEffect(() => {
		axios.get('http://localhost:8080/api').then((res) => {
			setShops(res.data);
		});
	}, []);

	return (
		<ul className={styles.shop_list}>
			{shops
				.filter((shop) => {
					// console.log(shop);
					if (values.searchValue === '') {
						return shop;
					} else if (
						shop.name.toLowerCase().includes(values.searchValue.toLowerCase())
					) {
						return shop;
					}
				})
				.map((shop, index) => (
					<li key={index}>
						<TestCard className={styles.shops} shop={shop} />
					</li>
				))}
			{/* {shops.map((shop, index) => (
				<ShopCard className={styles.shops} key={index} shop={shop} />
			))} */}
		</ul>
	);
};

export default ShopsList;
