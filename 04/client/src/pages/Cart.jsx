import Footer from "../components/Footer";
import Nav from "../components/Nav";
import CartShopItem from "../components/CartShopItem";
import { useSelector } from "react-redux";
import { v4 as uuidv4 } from "uuid";


var handler = window.ePayco.checkout.configure({
    key: 'ba2787cf058fe4931c78108fb6f8e551',
    test: true
  });

  
  const handleClick = (amount) => {

    const data={
      //Parametros compra (obligatorio)
      name: "Compra de Cursos",
      description: "Cursos Udemy",
      invoice: uuidv4(), //como número de factura, no repetirlo.  
      currency: "usd", // ó usd
      amount: `${amount}`, // development: max 200.000
      tax_base: "0",
      tax: "0",
      country: "co",
      lang: "en",
    
      //Onpage="false"(Modal) - Standard="true" 
      external: "false",
    
    
      //Atributos opcionales de la reserva
      extra1: "extra1",
      extra2: "extra2",
      extra3: "extra3",
      // confirmation: "http://secure2.payco.co/prueba_curl.php",
      // response: "http://secure2.payco.co/prueba_curl.php", //Redirección
      response: "https://mir-topv24-udemy-frontend.vercel.app/", //Redirección además agrega: ?ref_payco=...
      // Seguir el tutorial de epayco checkout -> medios de pagos de prueba
      // luego se hace una peticion GET a la ruta señalada en páginas personalizadas del tutorial.
      // VER STRIPE
    
      //Atributos cliente, recomienda localstorage
      name_billing: "Andres Perez",
      address_billing: "Carrera 19 numero 14 91",
      type_doc_billing: "cc",
      mobilephone_billing: "3050000000",
      number_doc_billing: "100000000",
    
     //atributo deshabilitación metodo de pago
      // methodsDisable: ["TDC", "PSE","SP","CASH","DP"]
      methodsDisable: ["SP"]
    
      }

    handler.open(data)
  }
  

const Cart = () => {
  let courses = useSelector((state)=> state.ShopCourses.itemShop)
  let amount = 0
  
    return (
      <>
        <Nav />
        <div className="cart-maincontainer">
          <h1>Shopping Cart</h1>
          <div className="cart-container">
            <div>
             <h2>Courses in Cart</h2>
             {
                courses.map((item)=>  {
                  amount = amount +  item.price
                  return(
                    <CartShopItem key={item.id} title={item.title} price={item.price} img={item.img}/>
                  )
                  
              })
              }
            </div>
            {/* <div className="courses-container">

            </div> */}
            <div className="checkout-container">
              <h3>Total:{amount}</h3>
              <button onClick={()=> handleClick(amount)}>Checkout</button>
            </div>
          </div>

        </div>
        <Footer />
      </>

      );
}

export default Cart;

