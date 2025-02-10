//COMPONENTS
import PokemonList from './components/PokemonList.js';

//APIS
import { getPokemonList } from './modules/api.js';

export default function App($app) {
    const getSearchWord = () => {
        if (window.location.search.includes('search=')) {
            return window.location.search.split('search=')[1];
        }
        return '';
    };

    this.state = {
        type: '',
        pokemonList: [],
        searchWord: getSearchWord(),
        currentPage: window.location.pathname,
    };

    const pokemonList = new PokemonList({
        $app,
        initialState: this.state.pokemonList,
        handleItemClick: async (id) => {
            history.pushState(null, null, `/detail/${id}`);
            this.setState({
                ...this.state,
                currentPage: `/detail/${id}`,
            })
        },

        handleTypeClick: async (type) => {
            history.pushState(null, null, `/${type}`);
            this.setState({
                ...this.state,
                currentPage: `/${type}`,
            })
        },
    });

    this.setState = (newState) => {
        this.state = newState;
        pokemonList.setState(this.state.pokemonList)
    };

    const init = async () => {
       const searchWord = getSearchWord();
       const pokemonList = await getPokemonList(this.state.type, searchWord);
       this.setState({
           ...this.state,
           pokemonList: pokemonList
       })
    };

    init();
}
