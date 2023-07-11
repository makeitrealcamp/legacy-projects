import '../styles/components/ButtonFilter.scss';
import sliders from '../styles/icons/sliders.svg'

const ButtonFilter = ()=>{
    return (
    <div className="header__types__filtros">
        <button className="header__types__filtros__button">
            <div className="header__types__filtrosicon">
                <img src={sliders} alt='next'></img>
            </div>
            <span>Filtros</span>
        </button>
    </div>
    )
}


export default ButtonFilter;