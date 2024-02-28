
import axios from 'axios'
import { create } from 'zustand'
import debounce from '../helpers/debounce'


const homeStore = create((set) => ({

    coins: [],
    query: '',

    setQuery: (e) => {
        set({ query: e.target.value });
        homeStore.getState().searchCoins();
    },

    searchCoins: debounce(async () => {
        const { query } = homeStore.getState();

        const res = await axios.get(`https://api.coingecko.com/api/v3/search?query=${query}`
        );

        const coins = res.data.coins.map((coin) => {
            return {
                name: coin.name,
                image: coin.large,
                id: coin.id,
            };
        });

        set({ coins });
        console.log(res.data);
    }, 500), // debounce delay is 500ms

    fetchCoins: async () => {
        const res = await axios.get('https://api.coingecko.com/api/v3/search/trending')

        const coins = res.data.coins.map(coin => {
            return {
                name: coin.item.name,
                image: coin.item.large,
                id: coin.item.id,
                priceBtc: coin.item.price_btc,
            }
        })

        set({ coins })
    }
}))

export default homeStore









// import axios from 'axios';
// import { create } from 'zustand';
// import debounce from '../helpers/debounce'; // Dodaj tę linię, ścieżka może się różnić

// const homeStore = create((set) => ({
//     coins: [],
//     query: '',

//     setQuery: (e) => {
//         set({ query: e.target.value });
//         homeStore.getState().searchCoins();
//     },

//     searchCoins: debounce(async () => { // Ta funkcja jest teraz opóźniona przez debounce
//         const { query } = homeStore.getState();
//         if (query.trim() === '') {
//             set({ coins: [] });
//             return;
//         }
//         try {
//             const res = await axios.get(`https://api.coingecko.com/api/v3/search?query=${query}`);
//             console.log(res.data);
//             // Tutaj możesz zaktualizować stan coins na podstawie odpowiedzi
//             // set({ coins: res.data.coins });
//         } catch (error) {
//             console.error('Error during searchCoins:', error);
//             // Możesz również obsłużyć błąd, np. zaktualizować stan błędu
//             set({ error: error.message });
//         }
//     }, 300), // debounce delay is 500ms

//     fetchCoins: async () => {
//         try {
//             const res = await axios.get('https://api.coingecko.com/api/v3/search/trending');
//             const coins = res.data.coins.map(coin => ({
//                 name: coin.item.name,
//                 image: coin.item.large,
//                 id: coin.item.id,
//                 priceBtc: coin.item.price_btc,
//             }));
//             set({ coins });
//         } catch (error) {
//             console.error('Error during fetchCoins:', error);
//             // Możesz również obsłużyć błąd, np. zaktualizować stan błędu
//             // set({ error: error.message });
//         }
//     }
// }));

// export default homeStore;
