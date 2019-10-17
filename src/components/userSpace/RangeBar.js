import React from 'react';
import './RangeBar.css'

import 'rc-slider/assets/index.css';
import 'rc-tooltip/assets/bootstrap.css';
import Slider from 'rc-slider';

const createSliderWithTooltip = Slider.createSliderWithTooltip;
const Range = createSliderWithTooltip(Slider.Range);

class RangeBar extends React.Component {
  /**
   * a simple compenet to crate a range bar using the slider react lib.
   * @param {a} props 
   */
    constructor(props){
      super(props)
      this.state = {
          values : [2 , 4],
          min : 0,
          max : 40
      }
    }

  render(){
    console.log(this.props.tempVal)
    const wrapperStyle = { width: 300, margin: 20 };
      return(
          <div>
              <div style={wrapperStyle}>
                <p>Temperture Range</p>
                <Range 
                    min={this.state.min} //min psossible temp 
                    max={this.state.max} //max possible test
                    defaultValue={[2, 4]} // deafult start value
                    tipFormatter={value => `${value}`} //showing user the cutrrent value
                    marks={{ 0: 0, 10: 10, 20: 20, 30: 30, 40:40 }} //marking on bar
                    onChange={this.props.temperatureChange} 
                    />
                </div>
                <div>
                    <br></br>
                    Min Temperture values: {this.props.tempVal[0]}
                    <br></br>
                    Max Temperture values: {this.props.tempVal[1]}
                    <br></br>
                    <br></br>
                </div>
            </div>
              
      )
  }
}
 
  export default RangeBar;
  