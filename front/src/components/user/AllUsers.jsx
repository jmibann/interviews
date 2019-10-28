import React from 'react';
import Pagination from '../../helpers/Pagination';
import ReactTable from 'react-table';
import matchSorter from 'match-sorter';
import axios from 'axios';

import Button from '../app/Button';
import Modal from '../app/Modal'
import AddUser from './AddUser.container';

class AllUsers extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isModalOpen: false,
      whichComponent: "",
      selectedUser: null
    };

    this.toggleState = this.toggleState.bind(this);
    this.closeModal = this.closeModal.bind(this);
  }

  deleteUser() {
    axios.delete(`/api/user/delete/${this.state.selectedUser}`)
      .then(() => this.props.getAllUsers())
      .then(() => this.closeModal())
  }

  toggleState = (whichComponent, selectedUser) => {
    this.setState({ isModalOpen: !this.state.isModalOpen, whichComponent, selectedUser });
  };

  closeModal = (e) => {
    this.setState({ isModalOpen: false })
  }

  modalRenderer(whichComponent) {
    switch (whichComponent) {
      case 'addNewUser':
        return (
          <Modal id="modal" isOpen={this.state.isModalOpen} onClose={this.closeModal} title={"Add new user"}>
            <div className="box-body">
              <AddUser closeModal={this.closeModal} />
            </div>
          </Modal>
        );
      case 'deleteUser': return (
        <Modal id="modal" isOpen={this.state.isModalOpen} onClose={this.closeModal} title={"Delete user"}>
          <div className="box-body">
            <span> Are you sure you want to delete this user? </span>
            <button type="button" className="btn btn-secondary textModal" onClick={this.closeModal}>Cancel</button>
            <button type="button" className="btn btn-primary textModal" onClick={() => this.deleteUser()}>Yes</button>
          </div>
        </Modal>
      );
      default: return;
    }

  }

  render() {

    const columns = [{
      Header: 'NAME',
      id: 'nombre',
      accessor: d => d.nombre,
      filterMethod: (filter, rows) =>
        matchSorter(rows, filter.value, { keys: ['nombre'] }),
      filterAll: true
    },
    {
      Header: 'EMAIL',
      sortable: false,
      id: 'email',
      accessor: d => d.email,
      width: 300,
      filterMethod: (filter, rows) =>
        matchSorter(rows, filter.value, { keys: ['email'] }),
      filterAll: true
    },
    {
      Header: 'ADMIN',
      sortable: false,
      id: 'isAdmin',
      accessor: d => d.isAdmin,
      width: 100,
      Cell: (props) =>
        <div style={{ textAlign: 'center' }}>
          {props.original.isAdmin
            ? <i className="far fa-check-circle" style={{ color: 'green' }}></i>
            : <i className="far fa-times-circle" style={{ color: 'red' }}></i>
          }
        </div>,
      filterAll: true,
      filterMethod: (filter, rows) => matchSorter(rows, filter.value, { keys: ['isAdmin'] }),
      Filter: ({ filter, onChange }) =>
        <select
          onChange={event => onChange(event.target.value)}
          style={{ width: '100%' }}
          value={filter ? filter.value : 'all'}
        >
          <option value="">All</option>
          <option value={true}>Admin</option>
          <option value={false}>User</option>
        </select>
    },
    {
      Header: 'ACTIONS',
      accessor: 'details',
      width: 100,
      filterable: false,
      Cell: (props) => {
        return (
          <div style={{ margin: '10px', textAlign: 'center' }}>
            <i
              className="far fa-trash-alt"
              onClick={() => this.toggleState("deleteUser", props.original.id)}
              style={{ marginLeft: '10px' }}
              data-toggle="modal"
              data-target="#exampleModal"
            ></i>
          </div>
        );
      },
      sortable: false
    }
    ];
    return (
      <div>

        {this.state.isModalOpen ? this.modalRenderer(this.state.whichComponent) : null}

        <Button text={"Add User "} icon={"glyphicon glyphicon-plus"} onClick={() => this.toggleState("addNewUser")} />

        <ReactTable
          className="-striped -highlight"
          columns={columns}
          data={this.props.users}
          previousText="<"
          nextText=">"
          PaginationComponent={Pagination}
          loading={this.state.loading}
          filterable
          minRows={0}
          pages={this.state.pages}
          defaultPageSize={this.state.pageSize}
          getTdProps={() => ({ style: { display: 'flex', flexDirection: 'column', justifyContent: 'center' } })}
        />

      </div>
    );
  }
};

export default AllUsers;