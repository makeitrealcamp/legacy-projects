const RentCalendarBtn = ({evnt,texto,clase}) => {
    
    return (
        <button onClick={evnt} className={`${clase}`}  >
            <u>{texto}</u>   
        </button >
    )
}
export default RentCalendarBtn;
