import "../styles/components/ModalPersonasP1.scss"
const ModalPersonasP1 = ({subTitulo,info}) => {

    return (
        <>
            <div className="part1">
                <p className="subTitulo">{subTitulo}</p>
                <p className="info">{info}</p>
            </div>
        </ >
    )

}

export default ModalPersonasP1;
