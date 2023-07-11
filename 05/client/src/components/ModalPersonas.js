import "../styles/components/ModalPersonas.scss"
import ModalPersonasP1 from "./ModalPersonasP1";
import ModalPersonasP2 from "./ModalPersonasP2";
import { useSelector } from "react-redux";


const ModalPersonas = () => {
    const peopleState = useSelector((state) => state.peopleReducer.countPeople);
    return (
        <>
            <div className="container">
                <div className="itemPersona">
                    <ModalPersonasP1 subTitulo={"Adultos"} info={"Edad: 13 años o mas"} />
                    <ModalPersonasP2  count={peopleState.adults} who={"adults"} />
                </div>

                <div className="itemPersona">
                    <ModalPersonasP1 subTitulo={"Niños"} info={"De 2 a 12 años"} />
                    <ModalPersonasP2  count={peopleState.children} who={"children"}/>  </div>
                <div className="itemPersona">
                    <ModalPersonasP1 subTitulo={"Bebés"} info={"Menbos de 2 años"} />
                    <ModalPersonasP2 count={peopleState.babies} who={"babies"}/>
                </div>
                <div className="itemPersona">
                    <ModalPersonasP1 subTitulo={"Mascotas"} info={"¿Traes a un animal de servicio?"} />
                    <ModalPersonasP2  count={peopleState.pets} who={"pets"}/>
                </div>
            </div>

        </ >
    )

}

export default ModalPersonas;
