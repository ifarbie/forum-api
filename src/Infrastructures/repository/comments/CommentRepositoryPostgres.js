const AuthorizationError = require('../../../Commons/exceptions/AuthorizationError');
const NotFoundError = require('../../../Commons/exceptions/NotFoundError');
const AddedComment = require('../../../Domains/comments/entities/AddedComment');

class CommentRepositoryPostgres {
  constructor(pool, idGenerator) {
    this._pool = pool;
    this._idGenerator = idGenerator;
  }

  async addComment(newComment, threadId, userId) {
    const { content } = newComment;
    const id = `comment-${this._idGenerator()}`;

    const query = {
      text: 'INSERT INTO comments VALUES($1, $2, $3, $4) RETURNING id, content, user_id',
      values: [id, userId, threadId, content],
    };

    const result = await this._pool.query(query);

    return new AddedComment({
      id: result.rows[0].id,
      owner: result.rows[0].user_id,
      content: result.rows[0].content,
    });
  }

  async verifyCommentById(commentId) {
    const query = {
      text: 'SELECT id FROM comments WHERE id = $1',
      values: [commentId],
    };

    const result = await this._pool.query(query);

    if (!result.rowCount) {
      throw new NotFoundError('comment not found');
    }
  }

  async deleteCommentById(commentId, threadId, userId) {
    const query = {
      text: 'UPDATE comments SET is_delete = true WHERE id = $1 AND thread_id = $2 AND user_id = $3',
      values: [commentId, threadId, userId],
    };

    await this._pool.query(query);
  }

  async verifyCommentOwner(commentId, ownerId) {
    const query = {
      text: 'SELECT id FROM comments WHERE id = $1 AND user_id = $2 AND is_delete = false ',
      values: [commentId, ownerId],
    };

    const result = await this._pool.query(query);

    if (!result.rowCount) {
      throw new AuthorizationError('you are not allowed to access this resource');
    }
  }
}

module.exports = CommentRepositoryPostgres;
