import "../styles/components/ButtonModal.scss"
const ButtonModal = ({notAble,texto,selected="",clase,click,setClick}) => {
    return (
        <button disabled={notAble} onClick={setClick} className={`${clase} ${selected}`} >
            {texto}      
        </button >
    )
}
export default ButtonModal;
