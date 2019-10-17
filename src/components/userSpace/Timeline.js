import React from "react";
import HorizontalTimeline from "react-horizontal-timeline";
import { toUnicode } from "punycode";

/**
 * A timeline compenent.
 * Show horizntal time line
 * Props contain package timeline history
 * 
 */

 //TODO
  // take our css
class Timeline extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      curIdx: 0,      
      prevIdx: 0,
      timeHistory: []
    };
  }

  render() { 
 
    let {curIdx, prevIdx} = this.state;
    let curStatus = this.props.history[curIdx].Status;
    let company = this.props.history[curIdx].Name ;
    let postman = this.props.history[curIdx].FullName;
  
    return (     
      <div>
        <h2 className="text-center">Timeline & Details</h2>
        <div>
          <div
            style={{
              width: "60%",
              height: "100px",
              margin: "0 auto",
              marginTop: "20px",
              fontSize: "15px"
            }}>
            <HorizontalTimeline
              styles={{
                background: "#f8f8f8",
                foreground: "green",
                outline: "#dfdfdf",
                
              }}
              index={this.props.history.length - 1}
              indexClick={index => {
                const curIdx = this.state.curIdx;
                this.setState({ curIdx: index, prevIdx: curIdx });
              }}            
              values={this.props.history.map(x => x.HandoverDate)}
            />
          </div>
            <div className="text-center">
            Status: {curStatus}
            <br></br> 
            Company: {company}
            <br></br>
            postman: {postman}
            </div>
          </div> 
      </div>
    );
  }
}

export default Timeline