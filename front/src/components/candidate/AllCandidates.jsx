import React, { useState } from 'react';
import axios from 'axios';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { Redirect } from 'react-router-dom';
import Pagination from '../../helpers/Pagination';
import ReactTable from 'react-table';
import matchSorter from 'match-sorter';

import { getSkillArray } from '../../../redux/action-creator/skill';
import { fetchAllCandidates, fetchMyCandidatesGroupList } from '../../../redux/action-creator/candidate';

import Modal from '../app/Modal';
import Button from '../app/Button';
import AdminButtons from '../app/AdminButtons';
import AddCandidateContainer from './AddCandidate.container';
import AssignInterviewerContainer from './AssignInterviewerContainer';

class AllCandidates extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      data: [],
      candidates4ReactTable: [],
      loading: false,
      myCandidatesFlag: null,
      currentPage: 0,
      pageSize: 100,
      pages: 0,
      totalItems: 0,
      allSelectedButton: true,
      filtered: [],
      statusFilter: '',
      profileFilter: '',
      newCandidate: false,
      choosenCandidate: {},
      isModalOpen: false,
      whichComponent: ""
    };
    this.onClickDelete = this.onClickDelete.bind(this);
    this.requestData = this.requestData.bind(this);
    this.refreshTable = this.refreshTable.bind(this);
    this.toggleState = this.toggleState.bind(this);
    this.setModalTitle = this.setModalTitle.bind(this);
    this.onClickAdminButtons = this.onClickAdminButtons.bind(this);
  }

  componentDidMount() {
    this.props.getSkillArray();

    this.props.user.isAdmin ? this.state.myCandidatesFlag = false : this.state.myCandidatesFlag = true;

    this.props.user.isAdmin
      ? this.props.fetchAllCandidates(0, this.state.pageSize)
        .then(allCandidatesNotRenderable => this.dataArrayAdapterForTable(allCandidatesNotRenderable))
        .then(allCandidates => this.setState({ data: allCandidates, loading: false }))
      : (!this.props.user.id)
        ? null
        : this.props.fetchMyCandidatesGroupList(this.state.currentPage, this.state.pageSize, this.props.user.id)
          .then(allCandidatesNotRenderable => this.dataArrayAdapterForTable(allCandidatesNotRenderable))
          .then(data => this.setState({ data: data, loading: false }));
  }

  onClickDelete(id) {
    axios.delete(`/api/candidate/delete/${id}`).then(() => {
      this.props.user.isAdmin
        ? this.props.fetchAllCandidates(this.state.currentPage, this.state.pageSize)
          .then(allCandidatesNotRenderable => this.dataArrayAdapterForTable(allCandidatesNotRenderable))
          .then(allCandidates => this.setState({ data: allCandidates, loading: false }))
        : this.props.fetchMyCandidatesGroupList(this.state.currentPage, this.state.pageSize, this.props.user.id)
          .then(allCandidatesNotRenderable => this.dataArrayAdapterForTable(allCandidatesNotRenderable))
          .then(data => this.setState({ data: data, loading: false }));
    });
  }

  onClickAdminButtons(myCandidatesFlag, allSelectedButton) {
    this.setState({ currentPage: 0, myCandidatesFlag, allSelectedButton, loading: true, filtered: [] }, () => { this.requestData(this.state.pageSize, 0); })
  }

  toggleState = (whichComponent) => {
    this.setState({ isModalOpen: !this.state.isModalOpen, whichComponent });
  };

  closeModal = (e) => {
    this.setState({ isModalOpen: false, modalTitle: '' })
  }

  setModalTitle() {
    let modalTitle = this.state.modalTitle;
    this.setState({ modalTitle });
  }
  refreshTable() {
    this.props.fetchAllCandidates(0, this.state.pageSize)
      .then(allCandidatesNotRenderable => this.dataArrayAdapterForTable(allCandidatesNotRenderable))
      .then(allCandidates => this.setState({ data: allCandidates, loading: false }))
  }

  requestData(pageSize, page, sorted) {
    let desc = '';
    let filt = '';
    this.state.currentPage = page;
    this.state.pageSize = pageSize;

    if (sorted) {
      for (let i in sorted) {
        desc += `&${sorted[i].id}Sorted=${sorted[i].desc}`;
      }
    }
    if (this.state.filtered) {
      for (let i in this.state.filtered) {
        filt += `&${this.state.filtered[i].id}=${this.state.filtered[i].value}`;
      }
    }
    if (typeof this.state.myCandidatesFlag === 'boolean') {
      this.state.myCandidatesFlag
        ? axios.get(`/api/candidate/sist/${this.props.user.id}/sizeOfGroup?page=${page}&pageSize=${pageSize}` + desc + filt)
          .then(res => {
            this.state.totalItems = res.data.size;
            this.state.pages = Math.ceil(res.data.size / pageSize);
          })
          .then(() => axios.get(`/api/candidate/sist/${this.props.user.id}/group?page=${page}&pageSize=${pageSize}` + desc + filt))
          .then(response => ({ rows: response.data }))
          .then(res => res.rows).then(allCandidatesNotRenderable => this.dataArrayAdapterForTable(allCandidatesNotRenderable))
          .then(allCandidates => this.setState({ data: allCandidates, loading: false }))
        : axios.get(`/api/candidate/RRHH/sizeOfGroup?page=${page}&pageSize=${pageSize}` + desc + filt).then(res => { this.state.totalItems = res.data.size; this.state.pages = Math.ceil(res.data.size / pageSize); })
          .then(() => axios.get(`/api/candidate/RRHH/group?page=${page}&pageSize=${pageSize}` + desc + filt))
          .then(response => ({ rows: response.data }))
          .then(res => res.rows).then(allCandidatesNotRenderable => this.dataArrayAdapterForTable(allCandidatesNotRenderable))
          .then(allCandidates => this.setState({ data: allCandidates, loading: false }))
    }
  }

  modalRenderer(whichComponent) {
    switch (whichComponent) {
      case 'addNewCandidateModal':
        return (
          <Modal id="modal" isOpen={this.state.isModalOpen} onClose={this.closeModal} title={"Add new candidate"}>
            <div className="box-body">
              <AddCandidateContainer refreshTable={this.refreshTable} closeModal={this.closeModal} />
            </div>
          </Modal>
        );
      case 'assignInterviewerModal': return (
        <Modal id="modal" isOpen={this.state.isModalOpen} onClose={this.closeModal} title={"Assign interviewer"}>
          <div className="box-body">
            <AssignInterviewerContainer candidateID={this.state.choosenCandidate} refreshTable={this.refreshTable} closeModal={this.closeModal} />
          </div>
        </Modal>
      );
      case 'deleteModal':
        return (
          <Modal id="modal" isOpen={this.state.isModalOpen} onClose={this.closeModal} title={"Delete candidate"}>
            <div className="box-body">
              <span> Are you sure you want to delete this candidate? </span>
              <button type="button" className="btn btn-secondary textModal" onClick={this.closeModal}>Cancel</button>
              <button type="button" className="btn btn-primary textModal" onClick={() => { this.onClickDelete(this.state.selected); this.closeModal() }}>Yes</button>
            </div>
          </Modal>
        );
      default: return;
    }

  }
  // ------------------This is commented temporarily due to app priorities.Still works properly and you need it to enable it in order to do an interview.
  // See also line 291 in order to work properly

  renderSwitch(param) {
    switch (param.status) {
      case 'New':
        return (<div className='pull-left'>
          <i className="fas fa-user-friends" onClick={() => this.setState({ choosenCandidate: param.id }, this.toggleState("assignInterviewerModal"))}></i>
          <i className="fas fa-user-edit"></i>
          <i className="far fa-file-alt "></i>
        </div>
        );
      case 'Started':
        return (
          <div className='pull-left'>
            <i className="fas fa-user-friends"></i>
            <Link to={`/preinterview/${param.id}`}>
              <i className="fas fa-user-edit"></i>
            </Link>
            <i className="far fa-file-alt"></i>
          </div>
        );
      case 'Rejected':
        return (
          <div className='pull-left'>
            <i className="fas fa-user-friends"></i>
            <i className="fas fa-user-edit"></i>
            <Link to={`/candidates/${param.id}/interview/${param.InterviewIDId}`}>
              <i className="far fa-file-alt"></i>
            </Link>
          </div>
        )
      case 'Approved':
        return (
          <div className='pull-left'>
            <i className="fas fa-user-friends"></i>
            <i className="fas fa-user-edit"></i>
            <Link to={`/candidates/${param.id}/interview/${param.InterviewIDId}`}>
              <i className="far fa-file-alt"></i>
            </Link>
          </div>
        )
    }
  }

  dataArrayAdapterForTable(dataArray) {
    if (!!dataArray && dataArray[0] && Array.isArray(dataArray[0].skills)) {
      let copyCandidates = dataArray;
      for (let i = 0; i < dataArray.length; i += 1) {
        let aux = [];
        copyCandidates[i].skills.map(skill => aux.push(skill.skill));
        aux.sort();
        copyCandidates[i].skills = aux.join(' - ');
      }
      return copyCandidates;
    } else if (!!dataArray && dataArray.length === 0) {
      return [];
    }

  }

  render() {
    const columns = [{
      Header: 'CANDIDATE',
      id: 'fullName',
      accessor: d => d.fullName,
      filterMethod: (filter, rows) => matchSorter(rows, filter.value, { keys: ['fullName'] }),
      Cell: (d) => {
        return (
          (<Link to={`/candidate/info/${d.original.id}`}>{d.original.fullName}</Link>)
        )
      },
      filterAll: true
    }, {
      Header: 'SKILLS',
      sortable: false,
      // filterable: false,
      // sortable: false,
      id: 'skills',
      accessor: d => d.skills,
      filterMethod: (filter, rows) =>
        matchSorter(rows, filter.value, { keys: ['skills'] }),
      filterAll: true,
      Filter: ({ filter, onChange }) => {
        return (
          <select onChange={event => { onChange(event.target.value); }} value={filter ? filter.value : 'all'}>
            <option value="">All</option>
            {
              this.props.skillArray
                ? this.props.skillArray.map(skill => (<option value={skill} key={skill}>{skill}</option>)
                )
                : null
            }
          </select >
        );
      }
    }, {
      Header: 'STATUS',
      sortable: false,
      id: 'status',
      accessor: d => d.status,
      filterMethod: (filter, rows) =>
        matchSorter(rows, filter.value, { keys: ['status'] }),
      filterAll: true,
      Cell: (props) => {
        return (<div style={{ textAlign: 'center' }} >
          <div id='candStatus'> {props.value}</div>
        </div>
        );
      },
      Filter: ({ filter, onChange }) => {
        return (
          <select onChange={event => { onChange(event.target.value); }} value={filter ? filter.value : 'all'}>
            <option value="" key={'a1'}>All</option>
            <option value="New" key={'a2'}>New</option>
            <option value="Started" key={'a3'}>Started</option>
            <option value="Approved" key={'a4'}>Approved</option>
            <option value="Rejected" key={'a5'}>Rejected</option>
          </select>
        );
      }
    }, {
      Header: 'ACTIONS',
      accessor: 'details',
      filterable: false,
      Cell: (props) => {
        return (
          <div className='actionsTableStyled pull-left'>
            {this.renderSwitch(props.original)}
            <i onClick={() => this.setState({ selected: props.original.id }, this.toggleState("deleteModal"))} className="far fa-trash-alt"></i>
          </div >
        );
      },
      sortable: false
    }
    ];

    return (
      <div>
        {this.state.isModalOpen ? this.modalRenderer(this.state.whichComponent) : null}

        {this.props.user.isAdmin
          ? <Button text={"Add candidate "} type={"Button"} icon={"glyphicon glyphicon-plus"} onClick={() => { this.toggleState("addNewCandidateModal") }} />
          : null
        }

        <div className="react-table">

          {this.props.user.isAdmin ? < AdminButtons allSelectedButton={this.state.allSelectedButton} onClick={this.onClickAdminButtons} /> : null}

          <ReactTable
            className="-striped -highlight"
            columns={columns}
            data={this.state.data}
            previousText="<"
            nextText=">"
            PaginationComponent={Pagination}
            page={this.state.currentPage}
            loading={this.state.loading}
            filtered={this.state.filtered}
            onFilteredChange={filtered => this.state.filtered = filtered}
            filterable
            manual
            minRows={0}
            pages={this.state.pages}
            defaultPageSize={this.state.pageSize}
            onFetchData={(state, instance) => {
              this.setState({ loading: true });
              this.requestData(state.pageSize, state.page, state.sorted, state.filtered);
            }}
            getTdProps={() => ({ style: { display: 'flex', flexDirection: 'column', justifyContent: 'center' } })}
          />
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  user: state.user.user,
  skillArray: state.question.skillArray
});
const mapDispatchToProps = (dispatch) => ({
  getSkillArray: () => dispatch(getSkillArray()),
  fetchAllCandidates: (pageNumber, pageSize) => fetchAllCandidates(pageNumber, pageSize),
  fetchAllCandidatesListSize: (pageNumber, pageSize) => fetchAllCandidatesListSize((pageNumber, pageSize)),
  fetchMyCandidatesGroupList: (pageNumber, pageSize, area) => fetchMyCandidatesGroupList(pageNumber, pageSize, area)
});

export default connect(mapStateToProps, mapDispatchToProps)(AllCandidates);