export default function Home() {
    const store = homeStore()

    React.useEffect(() => {
        store.fetchCoins()
    }, [])

    return (
        <div>
            {store.coins.map(coin => {
                return (
                    <div key={coin.id}>
                        <Link to={`/${coin.id}`}>
                            {coin.name}
                        </Link>
                    </div>
                )
            })}
        </div>
    )
}