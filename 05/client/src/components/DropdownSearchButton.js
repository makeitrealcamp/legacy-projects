import '../styles/components/DropdownSearchButton.scss'
import { useDispatch, useSelector} from "react-redux";
import { getPosts } from '../store/actions/Filter.action';

const DropdownSearchButton = ({ text, styles, icon, iconText,clase }) => {
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
        console.log(data)
        dispatch(getPosts(data))
    }
   
    return (
        <div className={`searchbar__pop__button ${clase}`} style={styles}>
            <div className='searchbar__pop__button__colum'>
                <span className="searchbar__pop__bold">{text[0]}</span>
                <span className="searchbar__pop__light">{text[1]}</span>
            </div>
            {icon ? (
                <div className='searchbar__pop__button__buscar' onClick={handleClick}>
                    <span>{icon}</span>
                    <span>{iconText}</span>
                </div>
            ):null
            }

        </div>
    )
}

export default DropdownSearchButton;