
const ScoreApart = (props) => {
  return (
    <div className="scoreApart">
        <div className="apartFlex">
            <div className="apartName">
                {props.name}
            </div>
            <div className="apartChartFlex">
                <div className="chartContainer">
                    <div className="chartBox">
                        <span className="chartSpan" style={props.widthStyle}></span>
                    </div>
                </div>
                <div className="chartNumber">{props.total}</div>
            </div>
        </div>
    </div>
  )
}

export default ScoreApart