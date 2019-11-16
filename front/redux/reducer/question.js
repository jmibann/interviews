import { SET_SKILL_ARRAY } from '../constants';

const initialState = { allQuestions: [] };

export default (state = initialState, action) => {
  switch (action.type) {
    case SET_SKILL_ARRAY:
      return Object.assign({}, state, { skillArray: action.skillArray });
    default:
      return state;
  }
};
