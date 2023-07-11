import '../styles/components/HomeHostFilterButton.scss'

const HomeHostFilterButton = ({select,children})=>{
    return(
        <div className={`HomeHostFilterButton ${select}`}>
            {children}
        </div>
    )
}

export default HomeHostFilterButton;