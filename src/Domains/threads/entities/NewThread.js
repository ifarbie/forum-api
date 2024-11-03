class NewThread {
  constructor({ title, body }) {
    if (!title || !body) {
      throw new Error('ADD_THREAD.NOT_CONTAIN_NEEDED_PROPERTY');
    }

    if (title.length > 100) {
      throw new Error('ADD_THREAD.TITLE_LIMIT_CHAR');
    }

    if (typeof title !== 'string' || typeof body !== 'string') {
      throw new Error('ADD_THREAD.NOT_MEET_DATA_TYPE_SPECIFICATION');
    }

    this.title = title;
    this.body = body;
  }
}

module.exports = NewThread;
