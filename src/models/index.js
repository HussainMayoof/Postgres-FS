import Note from './Note.js';
import Blog from './Blog.js';
import User from './User.js';
import Team from './Team.js';
import Membership from './Membership.js';
import Users_Blogs from './Users_Blogs.js';
import Session from './Session.js';

User.hasMany(Note);
User.hasMany(Blog);

Note.belongsTo(User);
Blog.belongsTo(User);

User.belongsToMany(Team, { through: Membership });
Team.belongsToMany(User, { through: Membership });

User.belongsToMany(Blog, { through: Users_Blogs, as: 'readings' });
Blog.belongsToMany(User, { through: Users_Blogs, as: 'users_reading' });

User.hasMany(Session);
Session.belongsTo(User);

export { Note, Blog, User, Team, Membership, Users_Blogs, Session };
