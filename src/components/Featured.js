import React, { useEffect, useState } from "react";
import "./Featured.css";

import { FiArrowUpRight, FiArrowDown } from "react-icons/fi";
import axios from "axios";

const Featured = () => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);

  const doApi = async () => {
    const url =
      'https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&order=market_cap_desc&per_page=6&page=1&sparkline=false&locale=en';
      // the api from CoinGecko.
    try {
      const response = await axios.get(url);
      setData(response.data);
      setLoading(false);
    } catch (error) {
      console.error('Error fetching data:', error);
      setLoading(false);
    }
  };

  useEffect(() => {
    doApi();
  },[]);

  return (
    <div className="featured">
    <div className="container">
      <div className="left">
        <h2>Explore top Crypto's Like Bitcoin, Ethereum, and Dogecoin</h2>
        <p>See all available assets: Cryptocurrencies and NFT's</p>
        <button className="btn">See More Coins</button>
      </div>


         {/* Right */}
      <div className="right">
        {loading ? (
          <p>Loading data...</p>
        ) : (
          data.map((item) => (
            <div key={item.id} className="card">
              <div className="top">
                <img src={item.image} alt="" />
              </div>
              <div>
                <h5>{item.name}</h5>
                <p>{item.current_price.toLocaleString()}</p>
              </div>
              {item.price_change_percentage_24h < 0 ? (
                <span className='red'>
                  <FiArrowDown className='icon' />
                  {item.price_change_percentage_24h.toFixed(2)}%
                </span>
              ) : (
                <span className='green'>
                  <FiArrowUpRight className='icon' />
                  {item.price_change_percentage_24h.toFixed(2)}%
                </span>
              )}
            </div>

          ))
        )}
      </div>
    </div>
  </div>
  );
};

export default Featured;
