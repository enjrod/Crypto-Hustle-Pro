import { useState, useEffect } from 'react'
import './App.css'
import CoinInfo from './components/CoinInfo'
import SideNav from './components/SideNav'

const API_KEY = import.meta.env.VITE_CRYPTO_KEY

function App() {
  const [list, setList] = useState(null);
  const [searchInput, setSearchInput] = useState("");
  const [filteredResults, setFilteredResults] = useState(null);

  useEffect(() => {
    const topCoins = async () => {
      const response = await fetch("https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&order=market_cap_desc&per_page=30&page=1",
        {
          headers: {
            "x-cg-demo-api-key": API_KEY,
          },
        }
      )
      const data = await response.json()
      setList(data)
    }
    topCoins().catch(console.error)
  }, [])

  const searchItems = (searchValue) => {
    setSearchInput(searchValue);
    if (searchValue !== "") {
      const filteredData = list.filter((coin) =>
        coin.name.toLowerCase().includes(searchValue.toLowerCase()) ||
        coin.symbol.toLowerCase().includes(searchValue.toLowerCase())
      )
      setFilteredResults(filteredData);
    }
    else {
      setFilteredResults(list);
    }

  }


  return (
    <div className='whole-page'>
      <SideNav />
      <h1> My Crypto List</h1>
      <input type="text" placeholder="Search..." onChange={(e) => searchItems(e.target.value)} />
      <ul className='coin-list'>
        {searchInput.length > 0 ? (
          filteredResults?.map(coin => (
            <CoinInfo
              key={coin.id}
              id={coin.id}
              image={coin.image}
              name={coin.name}
              symbol={coin.symbol}
              price={coin.current_price}
            />
          ))) :
          (
            list?.map(coin => (
              <CoinInfo
                key={coin.id}
                id={coin.id}
                image={coin.image}
                name={coin.name}
                symbol={coin.symbol}
                price={coin.current_price}
              />
            )))
        }
      </ul>

    </div>
  )
}

export default App
