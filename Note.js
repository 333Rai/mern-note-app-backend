import mongoose from 'mongoose';

const Note = new mongoose.Schema({
	title: {
		type: String,
		required: true,
	},
	date: {
		type: String,
	},
	completed: {
		type: Boolean,
	},
});
export default mongoose.model('Note', Note, 'notes');
