import { Carousel } from "@mantine/carousel";
import { useMediaQuery } from "@mantine/hooks";
import { useMantineTheme } from "@mantine/core";
import "../styles/components/Filtercarousel.scss";
import ButtonFilter from "./ButtonFilter";

const data = [
  {
    description: "Impresionantes",
    image: process.env.PUBLIC_URL + "filterbar/1Impresionantes.jpg",
  },
  {
    description: "Minicasas",
    image: process.env.PUBLIC_URL + "filterbar/2Minicasas.jpg",
  },
  {
    description: "Parques nacionales",
    image: process.env.PUBLIC_URL + "filterbar/3Paruqes nacionales.jpg",
  },
  {
    description: "Artico",
    image: process.env.PUBLIC_URL + "filterbar/4Artico.jpg",
  },
  {
    description: "Cabanas",
    image: process.env.PUBLIC_URL + "filterbar/5cabanas.jpg",
  },
  {
    description: "Islas",
    image: process.env.PUBLIC_URL + "filterbar/6slas.jpg",
  },
  {
    description: "Diseno",
    image: process.env.PUBLIC_URL + "filterbar/Diseno.jpg",
  },
  {
    description: "Campamentos",
    image: process.env.PUBLIC_URL + "filterbar/campamentos.jpg",
  },
  {
    description: "Casas alpinas",
    image: process.env.PUBLIC_URL + "filterbar/casas alpinas.jpg",
  },
  {
    description: "Piscinas",
    image: process.env.PUBLIC_URL + "filterbar/piscinas.jpg",
  },
  {
    description: "Surf",
    image: process.env.PUBLIC_URL + "filterbar/surf.jpg",
  },
  {
    description: "Impresionantes",
    image: process.env.PUBLIC_URL + "filterbar/1Impresionantes.jpg",
  },
  {
    description: "Minicasas",
    image: process.env.PUBLIC_URL + "filterbar/2Minicasas.jpg",
  },
  {
    description: "Parques nacionales",
    image: process.env.PUBLIC_URL + "filterbar/3Paruqes nacionales.jpg",
  },
  {
    description: "Impresionantes",
    image: process.env.PUBLIC_URL + "filterbar/4Artico.jpg",
  },
  {
    description: "Cabanas",
    image: process.env.PUBLIC_URL + "filterbar/5cabanas.jpg",
  },
  {
    description: "Islas",
    image: process.env.PUBLIC_URL + "filterbar/6slas.jpg",
  },
  {
    description: "Diseno",
    image: process.env.PUBLIC_URL + "filterbar/Diseno.jpg",
  },
  {
    description: "Campamentos",
    image: process.env.PUBLIC_URL + "filterbar/campamentos.jpg",
  },
  {
    description: "Casas alpinas",
    image: process.env.PUBLIC_URL + "filterbar/casas alpinas.jpg",
  },
  {
    description: "Piscinas",
    image: process.env.PUBLIC_URL + "filterbar/piscinas.jpg",
  },
  {
    description: "Surf",
    image: process.env.PUBLIC_URL + "filterbar/surf.jpg",
  },
];

function FilterCarousel() {
  // const arr = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12]

  const theme = useMantineTheme();
  const mobile = useMediaQuery(`(max-width: ${theme.breakpoints.sm}px)`);

  return (
    <div className='container__carousel'>
        <Carousel
            slideSize='max-content'
            slideGap="30px"
            align="start"
            slidesToScroll={3}
            className='filter__carousel'
            withControls={mobile ? false : true}
            dragFree
            breakpoints={[
                { maxWidth: 'sm', slideGap: '15px' },
            ]}
            styles={{
                control: {
                    '&[data-inactive]': {
                        opacity: 0,
                        cursor: 'default',
                    },
                },
            }}
        >
            {data.map((item, index) => {
                return (
                    <Carousel.Slide key={index} className='filter__carousel__item'>
                        <img src={item.image} alt={item.description}></img>
                        <span>{item.description}</span>
                    </Carousel.Slide>
                )
            })}
        </Carousel>
        <ButtonFilter/>
    </div >

  );
}

export default FilterCarousel;
