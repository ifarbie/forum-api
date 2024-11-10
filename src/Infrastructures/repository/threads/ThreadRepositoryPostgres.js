const NotFoundError = require('../../../Commons/exceptions/NotFoundError');
const AddedThread = require('../../../Domains/threads/entities/AddedThread');
const ThreadRepository = require('../../../Domains/threads/ThreadRepository');

class ThreadRepositoryPostgres extends ThreadRepository {
  constructor(pool, idGenerator) {
    super();
    this._pool = pool;
    this._idGenerator = idGenerator;
  }

  async addThread(newThread, ownerId) {
    const { title, body } = newThread;
    const id = `thread-${this._idGenerator()}`;

    const query = {
      text: 'INSERT INTO threads VALUES($1, $2, $3, $4) RETURNING id, user_id, title',
      values: [id, ownerId, title, body],
    };

    const result = await this._pool.query(query);

    return new AddedThread({
      id: result.rows[0].id,
      owner: result.rows[0].user_id,
      title: result.rows[0].title,
    });
  }

  async verifyThreadById(threadId) {
    const query = {
      text: 'SELECT id FROM threads WHERE id = $1',
      values: [threadId],
    };

    const result = await this._pool.query(query);

    if (!result.rowCount) {
      throw new NotFoundError('thread not found');
    }
  }

  async getThreadById(threadId) {
    const query = {
      text: `
        SELECT 
          threads.id, username, title, body, created_at 
        FROM threads 
        JOIN users on threads.user_id = users.id 
        WHERE threads.id = $1`,
      values: [threadId],
    };

    const result = await this._pool.query(query);

    if (!result.rowCount) {
      throw new NotFoundError('thread not found');
    }

    return {
      id: result.rows[0].id,
      username: result.rows[0].username,
      title: result.rows[0].title,
      body: result.rows[0].body,
      date: result.rows[0].created_at,
    };
  }
}

module.exports = ThreadRepositoryPostgres;
