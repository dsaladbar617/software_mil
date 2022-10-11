import styles from '../styles/ProgressBar.module.css';
import React from 'react';

const ProgressBar = ({ data }) => {
	let colorArray = [
		'#FF6633',
		'#E6B333',
		'#3366E6',
		'#FFFF99',
		'#999966',
		'#99FF99',
		'#00B3E6',
		'#B34D4D',
		'#80B300',
		'#809900',
		'#E6B3B3',
		'#6680B3',
		'#66991A',
		'#FF99E6',
		'#CCFF1A',
		'#FF1A66',
		'#E6331A',
		'#33FFCC',
		'#66994D',
		'#B366CC',
		'#4D8000',
		'#B33300',
		'#FFB399',
		'#CC80CC',
		'#66664D',
		'#FF33FF',
		'#991AFF',
		'#E666FF',
		'#4DB3FF',
		'#1AB399',
		'#E666B3',
		'#33991A',
		'#CC9999',
		'#B3B31A',
		'#00E680',
		'#4D8066',
		'#809980',
		'#E6FF80',
		'#1AFF33',
		'#999933',
		'#FF3380',
		'#CCCC00',
		'#66E64D',
		'#4D80CC',
		'#9900B3',
		'#E64D66',
		'#4DB380',
		'#FF4D4D',
		'#99E6E6',
		'#6666FF'
	];

	let test = data.map((elem, index) => ({
		...elem,
		color: colorArray[index]
	}));

	const bars = test.map((item, index) =>
		item.value > 1 ? (
			<div
				className={styles.bar}
				style={{
					backgroundColor: item.color,
					width: item.value + '%'
				}}
				key={index}></div>
		) : null
	);

	const legends = test.map((item, index) =>
		item.value > 1 ? (
			<div className={styles.legend} key={index}>
				<span className="dot" style={{ color: item.color }}>
					●
				</span>
				<span className="label">{`\u00A0${item.name} \u00A0${item.value}%`}</span>
			</div>
		) : null
	);

	return (
		<div className={styles.multicolor_bar}>
			<div className={styles.bars}>{bars}</div>
			<div className={styles.legends}>{legends}</div>
		</div>
	);
};

export default ProgressBar;
