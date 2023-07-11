import "../styles/components/devInfo.scss";

const DevInfo = ({ profileImg, name, gitHub, linkedIn }) => {
  return (
    <div className="devFlex">
      <div className="profileImg">
        <img src={profileImg} alt="cargando" />
      </div>
      <div className="user">
        <div className="userName">
          <h3>{`${name}`}</h3>
        </div>
        <div className="imgFlex">
          <div className="devGitHub">
            <a href={gitHub}>
              <img src="https://cdn.iconscout.com/icon/free/png-256/github-3089487-2567439.png" alt="gitHub" />
            </a>
          </div>
          <div className="devLinkedIn">
          <a href={linkedIn}>
              <img src="https://upload.wikimedia.org/wikipedia/commons/thumb/f/f8/LinkedIn_icon_circle.svg/2048px-LinkedIn_icon_circle.svg.png" alt="LinkedIn" />
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DevInfo;
