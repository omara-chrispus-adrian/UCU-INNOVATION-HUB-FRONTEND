const User = require('./User');
const Project = require('./Project');
const Comment = require('./Comment');

// Define associations
User.hasMany(Project, { foreignKey: 'student_id', as: 'projects' });
Project.belongsTo(User, { foreignKey: 'student_id', as: 'student' });

User.hasMany(Project, { foreignKey: 'supervisor_id', as: 'supervised_projects' });
Project.belongsTo(User, { foreignKey: 'supervisor_id', as: 'supervisor' });

User.hasMany(Comment, { foreignKey: 'user_id', as: 'comments' });
Comment.belongsTo(User, { foreignKey: 'user_id', as: 'user' });

Project.hasMany(Comment, { foreignKey: 'project_id', as: 'comments' });
Comment.belongsTo(Project, { foreignKey: 'project_id', as: 'project' });

module.exports = {
    User,
    Project,
    Comment
};
