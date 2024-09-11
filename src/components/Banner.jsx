import React from 'react';
import { Link } from 'react-router-dom';
// import femi from "../../public/img/adidas_4.jpg";


function Banner() {
  return (
    <div>
        <div className="steph z-[0]">
            <img src="/img/adidas_4.jpg" alt="" />
            <div className="like"></div>
            <div className="steph-container font-bold text-4xl uppercase text-[#fff]">
                <h2>Welcome to JHFVN Stores</h2>
                <h2>Lorem ipsum dolor sit amet.</h2>
                <Link to="" className="">See Products</Link>
            </div>
        </div>
        {/* 502274 A42CD6 */}
    </div>
  )
}

export default Banner;
