import React from 'react';
import { connect } from 'react-redux';
import axios from 'axios';
import { toastr } from 'react-redux-toastr';

import SkillInput from './SkillInput';
import { createSkill, getAllSkills } from '../../../redux/action-creator/skill'

class AddSkill extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      skillList: [],
      skillInput: '',
      searchSkillInput: '',
      isLoading: false,
    };

    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.handleDelete = this.handleDelete.bind(this);
    this.handleChangeSearchSkills = this.handleChangeSearchSkills.bind(this);
    this.refreshTable = this.refreshTable.bind(this);
  };

  componentDidMount() {
    this.setState({ isLoading: true }, () => getAllSkills().then(skillList => this.setState({ skillList, isLoading: false })))
  };

  handleChange(e) {
    let input = e.target.value;
    this.setState({ skillInput: input });
  }

  lowercaseOrderedString(string) {
    let orderedString = string.toLowerCase().replace(/\s+/g, ' ').split(' ');

    if (orderedString[0] === ' ') orderedString.shift();
    if (orderedString[orderedString.length - 1] === ' ') orderedString.pop();

    return orderedString.sort().join(' ');

  }
  refreshTable() {
    this.setState({ isLoading: true }, () => getAllSkills().then(skillList => this.setState({ skillList, isLoading: false })))
  }

  handleSubmit(e) {
    e.preventDefault();
    if (this.state.skillInput === '') {
      toastr.error('No skill selected', 'Skill field cannot be empty');
    } else {

      let skill = this.lowercaseOrderedString(this.state.skillInput);

      createSkill(skill).then(created => {
        if (created) {
          this.setState({ skillInput: '', isLoading: true });
          getAllSkills().then(skillList => this.setState({ skillList, isLoading: false }));
        }
        else {
          toastr.error('Skill already exist!', 'Skill cannot be created because already exits');
        }
      });
    }
  }

  handleChangeSearchSkills(e) {
    this.setState({ searchSkillInput: e.target.value });
  }

  handleDelete(e) {
    let index = e.target.getAttribute('name');
    axios.post('/api/skill/delete', { deleted: index }).then(() => getAllSkills().then(skillList => this.setState({ skillList })));
  };

  render() {
    return (
      <SkillInput
        refreshTable={this.refreshTable}
        skillList={this.state.skillList}
        skillInput={this.state.skillInput}
        searchSkillInput={this.state.searchSkillInput}
        handleSubmit={this.handleSubmit}
        handleChange={this.handleChange}
        handleDelete={this.handleDelete}
        handleSearch={this.handleChangeSearchSkills}
        isLoading={this.state.isLoading}
      />
    );
  }
}

const mapDispatchToProps = (dispatch) => ({
  createSkill: (skill) => dispatch(createSkill(skill)),
  skillList: () => dispatch(skillList())
});

export default connect(null, mapDispatchToProps)(AddSkill);