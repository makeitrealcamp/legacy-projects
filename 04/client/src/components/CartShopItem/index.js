import { Link } from "react-router-dom";
import { deleteItemShop } from '../../store/ShopCourses.Slice';
import { useDispatch } from "react-redux";

function CartShopItem({id,title,price,img}){
    const dispatch = useDispatch()
/*     const deleteCourse = () => {
        if(localStorage.getItem("CoursesShop") === null){
            localStorage.setItem("CoursesShop",JSON.stringify([]));
        }
        let courses = [localStorage.getItem("CoursesShop")]
        courses = JSON.parse(courses)
        console.log('courses',courses)
        console.log(id,title,price,img)
        dispatch(deleteItemShop({id,title,price,img}))
        localStorage.setItem("CoursesShop",JSON.stringify(courses))
    } */

    return(
        <div /*onClick={deleteCourse}*/ className="main-container-cart-shop-item">
            <div className="container-cart-shop-item-delete">
                <button  className="btn-cart-shop-item-delete">Delete</button>
                <p>id {id}</p>
            </div>
        <div className="container-img-title-shop-item">

            <div className="container-img-shop-item">
                <img className="img-shop-item" src={img} alt={title}/>
            </div>
            <div className="container-title-shop-item">
                <Link className="p-title-price-shop-item-link">{title}</Link>
            </div>
        </div>
            <div className="container-price">
                <p className="p-title-price-shop-item" >${price}{id}</p>
            </div>
        </div>
    )

}
export default CartShopItem;