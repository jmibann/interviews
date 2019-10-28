const User = require('./User');
const Interview = require('./interview');
const Questions = require('./questions');
const Skill = require('./skill');
const Answers = require('./answers');
const Candidate = require('./candidate');

Candidate.belongsTo(User, { as: 'interviewerHR' });
Candidate.belongsTo(User, { as: 'interSIST1' });
Candidate.belongsTo(User, { as: 'interSIST2' });

Interview.belongsTo(Candidate, { as: 'candidateID' });
Candidate.belongsTo(Interview, { as: 'InterviewID', constraints: false });

Questions.belongsToMany(Skill, { through: 'skill-questions' });
Skill.belongsToMany(Questions, { through: 'skill-questions' });

Candidate.belongsToMany(Skill, { through: 'candidate_skill' });
Skill.belongsToMany(Candidate, { through: 'candidate_skill' });

Interview.belongsToMany(Questions, { through: Answers });
Questions.belongsToMany(Interview, { through: Answers });
Interview.hasMany(Answers);

module.exports = { User, Interview, Questions, Answers };
