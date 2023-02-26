import axios from 'axios'
import { useEffect, useState } from 'react';

export default function FullScrenPage() {
    return (
        <div className="fullScren">
            <div className='productList'>
                {GetProductList()}
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

    function GetProductList() {
        const [product, setProduct] = useState(<>wating...</>)
        getProduct().then((value) => {
            setProduct(value);
        })
        return product;
        async function getProduct() {
            await axios.get('https://raw.githubusercontent.com/cafeteriaVox/cafeteriaVox.github.io/dev/src/listProduct.json').then(html => {
                // handle success
                const page = html;
            }).catch(error => {
                // handle error
                console.log(error);
            });
            return (<>truc</>)
        }
    }
}