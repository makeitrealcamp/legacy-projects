const { Link } = require("react-router-dom");

function BroseNow(){

    return(
        <div className="main-container-brose-now">
            <h3 className="title-brose-now">
            Start learning from over 204,000 courses today.
            </h3>
            <p className="info-brose-now">
            When you enroll in a course, it will appear here.<Link to='/' className="link-brose-now">Browse now.</Link>
            </p>
        </div>
    )
}

export default BroseNow;
