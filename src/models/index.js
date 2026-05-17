import Note from './Note.js';
import Blog from './Blog.js';
import User from './User.js';
import Team from './Team.js';
import Membership from './Membership.js';
import Users_Blogs from './Users_Blogs.js';

User.hasMany(Note);
User.hasMany(Blog);

Note.belongsTo(User);
Blog.belongsTo(User);

User.belongsToMany(Team, { through: Membership });
Team.belongsToMany(User, { through: Membership });

User.belongsToMany(Blog, { through: Users_Blogs, as: 'reading_list' });
Blog.belongsToMany(User, { through: Users_Blogs, as: 'users_read' });

export { Note, Blog, User, Team };
