const ThreadsTableTestHelper = require('../../../../../tests/ThreadsTableTestHelper');
const UsersTableTestHelper = require('../../../../../tests/UsersTableTestHelper');
const NotFoundError = require('../../../../Commons/exceptions/NotFoundError');
const AddedThread = require('../../../../Domains/threads/entities/AddedThread');
const NewThread = require('../../../../Domains/threads/entities/NewThread');
const pool = require('../../../database/postgres/pool');
const ThreadRepositoryPostgres = require('../ThreadRepositoryPostgres');

describe('ThreadRepositoryPostgres', () => {
  beforeAll(async () => {
    await UsersTableTestHelper.addUser({ id: 'user-123', username: 'dicoding', password: 'secret' });
  });

  afterEach(async () => {
    await ThreadsTableTestHelper.cleanTable();
  });

  afterAll(async () => {
    await UsersTableTestHelper.cleanTable();
    await pool.end();
  });

  describe('addThread function', () => {
    it('should persist add thread', async () => {
      // Arrange
      const newThread = new NewThread({ title: 'dicoding', body: 'Dicoding Indonesia' });
      const fakeIdGenerator = () => '123';
      const threadRepositoryPostgres = new ThreadRepositoryPostgres(pool, fakeIdGenerator);
      const expectedThread = new AddedThread({
        id: 'thread-123',
        owner: 'user-123',
        title: 'dicoding',
      });

      // Action
      const addedThread = await threadRepositoryPostgres.addThread(newThread, 'user-123');

      // Assert
      expect(addedThread).toStrictEqual(expectedThread);
    });

    it('should return added thread correctly', async () => {
      // Arrange
      const newThread = new NewThread({ title: 'dicoding', body: 'Dicoding Indonesia' });
      const fakeIdGenerator = () => '123';
      const threadRepositoryPostgres = new ThreadRepositoryPostgres(pool, fakeIdGenerator);

      // Action
      const addedThread = await threadRepositoryPostgres.addThread(newThread, 'user-123');

      // Assert
      expect(addedThread).toStrictEqual(
        new AddedThread({
          id: 'thread-123',
          owner: 'user-123',
          title: 'dicoding',
        })
      );
    });
  });

  describe('verifyThreadById function', () => {
    it('should throw NotFoundError when thread not found', async () => {
      // Arrange
      await ThreadsTableTestHelper.addThread({ id: 'thread-123', user_id: 'user-123', title: 'dicoding', body: 'Dicoding Indonesia' });
      const threadRepositoryPostgres = new ThreadRepositoryPostgres(pool, {});

      // Action & Assert
      await expect(threadRepositoryPostgres.verifyThreadById('thread-321')).rejects.toThrowError(NotFoundError);
    });

    it('should verify thread by id correctly', async () => {
      // Arrange
      await ThreadsTableTestHelper.addThread({ id: 'thread-123', user_id: 'user-123', title: 'dicoding', body: 'Dicoding Indonesia' });
      const threadRepositoryPostgres = new ThreadRepositoryPostgres(pool, {});

      // Action & Assert
      await expect(threadRepositoryPostgres.verifyThreadById('thread-123')).resolves.not.toThrowError(NotFoundError);
    });
  });

  describe('getThreadById function', () => {
    it('should throw NotFoundError when thread not found', async () => {
      // Arrange
      await ThreadsTableTestHelper.addThread({
        id: 'thread-123',
        title: 'Title thread',
        body: 'Body thread',
        owner: 'user-123',
      });

      const threadRepositoryPostgres = new ThreadRepositoryPostgres(pool, {});
      await expect(threadRepositoryPostgres.getThreadById('thread-321')).rejects.toThrowError(NotFoundError);
    });

    it('should return thread correctly', async () => {
      // Arrange
      await ThreadsTableTestHelper.addThread({
        id: 'thread-123',
        title: 'Title thread',
        body: 'Body thread',
        owner: 'user-123',
      });

      const threadRepositoryPostgres = new ThreadRepositoryPostgres(pool, {});
      const thread = await threadRepositoryPostgres.getThreadById('thread-123');
      expect(thread.id).toEqual('thread-123');
      expect(thread.title).toEqual('Title thread');
      expect(thread.body).toEqual('Body thread');
      expect(thread.date).toBeDefined();
      expect(thread.username).toEqual('dicoding');
    });
  });
});
