import "../styles/components/ModalPersonasP2.scss"
import ButtonModal from "./ButtonModal";
import { useDispatch, useSelector } from "react-redux";
import { increment, decrement } from "../store/reducer/peopleReducer";

const ModalPersonasP2 = ({ count, who }) => {
    const dispatch = useDispatch();
    const peopleState = useSelector((state) => state.peopleReducer.countPeople);
 
    return (
        <>
            <div className="part2">
                {((count === 0) || (count === 1 && who === "adults")) ? (
                    <ButtonModal notAble={true} clase={`roundButton `} texto={"-"} />
                ) : (
                    <ButtonModal setClick={() => { dispatch(decrement(count, who)); }} clase={`roundButton `} texto={"-"} />
                )
                }
                <p className="cantidad">{`${count}`}</p>
                {
                    ((who === "adults" || who === "children") && peopleState.adults + peopleState.children < 16)
                    || (who === "pets" && peopleState.pets < 5)
                    || (who === "babies" && peopleState.babies < 5)?
                    <ButtonModal setClick={() => { dispatch(increment(count, who)) }} clase={"roundButton"} texto={"+"} />:
                    <ButtonModal notAble={true} clase={"roundButton"} texto={"+"} />

                }
                
            </div>
        </ >
    )

}

export default ModalPersonasP2;
