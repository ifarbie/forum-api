class AddedThread {
  constructor({ id, owner, title }) {
    if (!id || !owner || !title) {
      throw new Error('ADDED_THREAD.NOT_CONTAIN_NEEDED_PROPERTY');
    }

    if (title.length > 100) {
      throw new Error('ADDED_THREAD.TITLE_LIMIT_CHAR');
    }

    if (typeof id !== 'string' || typeof owner !== 'string' || typeof title !== 'string') {
      throw new Error('ADDED_THREAD.NOT_MEET_DATA_TYPE_SPECIFICATION');
    }

    this.id = id;
    this.owner = owner;
    this.title = title;
  }
}

module.exports = AddedThread;
