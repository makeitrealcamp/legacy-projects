import "../styles/pages/Home.scss";
import CardMain from "../components/CardMain";
import ButtonMapa from "../components/ButtonMapa";
import Footer from "../components/Footer";
import FooterTouch from "../components/FooterToch";
import Header from "../components/Header";
import HeaderTouh from "../components/HeaderTouch";
import FilterCarousel from "../components/FilterCarousel";
import { useEffect} from "react";
import { Skeleton } from "@mantine/core";
import { useDispatch, useSelector} from "react-redux";
import { getPosts } from "../store/actions/Nofilter.action";

const Home = () => {
  const dispatch = useDispatch()
  // const [items, setItems] = useState([]);
  const items = useSelector(state=>state.filterReducer.post)
  // const [loading, setLoading] = useState(true);
  const loading = useSelector(state=>state.filterReducer.loading)
  const loadingArray = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12];

  useEffect(() => {
    dispatch(getPosts())
    // eslint-disable-next-line
  }, []);

  return (
    <div>
      <Header />
      <HeaderTouh />
      <FilterCarousel />
      <div className="main">
        {loading
          ? loadingArray.map((item) => {
              return (
                <div className="main__skeleton" key={item}>
                  <Skeleton>
                    <div className="main__skeleton__each">Loading</div>
                  </Skeleton>
                </div>
              );
            })
          : items.map((item) => {
              return (
                <div className="main__button" key={item._id}>
                  <CardMain item={item} />
                </div>
              );
            })}
      </div>
      <ButtonMapa />
      <Footer />
      <FooterTouch />
    </div>
  );
};

export default Home;
