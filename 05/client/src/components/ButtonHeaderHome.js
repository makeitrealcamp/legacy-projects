import '../styles/components/ButtonHeaderHome.scss'

const ButtonHeaderHome = ({menu,select, children})=>{
    return(
        <div className={`ButtonHeaderHome--open ${select} ${menu}`}>
            {children}
        </div>
    )
}

export default ButtonHeaderHome;