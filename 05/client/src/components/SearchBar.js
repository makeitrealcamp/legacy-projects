import '../styles/components/SearchBar.scss';
import searchIcon from '../styles/icons/searchIcon.svg';
import { useDispatch, useSelector} from "react-redux";
import { getPosts } from '../store/actions/Filter.action';

const SearchBar = (props)=>{
    const dispatch = useDispatch()
    const coordinates = useSelector(state=>state.headerReducer.coordinates)
    const dates = useSelector(state=>state.calendarReducer.dates)
    const people = useSelector(state=>state.peopleReducer.countPeople)
    const flexRange = useSelector(state=>state.calendarReducer.flexRange)

    const handleClick = ()=>{
        if (coordinates.length === 0) return
        const data = {
            coordinates,
            dates,
            people,
            flexRange,
        }  
        dispatch(getPosts(data))
    }
   
    return(
    <div className="header__search">
        <div className='header__search__button'>
            <div className="header__search__cualquier">
                {props.first}
            </div>
        </div>   
        <span></span>
        <div className='header__search__button'>
            <div className="header__search__semana">
            {props.second}
            </div>
        </div>
        <span></span>
        <div className='header__search__button'>
            <div className="header__search__cuantos" >
                {props.third}
            </div>
            <div className="header__searchIcon" onClick={handleClick}>
                <img src={searchIcon} alt="Search Icon" />
            </div>
        </div>
    </div>
    )
}

export default SearchBar;