import "../styles/components/comment.scss";
const Comment = ({item}) => {
  const toDate = new Date (item.createdAt)
  const date = toDate.toLocaleDateString('es-CO',{ weekday: 'short', year: 'numeric', month: 'short', day: 'numeric' })
  const {userId} = item;
  return (
    <div className="commentContainer">
      <div className="userContainerflex">
        <div className="profileImg">
          <img
            src={userId.profileimg}
            alt="cargando"
          ></img>
        </div>
        <div className="user">
          <div className="userName">
            
            <h3>{userId.name}</h3>
          </div>
          <div className="commentDate">{date}</div>
        </div>
      </div>
      <div className="message">{item.message}</div>
    </div>
  );
};

export default Comment;
