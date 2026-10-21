const CoinInfo = ({id, image, name, symbol, price}) => {

    return (
        <div>
            {price &&  (
                <li className="main-list" key={id}>
                    <img
                        className="icons"
                        src={image}
                        alt={`Small icon for ${name} crypto coin`}
                    />
                    {name}
                    {price != null ? ` $${price} USD` : null}
                </li>
            ) 
            }
        </div>
    )
}

export default CoinInfo