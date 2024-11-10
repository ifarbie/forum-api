/* eslint-disable max-len */
const CommentsTableTestHelper = require('../../../../../tests/CommentsTableTestHelper');
const ThreadsTableTestHelper = require('../../../../../tests/ThreadsTableTestHelper');
const UsersTableTestHelper = require('../../../../../tests/UsersTableTestHelper');
const AuthorizationError = require('../../../../Commons/exceptions/AuthorizationError');
const NotFoundError = require('../../../../Commons/exceptions/NotFoundError');
// const NotFoundError = require('../../../../Commons/exceptions/NotFoundError');
const AddedComment = require('../../../../Domains/comments/entities/AddedComment');
const pool = require('../../../database/postgres/pool');
const CommentRepositoryPostgres = require('../CommentRepositoryPostgres');

describe('CommentRepositoryPostgres', () => {
  beforeAll(async () => {
    await UsersTableTestHelper.addUser({ id: 'user-123', username: 'dicoding', password: 'secret' });
    await ThreadsTableTestHelper.addThread({ id: 'thread-123' });
  });

  afterEach(async () => {
    await CommentsTableTestHelper.cleanTable();
  });

  afterAll(async () => {
    await UsersTableTestHelper.cleanTable();
    await ThreadsTableTestHelper.cleanTable();
    await pool.end();
  });

  describe('addComment function', () => {
    it('should persist add comment', async () => {
      // Arrange
      const newComment = {
        content: 'ini comment',
      };
      const fakeIdGenerator = () => '123';
      const commentRepositoryPostgres = new CommentRepositoryPostgres(pool, fakeIdGenerator);

      // Action
      await commentRepositoryPostgres.addComment(newComment, 'thread-123', 'user-123');

      // Assert
      const comments = await CommentsTableTestHelper.findCommentById('comment-123');
      expect(comments).toHaveLength(1);
    });

    it('should return added comment correctly', async () => {
      // Arrange
      const newComment = {
        content: 'ini comment',
      };
      const fakeIdGenerator = () => '123';
      const commentRepositoryPostgres = new CommentRepositoryPostgres(pool, fakeIdGenerator);

      // Action
      const comment = await commentRepositoryPostgres.addComment(newComment, 'thread-123', 'user-123');

      // Assert
      expect(comment).toStrictEqual(
        new AddedComment({
          id: 'comment-123',
          owner: 'user-123',
          content: 'ini comment',
        })
      );
    });
  });

  describe('verifyCommentById function', () => {
    it('should throw NotFoundError when comment not found', async () => {
      // Arrange
      await CommentsTableTestHelper.addComment({ id: 'comment-123', user_id: 'user-123', thread_id: 'thread-123', content: 'ini comment' });
      const commentRepositoryPostgres = new CommentRepositoryPostgres(pool, {});

      // Action & Assert
      await expect(commentRepositoryPostgres.verifyCommentById('comment-321', 'thread-123', 'user-123')).rejects.toThrowError(NotFoundError);
    });
  });

  describe('deleteCommentById function', () => {
    it('should soft delete comment correctly', async () => {
      // Arrange
      await CommentsTableTestHelper.addComment({
        id: 'comment-123',
        user_id: 'user-123',
        thread_id: 'thread-123',
        content: 'ini comment',
      });
      const commentRepositoryPostgres = new CommentRepositoryPostgres(pool, {});

      // Action
      await expect(commentRepositoryPostgres.deleteCommentById('comment-123', 'thread-123', 'user-123'));
      const deletedComment = await CommentsTableTestHelper.findCommentById('comment-123');

      // Assert
      expect(deletedComment[0].is_delete).toEqual(true);
    });
  });

  describe('verifyCommentOwner function', () => {
    it('should throw AuthorizationError when comment not found', async () => {
      // Arrange
      await CommentsTableTestHelper.addComment({ id: 'comment-123', user_id: 'user-123', thread_id: 'thread-123', content: 'ini comment' });
      const commentRepositoryPostgres = new CommentRepositoryPostgres(pool, {});

      // Action & Assert
      await expect(commentRepositoryPostgres.verifyCommentOwner('comment-123', 'user-321')).rejects.toThrowError(AuthorizationError);
    });

    it('should verify comment owner correctly', async () => {
      // Arrange
      await CommentsTableTestHelper.addComment({ id: 'comment-123', user_id: 'user-123', thread_id: 'thread-123', content: 'ini comment' });
      const commentRepositoryPostgres = new CommentRepositoryPostgres(pool, {});

      // Action & Assert
      await expect(commentRepositoryPostgres.verifyCommentOwner('comment-123', 'user-123')).resolves.not.toThrowError();
    });
  });
});
