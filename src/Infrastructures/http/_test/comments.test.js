const CommentsTableTestHelper = require('../../../../tests/CommentsTableTestHelper');
const ThreadsTableTestHelper = require('../../../../tests/ThreadsTableTestHelper');
const UsersTableTestHelper = require('../../../../tests/UsersTableTestHelper');
const container = require('../../container');
const pool = require('../../database/postgres/pool');
const createServer = require('../createServer');

describe('comments endpoint', () => {
  const userData = {
    username: 'dicoding',
    fullname: 'Dicoding Indonesia',
    password: 'secret',
  };

  beforeEach(async () => {
    const server = await createServer(container);
    // Login
    await server.inject({
      method: 'POST',
      url: '/users',
      payload: {
        username: userData.username,
        fullname: userData.fullname,
        password: userData.password,
      },
    });

    const auth = await server.inject({
      method: 'POST',
      url: '/authentications',
      payload: {
        username: userData.username,
        password: userData.password,
      },
    });

    const {
      data: { accessToken },
    } = JSON.parse(auth.payload);
    userData.accessToken = accessToken;
  });

  afterEach(async () => {
    await UsersTableTestHelper.cleanTable();
    await ThreadsTableTestHelper.cleanTable();
    await CommentsTableTestHelper.cleanTable();
  });
  afterAll(async () => {
    await pool.end();
  });

  describe('when POST /threads/{threadId}/comments', () => {
    const threadData = {
      title: 'dicoding',
      body: 'Dicoding Indonesia',
    };

    beforeEach(async () => {
      const server = await createServer(container);

      const response = await server.inject({
        method: 'POST',
        url: '/threads',
        payload: threadData,
        headers: {
          Authorization: `Bearer ${userData.accessToken}`,
        },
      });

      const responseJSON = JSON.parse(response.payload);
      threadData.id = responseJSON.data.addedThread.id;
    });

    it('should response 400 when request payload not contain needed property', async () => {
      const server = await createServer(container);

      // Arrange
      const requestPayload = {
        contents: 'ini comment di properti yang salah',
      };

      // Action
      const response = await server.inject({
        method: 'POST',
        url: `/threads/${threadData.id}/comments`,
        payload: requestPayload,
        headers: {
          Authorization: `Bearer ${userData.accessToken}`,
        },
      });

      // Assert
      const responseJson = JSON.parse(response.payload);
      expect(response.statusCode).toEqual(400);
      expect(responseJson.status).toEqual('fail');
    });

    it('should response 400 when request payload not meet data type specification', async () => {
      const server = await createServer(container);

      // Arrange
      const requestPayload = {
        content: 123,
      };

      // Action
      const response = await server.inject({
        method: 'POST',
        url: '/threads/thread-123/comments',
        payload: requestPayload,
        headers: {
          Authorization: `Bearer ${userData.accessToken}`,
        },
      });

      // Assert
      const responseJson = JSON.parse(response.payload);
      expect(response.statusCode).toEqual(400);
      expect(responseJson.status).toEqual('fail');
    });

    it('should response 201 and persisted comment', async () => {
      const server = await createServer(container);

      // Arrange
      const requestPayload = {
        content: 'Ini adalah comment yang benar',
      };

      // Action
      const response = await server.inject({
        method: 'POST',
        url: `/threads/${threadData.id}/comments`,
        payload: requestPayload,
        headers: {
          Authorization: `Bearer ${userData.accessToken}`,
        },
      });

      // Assert
      const responseJson = JSON.parse(response.payload);
      expect(response.statusCode).toEqual(201);
      expect(responseJson.status).toEqual('success');
      expect(responseJson.data.addedComment).toBeDefined();
    });
  });

  describe('when DELETE /threads/{threadId}/comments/{commentId}', () => {
    const threadData = {
      title: 'dicoding',
      body: 'Dicoding Indonesia',
    };

    const commentData = {
      content: 'Ini adalah comment untuk endpoint delete',
    };

    beforeEach(async () => {
      const server = await createServer(container);

      const responseThread = await server.inject({
        method: 'POST',
        url: '/threads',
        payload: threadData,
        headers: {
          Authorization: `Bearer ${userData.accessToken}`,
        },
      });
      const responseJSON = JSON.parse(responseThread.payload);
      threadData.id = responseJSON.data.addedThread.id;

      const responseComment = await server.inject({
        method: 'POST',
        url: `/threads/${threadData.id}/comments`,
        headers: {
          Authorization: `Bearer ${userData.accessToken}`,
        },
        payload: commentData,
      });

      const responseCommentJson = JSON.parse(responseComment.payload);
      commentData.id = responseCommentJson.data.addedComment.id;
    });

    // it('should response 401 when not authenticated', async () => {
    //   const server = await createServer(container);

    //   // Arrange
    //   const threadId = threadData.id;
    //   const commentId = commentData.id;

    //   // Action
    //   const response = await server.inject({
    //     method: 'POST',
    //     url: `/threads/${threadId}/comments/${commentId}`,
    //   });

    //   // Assert
    //   const responseJson = JSON.parse(response.payload);
    //   expect(response.statusCode).toEqual(401);
    //   expect(responseJson.status).toEqual('success');
    // });

    it('should response 200 and delete comment correctly when delete success', async () => {
      const server = await createServer(container);

      // Arrange
      const threadId = threadData.id;
      const commentId = commentData.id;

      // Action
      const response = await server.inject({
        method: 'DELETE',
        url: `/threads/${threadId}/comments/${commentId}`,
        headers: {
          Authorization: `Bearer ${userData.accessToken}`,
        },
      });
      const result = await CommentsTableTestHelper.findCommentById(commentId);

      // Assert
      const responseJson = JSON.parse(response.payload);
      expect(response.statusCode).toEqual(200);
      expect(responseJson.status).toEqual('success');
      expect(result[0].is_delete).toEqual(true);
    });
  });
});
