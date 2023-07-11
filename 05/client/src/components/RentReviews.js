import ReviewsPuntuation from "./ReviewsPuntuation";
import ReviewScore from "./ReviewScore";
import "../styles/components/rentReviews.scss"
import RentComments from "./RentComments";
const RentReviews = ({rating, reviews, comments, item}) => {
  return (
    <div className="reviewsContainer">
      <ReviewsPuntuation rating={rating} reviews={reviews}/>
      <ReviewScore item = {item}/>
      <RentComments comments={comments}/>
      <div></div>
    </div>
  );
};

export default RentReviews;
