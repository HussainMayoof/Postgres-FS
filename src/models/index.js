import Note from './Note.js';
import Blog from './Blog.js';
import User from './User.js';

User.sync();
Note.sync();
Blog.sync();

User.hasMany(Note);
User.hasMany(Blog);

Note.belongsTo(User);
Blog.belongsTo(User);

Note.sync({ alter: true });
Blog.sync({ alter: true });
User.sync({ alter: true });

export { Note };
export { Blog };
export { User };
