import { useEffect, useState } from 'react'
import { useParams } from 'react-router'
const API_KEY = import.meta.env.VITE_CRYPTO_KEY

function CoinDetail() {
    const { id } = useParams()
    const [coin, setCoin] = useState(null)

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
            setCoin(data)
        }
        topCoins().catch(console.error)
    }, [])

    return (
        <div>
            <h1>{coin?.name}</h1>
            <img className="images" src={coin?.image?.large} alt="small crypto coin image"/>

            <div>{coin?.description?.en}</div>
            <br></br>
            <div>
                This coin was built with the algorithm {" "}
                {coin?.hashing_algorithm ?? "not listed"}{" "}
            </div>
            <br></br>
            <table>
                <tbody>
                    <tr> 
                        <th>Launch Date</th>
                        <td></td>
                    </tr>
                    <tr> 
                        <th>Website</th>
                        <td></td>
                    </tr>
                    <tr> 
                        <th>Whitepaper</th>
                        <td></td>
                    </tr>
                    <tr> 
                        <th>Monetary Symbol</th>
                        <td></td>
                    </tr>
                </tbody>
            </table>
        </div>
    )
}

export default CoinDetail