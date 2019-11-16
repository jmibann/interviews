import React from 'react';
import CandidateInfo from '../app/CandidateInfo';

class InterviewSisComp extends React.Component {
  constructor(props) {
    super(props);
    this.state = {

    };
  }

  scoreOptionRenderer() {
    let scoreArray = [];
    for (let i = 1; i < 11; i++) scoreArray.push(i);
    return scoreArray;
  }

  render() {
    return (
      <div>
        <CandidateInfo candidate={this.props.candidate} />

        <div className="divider"></div>

        {this.props.questions.map((question) => (
          <div key={question.id} className="form" style={{ width: '90%', margin: '20px auto' }}>

            <div style={{ width: '100%', display: 'inline-flex' }}>
              <div className='questionHR' style={{ width: '25%', wordBreak: 'breakWord' }}>{question.value} </div>

              <div>
                <select className="form-control" id={question.id} onChange={this.props.onChange} name='score'>
                  <option disabled selected>Please select...</option>
                  {this.scoreOptionRenderer().map((point) => (<option>{point}</option>))}
                </select>
              </div>

              <div className='observationsField'>
                <textarea className="form-control" id={question.id} name='observations' onChange={this.props.onChange}></textarea>
              </div>
            </div>
          </div>)
        )
        }

        <div className='col-lg-3'></div>

        <div>
          <button type='button' className=" btn btn-orange pull-right" onClick={(e) => { this.props.onSubmit(e); }}> Submit Interview</button>
        </div>
      </div>
    );
  }
}
export default InterviewSisComp;