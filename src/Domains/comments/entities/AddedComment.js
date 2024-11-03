class AddedComment {
  constructor({ id, owner, content }) {
    if (!id || !owner || !content) {
      throw new Error('ADDED_COMMENT.NOT_CONTAIN_NEEDED_PROPERTY');
    }

    if (typeof id !== 'string' || typeof owner !== 'string' || typeof content !== 'string') {
      throw new Error('ADDED_COMMENT.NOT_MEET_DATA_TYPE_SPECIFICATION');
    }

    this.id = id;
    this.owner = owner;
    this.content = content;
  }
}

module.exports = AddedComment;
