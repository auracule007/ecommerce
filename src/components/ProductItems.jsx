
import React from 'react'
import { Link } from 'react-router-dom'

function ProductItems({ product_item_prop }) {
  return (
    <div>
        <div>
            <div className="p-3 bg-[#fff] card">
                <img src={product_item_prop.images[0].img} alt="" />
                {/* <img src={`http://localhost:8000/${product_item_prop.images[0].img}`} alt="" /> */}
                {/* <img src={`http://localhost:8000/${product_item_prop.img}/`} alt="" /> */}
                {/* <img src={product_item_prop.img} alt="" /> */}
                <div className="card-body">
                    <h2 className="text-xl font-bold uppercase pt-3 pb-3">{product_item_prop.name}</h2>
                    <h5 className="text-xl font-bold uppercase pt-3 pb-3">#{product_item_prop.price}</h5>
                    <p className='pb-5'>{product_item_prop.description}</p>
                    <Link to={`/details/${product_item_prop._id}`} className="product-btn p-2 text-[#fff] rounded capitalize hover:bg-[#A42CD6] bg-[#502274]">see more</Link>
                    <button type="submit" className=""></button>
                </div>
            </div>
        </div>
    </div>
  )
}

export default ProductItems;
