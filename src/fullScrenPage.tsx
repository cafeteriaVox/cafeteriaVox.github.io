import { QueryClient, QueryClientProvider, useQuery } from 'react-query';

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
	const queryClient = new QueryClient();

	return (
		<QueryClientProvider client={queryClient}>
			<div className="fullScren">
				<div>
					<ProductList />
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
		</QueryClientProvider>
	);
}

function ProductList() {
	const { data, isLoading, isError } = useQuery<Product[]>('products', async () => {
		const response = await fetch('https://raw.githubusercontent.com/cafeteriaVox/cafeteriaVox.github.io/dev/src/listProduct.json');
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

function focusProduct() {

}
