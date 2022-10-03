import { useEffect, useState, useContext } from 'react';
// import ShopCard from './ShopCard';
import { ShopContext } from '../ShopContext';
import axios from 'axios';
import styles from '../styles/ShopsList.module.css';
import TestCard from './TestCard';

const ShopsList = () => {
	const { values } = useContext(ShopContext);
	const [shops, setShops] = useState([]);
	// const [visible, setVisible] = useState(true);

	useEffect(() => {
		axios.get('http://localhost:8080/api').then((res) => {
			setShops(res.data);
		});
	}, []);

	return (
		<ul className={styles.shop_list}>
			{shops
				.filter((shop) => {
					let test = Object.values(shop)
						.map((item) => {
							if (Array.isArray(item)) {
								// console.log(item);
								return item.map((arrItem) => Object.values(arrItem));
							} else {
								return item;
							}
						})
						.flat(3);
					// .map((elem) => elem.toLowerCase());

					console.log(shop, test);
					if (values.searchValue === '') {
						return shop;
					} else if (
						test.join().toLowerCase().includes(values.searchValue.toLowerCase())
					) {
						return shop;
					}
				})
				.map((shop, index) => (
					<li className={styles.cards} key={index}>
						<TestCard className={styles.shops} shop={shop} />
					</li>
				))}
		</ul>
	);
};

export default ShopsList;

/*
<ul className={styles.shop_list}>
			{shops
				.filter((shop) => {
					// console.log(shop);
					if (values.searchValue === '') {
						return shop;
					} else if (
						shop.name.toLowerCase().includes(values.searchValue.toLowerCase())
					) {
						console.log(Object.values(shop));
						return shop;
					}
				})
				.map((shop, index) => (
					<li className={styles.cards} key={index}>
						<TestCard className={styles.shops} shop={shop} />
					</li>
				))}
		</ul>
		*/
