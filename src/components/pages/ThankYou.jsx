import React, { useContext, useEffect } from "react";
import { Link, useSearchParams, Navigate } from "react-router-dom";
import EcomContext from "../../context/EcomContext";

function ThankYou() {
  const { createOrder, order, isAuthenticated } = useContext(EcomContext);
  const [searchParams] = useSearchParams();
  const tx_ref = searchParams.get("tx_ref");
  const transaction_id = searchParams.get("transaction_id");

  if (!isAuthenticated) {
    return <Navigate to="/login" />;
  }
  useEffect(() => {
    if (transaction_id && tx_ref) {
      createOrder(transaction_id, tx_ref);
    }
  }, []);


  return (
    <div>
      <div className="h space-y-3 shadow-lg p-3 bg-[white] max-w-[40rem] contain">
        <div className="dicon">
          <i className="fa-solid fa-circle-check mt-5 ico"></i>
        </div>
        <div className="space-y-3 text">
          <h1 className="text-3xl font-bold capitalize">
            thank you for shopping with us
          </h1>
          <p className="capitalize">your order number is {}</p>
          <p>we will send your order confirmation to </p>
          <p className="font-semibold">
            <span>
              <i className="fa-regular fa-envelope"></i>
            </span>{" "}
            {order?.email}
          </p>
        </div>
        <hr className="bg-[brown] " />
        <div className=" mx-4 my-3 delivery">
          <h1 className="my-3 capitalize text-center font-semibold text-2xl">
            order details
          </h1>
          <h3 className="my-3 capitalize font-semibold text-lg">
            contact details
          </h3>
          <h1 className="my-px capitalize"></h1>
          <h1 className="my-px capitalize">{order?.firstName} {order?.lastName}</h1>
          <h2 className="my-3 capitalize font-semibold text-lg">
            shipping address
          </h2>
          <p className="my-px capitalize">
            {order?.address}
          </p>
          <p className="my-px capitalize">
            {order?.phone}
          </p>
          <h2 className="my-3 capitalize font-semibold text-lg">
            shipping method
          </h2>
          <p className="my-px capitalize">express shipping</p>
          <hr />
          <h1 className="my-3 capitalize font-semibold text-2xl text-center">
            order summary
          </h1>
          {/* <p className="my-px capitalize">Transaction Id: </p> */}
          <p className="my-px capitalize">Transaction Id: {transaction_id} </p>
          {/* <p className="my-px capitalize">Order Date: </p> */}
          <p className="my-px capitalize">Order Date: {new Date(order?.date).toLocaleDateString()} </p>
          <p className="my-px capitalize">
            {/* order total: <s>#</s> */}
            order total: <s>#{order?.amount}</s>
          </p>

          <Link to="/product">
            <button className="bg-[brown] p-3 rounded-md my-3 text-[blanchedalmond] capitalize  ">
              Continue shopping
            </button>
          </Link>
        </div>
      </div>
    </div>
  );
}

export default ThankYou;
