import { Carousel } from '@mantine/carousel';
import MusicianCard from './MusicianCard';

interface MusicianCarouselProps {
  data: {
    imagesDone: {
      avatar: string;
    };
    name: string;
    email: string;
    instrument?: string;
    genre?: string;
    price: number;
  }[];
}

const MusicianCarousel = ({ data }: MusicianCarouselProps) => {
  const musicians = data.map((musician, i) => (
    <Carousel.Slide key={`${i}${musician.email}`}>
      <MusicianCard
        avatar={musician.imagesDone.avatar}
        name={musician.name}
        instrument={musician.instrument}
        price={musician.price}
        email={musician.email}
        genre={musician.genre}
      />
    </Carousel.Slide>
  ));

  return (
    <Carousel
      withIndicators
      height={290}
      slideSize='33.333333%'
      slideGap='md'
      breakpoints={[
        { maxWidth: 'md', slideSize: '50%' },
        { maxWidth: 'sm', slideSize: '100%', slideGap: 0 },
      ]}
      loop
      align='start'
    >
      {musicians}
    </Carousel>
  );
};

export default MusicianCarousel;
