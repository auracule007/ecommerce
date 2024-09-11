import React, { useContext, useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import EcomContext from "../../context/EcomContext";
import ProductImages from "../ProductImages";

function Details() {
  const { product, addToCart } = useContext(EcomContext);
  const params = useParams();
  const showItems = params.id;
  const productItems = product.find((items) => items._id === showItems);
  const [selectedImages, setSelectedImages] = useState(
    productItems?.images?.[0].img
  );

  useEffect(() => {
    setSelectedImages(productItems?.images?.[0].img);
  }, [productItems]);
  return (
    <div>
      <div className="container max-w-5xl mx-auto my-24">
        <h1 className="text-2xl my-5 uppercase font-bold text-center">
          {productItems?.name} Detail
        </h1>
        <div className="grid grid-cols-1 md:grid-cols-2 align-center justify-center">
          <div className="p-5">
            <img src={selectedImages} alt="" />
          </div>
          <div>
            <div className="card-body">
              <h2 className="text-xl font-bold uppercase pt-3 pb-3">
                {productItems?.name}
              </h2>
              {/* <p className="text-xl font-bold uppercase pt-3 pb-3">Tag: {productItems?.category.name}</p> */}
              <h5 className="text-xl font-bold uppercase pt-3 pb-3">
                #{productItems?.price}
              </h5>
              <p className="pb-5">{productItems?.description}.</p>
              <button
                // onClick={() => addToCart({ ...productItems, quantity: 1 })}
                onClick={() => addToCart(productItems._id, 1, productItems)} 
                type="submit"
                className="product-btn p-2 text-[#fff] rounded capitalize hover:bg-[#A42CD6] bg-[#502274]"
              >
                Add to cart
              </button>
            </div>
            {/*  */}
            <ProductImages
              images={productItems?.images}
              setSelectedImages={setSelectedImages}
            />
            {/*  */}
          </div>
        </div>
      </div>
    </div>
  );
}

export default Details;
