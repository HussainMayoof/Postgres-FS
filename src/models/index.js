import Note from './Note.js';
import Blog from './Blog.js';
import User from './User.js';

User.hasMany(Note);
User.hasMany(Blog);

Note.belongsTo(User);
Blog.belongsTo(User);

export { Note, Blog, User };
