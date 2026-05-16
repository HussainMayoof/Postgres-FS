import Note from './Note.js';
import Blog from './Blog.js';
import User from './User.js';

User.hasMany(Note);
User.hasMany(Blog);

Note.belongsTo(User);
Blog.belongsTo(User);

const syncModels = async () => {
    await User.sync({ alter: true });
    await Note.sync({ alter: true });
    await Blog.sync({ alter: true });
};

export { Note };
export { Blog };
export { User };
export { syncModels };
