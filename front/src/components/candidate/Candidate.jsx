// ------------------This is commented temporarily due to app priorities.Still works properly and you need it to enable it in order to do an interview.
// See also line 291 in order to work properly

// renderSwitch(param) {
//   switch (param.status) {
//     case 'New':
//       return (<div className='pull-left'>
//         <i className="fas fa-user-friends" onClick={() => this.setState({ chosenCandidate: param.id }, this.toggleState("assignInterviewerModal"))}></i>
//         <i className="fas fa-user-edit"></i>
//         <i className="far fa-file-alt "></i>
//       </div>
//       );
//     case 'Started':
//       return (
//         <div className='pull-left'>
//           <i className="fas fa-user-friends"></i>
//           <Link to={`/preinterview/${param.id}`}>
//             <i className="fas fa-user-edit"></i>
//           </Link>
//           <i className="far fa-file-alt"></i>
//         </div>
//       );
//     case 'Rejected':
//       return (
//         <div className='pull-left'>
//           <i className="fas fa-user-friends"></i>
//           <i className="fas fa-user-edit"></i>
//           <Link to={`/candidates/${param.id}/interview/${param.InterviewIDId}`}>
//             <i className="far fa-file-alt"></i>
//           </Link>
//         </div>
//       )
//     case 'Approved':
//       return (
//         <div className='pull-left'>
//           <i className="fas fa-user-friends"></i>
//           <i className="fas fa-user-edit"></i>
//           <Link to={`/candidates/${param.id}/interview/${param.InterviewIDId}`}>
//             <i className="far fa-file-alt"></i>
//           </Link>
//         </div>
//       )
//   }
// }


{/* {this.renderSwitch(props.original)} */ }