import { useContext } from 'react';
import { ShopContext } from '../../ShopContext';
import styles from '../../styles/CardList.module.css';
import CardTemplate from './CardTemplate';

const CardList = ({ cards }) => {
	// Get values from the global context object
	const { values } = useContext(ShopContext);

	// Function used to get all of the relevant cards to display in a list format.
	const searchCards = (items) => {
		return (
			items
				// Return only the cards that match the searchValue from context
				?.filter((card) => {
					// Get all values from each object in the array
					let searchQuery = Object.values(card)
						// Check each of the values to see if it is an array
						.map((item) => {
							// Item is array
							if (Array.isArray(item)) {
								// If the items in the array are strings, return the strings
								if (typeof item[0] === 'string') {
									return item;
									// If the items inside of the array are also arrays get the values from the objects in that array
								} else {
									return item.map((arrItem) => Object.values(arrItem));
								}
								// Item is not an array just return the string
							} else {
								return item;
							}
						})
						// convert multidimensional array to a single level array
						.flat(3);

					// If there is no searchValue return all cards
					if (values.searchValue === '') {
						return card;

						// If there is a searchValue return the cards that have values that include the searchValue. Not Case Sensitive.
					} else if (
						searchQuery
							.join()
							.toLowerCase()
							.includes(values.searchValue.toLowerCase())
					) {
						return card;
					}
				})
				// For each card that is returned create a CardTemplate component to display
				.map((card, index) => {
					if (card.shopName === undefined) {
						return (
							<li className={styles.cards} key={index}>
								<CardTemplate className={styles.shops} data={card} />
							</li>
						);
					} else if (card.shopName !== undefined) {
						return card.projects.map((project, i) => (
							<li className={styles.cards} key={`${index}${i}`}>
								<CardTemplate
									className={styles.shops}
									data={project}
									shopName={card.shopName}
								/>
							</li>
						));
					}
				})
		);
	};

	return (
		<div className={styles.scroll}>
			<ul className={styles.shop_list}>{searchCards(cards)}</ul>
		</div>
	);
};

export default CardList;
