// import React from 'react';
// import { connect } from 'react-redux';
// import Axios from 'axios';

// import { fetchHrAnswers } from '../../../redux/action-creator/answer';
// import { getAllCandidates, fetchCandidate } from '../../../redux/action-creator/candidate';

// class ReportComp extends React.Component {
//   constructor(props) {
//     super(props);
//     this.changeCandStatus = this.changeCandStatus.bind(this);
//   }
//   componentDidMount() {
//     this.props.fetchCandidate(this.props.idCand);
//     this.props.fetchHrAnswers(this.props.idInter);
//   }

//   changeCandStatus(idCandi, status) {
//     Axios.put('/api/candidate/changeStatus', { idCandi, status })
//       .then(() => this.props.getAllCandidates())
//       .then(() => this.props.history.push('/candidates'));
//   };

//   render() {
//     return (

//       <div >
//         <div>
//           <div className='form-group inline-block'>
//           </div>

//           <div className='halfGrid'>
//             <div className='labels'>
//               <h3>Full name: {this.props.candidate.fullName}</h3>
//               <h3>Phone:{this.props.candidate.telNumber}</h3>
//               <h3>e-mail: {this.props.candidate.email}</h3>

              // {this.props.candidate.skills && this.props.candidate.skills.length > 0 &&
              //   <h3>Profile:{this.props.candidate.skills.map(skill => <span key={skill.id}>{' ' + skill.skill + '  '}</span>)}
              //   </h3>}
              // {this.props.candidate.interviewerHR
              //   ? <h3>HR Interviewer: {' ' + this.props.candidate.interviewerHR.nombre}</h3>
              //   : null
              // }

//             </div>

//             <div id='leftSideReport'>
//               <h2> STATUS: {' ' + this.props.candidate.status} </h2>
//             </div>
//           </div>
//           <div>
//             <div style={{ width: '40%', margin: 'auto' }}>

//               <button className='btn btn-green' id='appReport' onClick={() => this.changeCandStatus(this.props.candidate.id, 'Approved')} >APPROVE</button>
//               <button className='btn btn-red' id='rejReport' onClick={() => this.changeCandStatus(this.props.candidate.id, 'Rejected')}>REJECT</button>
//             </div>
//           </div>
//         </div>

//         <div className='answersHR'>
//           {
//             this.props.answersHR.map((elemento, key) => (
//               <div key={elemento.question} className='answerBox'>
//                 <h3>{elemento.question}:</h3>
//                 <h3>{elemento.answer}</h3>
//               </div>
//             ))
//           }
//         </div>
//       </div>

//     );
//   }
// }

// const mapStateToProps = (state) => ({
//   candidate: state.candidate.candidate,
//   answersHR: state.answers.answersHR
// });

// const mapDispatchToProps = (dispatch) => ({
//   fetchCandidate: (idCandi) => dispatch(fetchCandidate(idCandi)),
//   fetchHrAnswers: (interviewID) => dispatch(fetchHrAnswers(interviewID)),
//   getAllCandidates: () => dispatch(getAllCandidates())
// });

// export default connect(mapStateToProps, mapDispatchToProps)(ReportComp);