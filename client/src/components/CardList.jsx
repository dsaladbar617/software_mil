import { useEffect, useState, useContext } from 'react';
// import ShopCard from './ShopCard';
import { ShopContext } from '../ShopContext';
import axios from 'axios';
import styles from '../styles/ShopsList.module.css';
import TestCard from './TestCard';

const CardList = ({ cards }) => {
	const { values } = useContext(ShopContext);

	return (
		<ul className={styles.shop_list}>
			{cards
				.filter((card) => {
					let searchQuery = Object.values(card)
						.map((item) => {
							if (Array.isArray(item)) {
								// console.log(item);
								return item.map((arrItem) => Object.values(arrItem));
							} else {
								return item;
							}
						})
						.flat(3);

					if (values.searchValue === '') {
						return card;
					} else if (
						searchQuery
							.join()
							.toLowerCase()
							.includes(values.searchValue.toLowerCase())
					) {
						return card;
					}
				})
				.map((card, index) => (
					<li className={styles.cards} key={index}>
						<TestCard className={styles.shops} data={card} />
					</li>
				))}
		</ul>
	);
};

export default CardList;
