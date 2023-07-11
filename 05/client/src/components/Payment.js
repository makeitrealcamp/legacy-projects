
import { useParams } from "react-router";
import { useNavigate } from "react-router-dom";


const Payment = ({className, invoice, price, name}) => {
  const navigate = useNavigate()
 const handleNavigate = () =>{
  navigate('/confirmationPay')
 }
  let params = useParams();
    var handler = window.ePayco.checkout.configure({
        key: process.env.REACT_APP_EPAYCO_PUBLIC_KEY,
        test: true
      });

      const handleClick = () => {
        handler.open({
          //Parametros compra (obligatorio)
          name: name,
          description: name,
          currency: "cop",
          amount: price,
          tax_base: "0",
          tax: "0",
          country: "co",
          lang: "en",
    
          //Onpage="false" - Standard="true"
          external: "false",
    
    
          //Atributos opcionales
          extra1: `${params.id}`,
          extra2: "extra2",
          extra3: "extra3",
          response: "",
          acepted:`${window.location.href}/confirmationPay`,
    
          //Atributos cliente
          name_billing: "",
          address_billing: "Calle falsa 1233",
          type_doc_billing: "cc",
          mobilephone_billing: "3101234567",
          number_doc_billing: "1234567896",
    
          //atributo deshabilitación metodo de pago
          methodsDisable: ["SP"]
    
        })
      }
    
  return (
    <div className="reserve">
      
      <button className={className} onClick={handleClick}>
      <span className="reserveIt">Pagar</span>
      </button>
      
    </div>
    
  )
}

export default Payment