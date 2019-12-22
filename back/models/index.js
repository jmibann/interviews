const User = require('./User');
const File = require('./file');
const Skill = require('./skill');
const Answers = require('./answers');
const Template = require('./templates');
const Interview = require('./interview');
const Questions = require('./questions');
const Candidate = require('./candidate');

Candidate.belongsTo(User, { as: 'interviewer1' });
Candidate.belongsTo(User, { as: 'interviewer2' });
Candidate.belongsTo(User, { as: 'interviewer3' });

Candidate.belongsToMany(File, { through: 'candidate-file' });

Interview.belongsTo(Candidate, { as: 'candidateID' });
Candidate.belongsTo(Interview, { as: 'InterviewID', constraints: false });

Questions.belongsToMany(Skill, { through: 'skill-questions' });
Skill.belongsToMany(Questions, { through: 'skill-questions' });

Candidate.belongsToMany(Skill, { through: 'candidate_skill' });
Skill.belongsToMany(Candidate, { through: 'candidate_skill' });

Interview.belongsToMany(Questions, { through: Answers });
Questions.belongsToMany(Interview, { through: Answers });
Interview.hasMany(Answers);

Template.belongsTo(User, { as: 'templates_user' });
Template.belongsToMany(Skill, { through: 'templates_skills' });
Template.belongsToMany(Questions, { through: 'templates_questions' });


module.exports = { User, Interview, Questions, Answers, Template };