import React, { useContext, useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import EcomContext from '../../context/EcomContext';
import { HiXMark } from 'react-icons/hi2';


function Cart() {
  const { cartItems, calculateSubTotal, calculateVat, calculateTotalAmount, removeCartItems, updateCartItems }=useContext(EcomContext);

  return (
    <div>
      <div className="container max-w-5xl mx-auto my-24">
            <div className="grid grid-cols-1">
                <div className="p-3 table shadow-lg">
                    <table>
                        <thead>
                            <tr>
                            <th>Name</th>
                            <th>Product Image</th>
                            <th>Price</th>
                            <th>Amount</th>
                            <th>Update</th>
                            <th>Remove</th>
                            </tr>
                        </thead>

                        <tbody>
                            {cartItems.products?.map((item) => (
                                <tr key={item.product._id}>
                                    <td>{item.product?.name}</td>
                                    <td className="flex align-center justify-center"><img src={item.product?.images[0]?.img} width="50px" alt={item.product?.name} /></td>
                                    <td>#{item.product?.price}</td>
                                    <td>#{item.amount}</td>
                                    <td>
                                        <input type="number" className="w-[3.5rem]" min={"1"} onChange={(e) => updateCartItems(item.product._id, e.target.value)}  value={item.quantity} id="" />
                                    </td>
                                    <td>
                                        <button type="submit" onClick={() => removeCartItems(item.product?._id)}><HiXMark className="text-2xl" /></button>
                                    </td>
                                </tr>   
                            ))}
                            </tbody>
                        </table>
                        <table>
                            <tbody>
                                <tr>
                                    <td></td>
                                    <td></td>
                                    <td></td>
                                    <td></td>
                                    <td></td>
                                    <td></td>
                                    <td></td>
                                    <td className="">Subtotal: #{calculateSubTotal()}</td>
                                </tr>
                                <tr>
                                    <td></td>
                                    <td></td>
                                    <td></td>
                                    <td></td>
                                    <td></td>
                                    <td></td>
                                    <td></td>
                                    <td className="">VAT (7.5%): #{calculateVat()}</td>
                                </tr>
                                <tr>
                                    <td></td>
                                    <td></td>
                                    <td></td>
                                    <td></td>
                                    <td></td>
                                    <td></td>
                                    <td></td>
                                    <td className="">Total: #{calculateTotalAmount()}</td>
                                </tr>
                                <tr>
                                    <td></td>
                                    <td></td>
                                    <td></td>
                                    <td></td>
                                    <td></td>
                                    <td></td>
                                     <td></td>
                                    <td className=""><Link to="/checkout" className="product-btn p-2 text-[#fff] rounded capitalize hover:bg-[#A42CD6] bg-[#502274]">Checkout</Link></td>
                                </tr>
                            </tbody>
                        </table>
                </div>
            </div>
      </div>
    </div>
  )
}

export default Cart
