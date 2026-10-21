import { useEffect, useState } from 'react'
const NEWS_KEY = import.meta.env.VITE_NEWS_KEY

const CryptoNews = () => {
    const [newsList, setNewsList] = useState(null);

    useEffect(() => {
        const cryptoNews = async () => {
            const response = await fetch(`https://finnhub.io/api/v1/news?category=crypto&token=${NEWS_KEY}`)
            const data = await response.json();
            if (Array.isArray(data)) {
                setNewsList(data);
            }
            else {
                console.error(data)
            }
        }
        cryptoNews().catch(console.error)
    }, [])

    return (
        <div className="crypto-news">
            <h3> Crypto News</h3>
            <ul className='side-list'>
                {newsList && newsList.map((article) =>
                    <li className='news-article' key={article.id}><a href={article.url} target="_blank" rel="noopener noreferrer"> {article.headline}</a></li>)}
            </ul>
        </div>
    )
}

export default CryptoNews