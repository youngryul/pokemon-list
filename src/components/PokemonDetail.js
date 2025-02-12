import { setPokemonType } from '../modules/typeTag.js';

export default function PokemonDetail({ $app, initialState }) {
    this.state = initialState;
    this.$target = document.createElement('div');
    this.$target.className = 'pokemon-detail';

    $app.appendChild(this.$target);

    this.template = () => {
        let detailData = this.state;
        let temp = ``;
        if(detailData) {
            temp = `<div class="detail-wrapper">
                        <div class="left-wrapper">
                            <img src="${detailData.img}" />
                        </div>
                        <div class="right-wrapper">
                            <div class="pokemon-info">
                                <div class="index">No.${detailData.id}</div>
                                <div class="name">${detailData.name}</div>
                                <div class="type">${setPokemonType(detailData.type)}</div>
                                <div class="description">${detailData.description}</div>
                            </div>
                            <div class="detail-info">
                                <div class="label">키</div>
                                <div class="label">분류</div>
                                <div class="label">몸무게</div>
                                <div class="info">${detailData.height}m</div>
                                <div class="info">${detailData.info}</div>
                                <div class="info">${detailData.weight}kg</div>
                            </div>
                        </div>
                    </div>`
        }

        return temp;
    }

    this.render = () => {
        this.$target.innerHTML = this.template();
    };

    this.render();
}