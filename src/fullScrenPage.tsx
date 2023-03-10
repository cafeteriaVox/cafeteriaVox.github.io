import { useEffect, useState } from "react";
import axios from 'axios';

type Product = {
	name: string;
	stock: number;
	startingStock: number;
	price: number;
	margin: number;
	color: string;
	type: string;
};

export default function FullScrenPage() {
	return (
		<div className="fullScren">
			<div className='productList'>
				{ProductList()}
			</div>
			<div className='focus'>
				<div className='focusProduct'>
					wating...
				</div>
				<div className='info'>
					wating...
				</div>
			</div>
		</div>
	);
	function ProductList() {
		const [products, setProducts] = useState<Product[]>([]);

		useEffect(() => {
			axios.get('https://raw.githubusercontent.com/cafeteriaVox/cafeteriaVox.github.io/dev/src/listProduct.json')
				.then(response => {
					const data = response.data;
					console.log(data);
					if (Array.isArray(data)) {
						setProducts(data);
					}
				})
				.catch(error => {
					console.error(error);
				});
		}, []);

		return (
			<ul>
				{products.map(product => (
					<li key={product.name}>{product.name}</li>
				))}
			</ul>
		);
	}
}