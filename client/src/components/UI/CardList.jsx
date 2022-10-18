import { useContext } from 'react';
import { ShopContext } from '../../ShopContext';
import styles from '../../styles/CardList.module.css';
import TestCard from './TestCard';

const CardList = ({ cards }) => {
	const { values } = useContext(ShopContext);

	return (
		<div className={styles.scroll}>
			<ul className={styles.shop_list}>
				{cards
					.filter((card) => {
						// console.log(card);
						let searchQuery = Object.values(card)
							.map((item) => {
								if (Array.isArray(item)) {
									if (typeof item[0] === 'string') {
										return item;
									} else {
										return item.map((arrItem) => Object.values(arrItem));
									}
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
		</div>
	);
};

export default CardList;
