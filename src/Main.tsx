import { useState } from 'react';
import { QueryClient, QueryClientProvider, useQuery } from 'react-query';

type Product = {
	name: string;
	stock: number;
	startingStock: number;
	price: number;
	margin: number;
	color: string;
	type: string;
	image: string;
};

export default function Main() {
	const queryClient = new QueryClient();

	return (
		<QueryClientProvider client={queryClient}>
			<div className="fullScren">
				<div>
					<ProductList />
				</div>
				<div className='focus'>
					<div className='focusProduct'>
						<FocusProduct />
					</div>
					<div className='info'>
						wating...
					</div>
				</div>
			</div>
		</QueryClientProvider>
	);
}

function ProductList() {
	const { data, isLoading, isError } = useQuery<Product[]>('products', async () => {
		const response = await fetch('https://raw.githubusercontent.com/cafeteriaVox/cafeteriaVox.github.io/dev/src/product/listProduct.json');
		const data = await response.json();
		return data;
	});

	if (isLoading) {
		return <div>Loading...</div>;
	}

	if (isError) {
		return <div>Error fetching products</div>;
	}

	return (
		<div className='productList'>
			{data?.map(product => (
				<div className='productBox' key={product.name}>{product.name}</div>
			))}
		</div>
	);
}

function FocusProduct() {
	const [focusnumber, setFocusNumber] = useState(0);
	const { data, isLoading, isError } = useQuery<Product[]>('products', async () => {
		const response = await fetch('https://raw.githubusercontent.com/cafeteriaVox/cafeteriaVox.github.io/dev/src/product/listProduct.json');
		const data = await response.json();
		return data;
	});

	if (isLoading) {
		return <div>Loading...</div>;
	}

	if (isError) {
		return <div>Error fetching products</div>;
	}

	if (Array.isArray(data)) {
		setInterval(() => {
			setFocusNumber(focusnumber + 1 >= data.length - 1 ? 0 : focusnumber + 1);
		}, 60000);
		(data as Array<Product>).sort(() => Math.random() - 0.5);
		let focusProduct = data[focusnumber];
		return <div className='focusProductBox'>
			<img src={focusProduct.image} className='FocusProductImage' alt={focusProduct.image.split('/')[focusProduct.image.split('/').length - 2]} />
			<div>
				<div className='FocusProductName'>
					{focusProduct.name}
				</div>
				<div className='FocusProductPrice'>
					{focusProduct.price}€
				</div>
			</div>
		</div >
	} else {
		return <div>Erreur de type dans Focus Product</div>
	}
}
