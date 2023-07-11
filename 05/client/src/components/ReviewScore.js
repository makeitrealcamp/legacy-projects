import ScoreApart from "./ScoreApart"

const ReviewScore = ({item}) => {
  const clean = (item.scorecleanliness/5)*100;
  const Accuracy = (item.scoreaccuracy/5)*100;
  const Communication = (item.scorecommunication/5)*100;
  const location = (item.scorelocation/5)*100;
  const checkin= (item.scorecheckin/5)*100;
  const value = (item.scorevalue/5)*100;
  return (
    <div className="reviewScore">
        <ScoreApart name={"Cleanliness"} widthStyle={{ width:`${clean}%`}} total={item.scorecleanliness}/>
        <ScoreApart name={"Accuracy"} widthStyle={{ width: `${Accuracy}%` }} total={item.scoreaccuracy}/>
        <ScoreApart name={"Communication"} widthStyle={{ width: `${Communication}%` }}total={item.scorecommunication}/>
        <ScoreApart name={"Location"} widthStyle={{ width: `${location}%` }}total={item.scorelocation}/>
        <ScoreApart name={"Check-in"} widthStyle={{ width: `${checkin}%` }}total={item.scorecheckin}/>
        <ScoreApart name={"Value"} widthStyle={{ width: `${value}%` }}total={item.scorevalue}/>
        </div>
  )
}

export default ReviewScore