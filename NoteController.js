import Note from './Note.js';

class NoteController {
	async create(req, res) {
		try {
			const { title, date, completed } = req.body;
			const note = await Note.create({ title, date, completed });
			res.json(note);
		} catch (error) {
			res.status(500).json(error.message);
		}
	}
	async fetchAll(req, res) {
		try {
			const notes = await Note.find();
			return res.json(notes);
		} catch (error) {
			res.status(500).json(error.message);
		}
	}
	async fetchOne(req, res) {
		try {
			const { id } = req.params;
			if (!id) {
				res.status(400).json({
					message: `Заметка с такой ${id} не найдено`,
				});
			}
			const note = await Note.findById(id);
			return res.json(note);
		} catch (error) {
			res.status(500).json(error.message);
		}
	}
	async update(req, res) {
		try {
			const note = req.body;
			if (!note._id) {
				res.status(400).json({ message: 'ID не найдено' });
			}
			const updatedNote = await Note.findByIdAndUpdate(note._id, note, {
				new: true,
			});
			return res.json(updatedNote);
		} catch (error) {
			res.status(500).json(error.message);
		}
	}
	async delete(req, res) {
		try {
			const { id } = req.params;
			if (!id) {
				res.status(400).json({ message: 'ID не указан' });
			}
			const note = await Note.findByIdAndDelete(id);
			return res.json(note);
		} catch (error) {
			res.status(500).json(error.message);
		}
	}
	async search(req, res) {
		try {
			const { q } = req.query;
			const notes = await Note.find({
				title: { $regex: q, $options: 'i' },
			});
			res.json(notes);
		} catch (error) {
			res.status(500).json({ message: 'Ошибка сервера' });
		}
	}
}
export default new NoteController();
