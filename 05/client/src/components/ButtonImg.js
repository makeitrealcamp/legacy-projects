import "../styles/components/ButtonImg.scss"
const ButtonImg = ({texto,selected="",clase}) => {
    return (
        <button className={`${clase} ${selected}`} >
            {texto}      
        </button >
    )
}
export default ButtonImg;
