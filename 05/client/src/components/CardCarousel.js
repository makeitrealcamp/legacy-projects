import { Carousel } from "@mantine/carousel";
import { useMediaQuery } from "@mantine/hooks";
import { useMantineTheme } from "@mantine/core";
import { useNavigate } from "react-router";
import "../styles/components/CardCarousel.scss";

function CardCarousel(props) {
  // const data = [
  //     process.env.PUBLIC_URL + 'cardhome/1.webp',
  //     process.env.PUBLIC_URL + 'cardhome/2.webp',
  //     process.env.PUBLIC_URL + 'cardhome/3.webp',
  //     process.env.PUBLIC_URL + 'cardhome/4.webp',
  // ]

  const navigate = useNavigate();
  const data = props.imagesCard;

  const theme = useMantineTheme();
  const mobile = useMediaQuery(`(max-width: ${theme.breakpoints.sm}px)`);

  return (
    <Carousel
      className="carousel__main"
      slidesToScroll={1}
      withControls={mobile ? false : true}
      breakpoints={[{ maxWidth: "sm", slideGap: "15px" }]}
      withIndicators
      styles={{
        control: {
          "&[data-inactive]": {
            opacity: 0,
            cursor: "default",
          },
        },
        indicator: {
          width: 6,
          height: 6,
          borderRadius: "50%",
        },
      }}
    >
      {data.map((item, index) => {
        return (
          <Carousel.Slide key={index}>
            <button className="carousel__list__button__heart" onClick={()=>navigate(`/rent/${props.linkto}`)}>
              <img src={item} alt={index} />
            </button>
          </Carousel.Slide>
        );
      })}
    </Carousel>
  );
}

export default CardCarousel;
