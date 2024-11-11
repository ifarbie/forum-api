class GetComment {
  constructor({ id, date, username, content, is_delete }) {
    if (!id || !date || !username || !content || is_delete === undefined) {
      throw new Error('GET_COMMENT.NOT_CONTAIN_NEEDED_PROPERTY');
    }

    if (typeof id !== 'string' || typeof username !== 'string' || typeof content !== 'string' || typeof is_delete !== 'boolean') {
      throw new Error('GET_COMMENT.NOT_MEET_DATA_TYPE_SPECIFICATION');
    }

    this.id = id;
    this.username = username;
    this.content = content;
    this.date = date;
    this.is_delete = is_delete;
  }
}

module.exports = GetComment;
