export default function Header({ $app, initialState, handleSearch }) {
    this.state = initialState;
    this.$target = document.createElement('div');
    this.$target.className = 'header';

    this.handleSearch = handleSearch;
    $app.appendChild(this.$target);

    this.template = () => {
        const { currentPage, searchWord } = this.state;
        let temp = `
                           <div class="header-content">
                              <img src="/src/img/ball.webp" />
                              <div>포켓몬 도감</div>
                           </div>
                           <div class="search">
                              <input id="search" placeholder="포켓몬을 검색하세요!" value="${searchWord}" />
                              <button id="searchBtn">
                                <img src="/src/img/search.png">
                              </button>
                           </div>`;
        return temp;
    };

    this.render = () => {
        this.$target.innerHTML = this.template();

        const $searchInput = document.getElementById('search');
        const $searchBtn = document.getElementById('searchBtn')
        $searchBtn.addEventListener('click', (event) => {
            this.handleSearch($searchInput.value);
        });
    }

    this.setState = (newState) => {
        this.state = newState;
        this.render();
    };

    this.render();
}