import styles from './styles/ShopCard.module.css';

const ShopCard = ({ shop }) => {
	const { desc, name, location } = shop;

	console.log(name);

	// console.log(shop);
	return (
		<div className={styles.card}>
			<h2>{name}</h2>
			<div>img</div>
			<div>{location}</div>
			<div>{desc}</div>
		</div>
	);
};

export default ShopCard;
