import { combineReducers } from 'redux';
import user from './user';
import candidate from './candidate';
import question from './question';
import interview from './interview';
import answers from './answer.js';
import { reducer as toastr } from 'react-redux-toastr';

export default combineReducers({ user, candidate, question, interview, answers, toastr });
