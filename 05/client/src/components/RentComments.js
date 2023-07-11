import "../styles/components/comment.scss";
import Comment from "./Comment"

const RentComments = ({comments}) => {
  
  return (
    <div className="rentComments">
    {comments.map((item)=>{
      return(
        <div className="comment" key={item._id}>
        <Comment item={item}/>
        </div>
        
      )
    })}
    </div>
    
  )
}

export default RentComments