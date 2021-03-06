
import React from 'react';
import "./ScoreDisplay.scss"
export default class OverallScoreDisplayHelp extends React.Component {
    render() {
        const x=this.props.ArrayOfScores[this.props.ArrayOfScores.length-1];
      return ( 
          <div>
                <br/><br/><br/>
                <div> 

                    <div >
                        <br/><br/>
                        <p id="Overall">Overall Recovery Score</p>
                    </div>  

                    <div id="driver" className="drivers-insured">
                        <div className="circle-percent" data-percent={x}>
                            <span>{x}<sup>%</sup></span>
                            <div className="mask">
                                <div className="bar"></div>
                                <div className="fill"></div>
                            </div>
                        </div>
                    </div>
                    <hr/>
                </div>
        </div>
           );
    }
  }