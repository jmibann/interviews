import React from 'react';
import { Route, Redirect, Switch, Link } from 'react-router-dom';
import { connect } from 'react-redux';

import Async from './helpers/Async';

import { fetchUser } from '../redux/action-creator/user';

const AsyncHeader = Async(() => import('./components/app/Header'));
const AsyncLogin = Async(() => import('./components/login/Login.container'));
const AsyncSistReport = Async(() => import('./components/report/SistReport'));
const AsyncCandidateInfo = Async(() => import('./components/app/CandidateInfo'));
const AsyncCreateTemplate = Async(() => import('./components/template/CreateTemplate.container'));
const AsyncAddCandidate = Async(() => import('./components/candidate/AddCandidate.container'));
const AsyncAllUsers = Async(() => import('./components/user/AllUsers.container'));
const AsyncCandidates = Async(() => import('./components/candidate/Candidates.container'));
const AsyncConfiguration = Async(() => import('./components/app/Configuration.container'));
const AsyncInterviewSisCont = Async(() => import('./components/interview/InterviewSisCont.container'));
const AsyncPreSistInterview = Async(() => import('./components/interview/PreSistInterview.container'));

class Main extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      loading: true
    };
  }

  componentDidMount() {
    this.props.fetchUser().then(() => this.setState({ loading: false }));
  }

  render() {
    return (
      !this.state.loading
        ? <div>
          <Route render={({ history }) => (
            <AsyncHeader fetchUser={this.props.fetchUser} user={this.props.user} history={history} />)} />

          <div className="container-fluid">
            <Switch>

              <Route exact
                path='/'
                render={({ history }) => (this.props.user ? <Redirect to='/candidate' /> : <Redirect to='/login' />)} />

              <Route exact
                path='/login'
                render={({ history }) => (
                  <AsyncLogin history={history} user={this.props.user} />)} />


              <Route exact
                path='/candidate/interview/:idCand'
                render={({ history, match }) => {
                  return (
                    <AsyncInterviewSisCont idCand={match.params.idCand} history={history} user={this.props.user} />);
                }}
              />

              <Route exact
                path='/candidate/info/:idCand'
                render={({ history, match }) => (
                  <AsyncCandidateInfo history={history} user={this.props.user} candID={match.params.idCand} />)} />

              <Route exact
                path='/candidate/:idCand/interview/:idInterv'
                render={({ history, match }) => {
                  return (
                    <AsyncSistReport history={history} idCand={match.params.idCand} questions={this.props.questionsHR} candidate={this.props.candidate} idInter={this.props.idInter} />)
                }}
              />

              <Route
                path='/candidate'
                render={({ history }) => (
                  <AsyncCandidates history={history} user={this.props.user} />)} />

              <Route exact
                path='/configuration'
                render={({ history }) => {
                  return (
                    <AsyncConfiguration history={history} user={this.props.user} />
                  );
                }} />

              <Route exact
                path='/users'
                render={({ history }) => (
                  <AsyncAllUsers user={this.props.user} history={history} />)} />


              <Route exact
                path='/preinterview/:candID'
                render={({ history, match }) => (
                  <AsyncPreSistInterview history={history} user={this.props.user} candID={match.params.candID} />)} />

              <Route exact
                path='/addCandidate'
                render={({ history }) => (
                  <AsyncAddCandidate history={history} user={this.props.user} />)} />

              <Route exact
                path='/newtemplate'
                render={({ history }) => (
                  <AsyncCreateTemplate history={history} user={this.props.user} />
                )} />

              {/* <Route exact
                path='/templates/:templateId'
                render={({ history, match }) => (
                  <AsyncCreateTemplate history={history} user={this.props.user} templateId={match.params.templateId} />
                )} /> */}



            </Switch>
          </div>
        </div>
        : null
    );
  }
}

const mapStateToProps = (state) => ({ user: state.user.user });

const mapDispatchToProps = (dispatch) => ({
  fetchUser: () => dispatch((fetchUser()))
});

export default connect(mapStateToProps, mapDispatchToProps)(Main);