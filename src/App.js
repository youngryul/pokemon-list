//COMPONENTS
import PokemonList from './components/PokemonList.js';

//APIS
import {getPokemonDetail, getPokemonList} from './modules/api.js';
import Header from "./components/Header.js";
import PokemonDetail from "./components/PokemonDetail.js";

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

    const header = () =>{
         new Header({
            $app,
            initialState: {
                currentPage: this.state.currentPage,
                searchWord: this.state.searchWord
            },
            handleSearch: async (searchWord) => {
                history.pushState(null, null, `/pokemon-list/index.html/${this.state.type}?search=${searchWord}`);
                const pokemonList = await getPokemonList(this.state.type, searchWord);
                this.setState({
                    ...this.state,
                    pokemonList: pokemonList,
                    searchWord: searchWord
                })

            }

        })
    }

    const pokemonList = new PokemonList({
        $app,
        initialState: this.state.pokemonList,
        handleItemClick: async (id) => {
            history.pushState(null, null, `/pokemon-list/index.html/detail/${id}`);
            this.setState({
                ...this.state,
                currentPage: `/pokemon-list/index.html/detail/${id}`,
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

    const pokemonDetail = async (id)=> {
        try {
            const pokemonDetailData = await getPokemonDetail(id);
            new PokemonDetail({$app, initialState: pokemonDetailData});
        }
        catch (error) {
            console.log(error);
        }
    }

    this.setState = (newState) => {
        this.state = newState;
        const path = this.state.currentPage;


        if (path.startsWith('/pokemon-list/index.html/detail/')){
            $app.innerHTML = '';

            const detailId = path.split('/pokemon-list/index.html/detail/')[1]
            header();
            pokemonDetail(detailId);
        }
        else {
            pokemonList.setState(this.state.pokemonList)
        }
    };

    const init = async () => {
       const path = this.state.currentPage;

       header();

       if(!path.startsWith('/pokemon-list/index.html/detail/')){
           const searchWord = getSearchWord();
           const pokemonList = await getPokemonList(this.state.type, searchWord);
           this.setState({
               ...this.state,
               pokemonList: pokemonList
           })
       }
       else {
           const detailId = path.split('/pokemon-list/index.html/detail/')[1]

           pokemonDetail(detailId);
       }

    };

    window.addEventListener('popstate', async () => {
        const urlPath = window.location.pathname;

        const prevPage = urlPath;
        const prevType = urlPath.replace('/', '');
        const prevSearchWord = getSearchWord();
        const prevPokemon = await getPokemonList(prevType, prevSearchWord);

        this.setState({
            ...this.state,
            currentPage: prevPage,
            searchWord: prevSearchWord,
            pokemonList: prevPokemon,
            type: prevType
        });
    })

    init();
}
