const pool = require('../../database/postgres/pool');
const ThreadsTableTestHelper = require('../../../../tests/ThreadsTableTestHelper');
const UsersTableTestHelper = require('../../../../tests/UsersTableTestHelper');
const container = require('../../container');
const createServer = require('../createServer');

describe('/threads endpoint', () => {
  afterAll(async () => {
    await pool.end();
  });

  afterEach(async () => {
    await ThreadsTableTestHelper.cleanTable();
    await UsersTableTestHelper.cleanTable();
  });

  describe('when POST /threads', () => {
    it('should response 201 and persisted thread', async () => {
      const server = await createServer(container);

      // Arrange
      const requestPayload = {
        title: 'dicoding',
        body: 'Dicoding Indonesia',
      };

      // Login
      await server.inject({
        method: 'POST',
        url: '/users',
        payload: {
          username: 'dicoding',
          fullname: 'Dicoding Indonesia',
          password: 'secret',
        },
      });
      const loginPayload = {
        username: 'dicoding',
        password: 'secret',
      };
      const auth = await server.inject({
        method: 'POST',
        url: '/authentications',
        payload: loginPayload,
      });
      const { data } = JSON.parse(auth.payload);
      const { accessToken } = data;

      // Action
      const response = await server.inject({
        method: 'POST',
        url: '/threads',
        payload: requestPayload,
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      });

      // Assert
      const responseJson = JSON.parse(response.payload);
      expect(response.statusCode).toEqual(201);
      expect(responseJson.status).toEqual('success');
      expect(responseJson.data.addedThread).toBeDefined();
    });

    it('should response 400 when request payload not contain needed property', async () => {
      const server = await createServer(container);

      // Arrange
      const requestPayload = {
        title: 'Dicoding Indonesia',
      };

      // Login
      await server.inject({
        method: 'POST',
        url: '/users',
        payload: {
          username: 'dicoding',
          fullname: 'Dicoding Indonesia',
          password: 'secret',
        },
      });
      const loginPayload = {
        username: 'dicoding',
        password: 'secret',
      };
      const auth = await server.inject({
        method: 'POST',
        url: '/authentications',
        payload: loginPayload,
      });
      const { data } = JSON.parse(auth.payload);
      const { accessToken } = data;

      // Action
      const response = await server.inject({
        method: 'POST',
        url: '/threads',
        payload: requestPayload,
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      });

      // Assert
      const responseJson = JSON.parse(response.payload);
      expect(response.statusCode).toEqual(400);
      expect(responseJson.status).toEqual('fail');
      expect(responseJson.message).toBeDefined();
    });

    it('should response 400 when request payload not meet data type specification', async () => {
      const server = await createServer(container);

      // Arrange
      const requestPayload = {
        title: 123,
        body: 'Dicoding',
      };

      // Login
      await server.inject({
        method: 'POST',
        url: '/users',
        payload: {
          username: 'dicoding',
          fullname: 'Dicoding Indonesia',
          password: 'secret',
        },
      });
      const loginPayload = {
        username: 'dicoding',
        password: 'secret',
      };
      const auth = await server.inject({
        method: 'POST',
        url: '/authentications',
        payload: loginPayload,
      });
      const { data } = JSON.parse(auth.payload);
      const { accessToken } = data;

      // Action
      const response = await server.inject({
        method: 'POST',
        url: '/threads',
        payload: requestPayload,
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      });

      // Assert
      const responseJson = JSON.parse(response.payload);
      expect(response.statusCode).toEqual(400);
      expect(responseJson.status).toEqual('fail');
      expect(responseJson.message).toBeDefined();
    });

    it('should response 400 when title more than 100 character', async () => {
      const server = await createServer(container);

      // Arrange
      const requestPayload = {
        title:
          // eslint-disable-next-line max-len
          'Lorem ipsum dolor sit amet consectetur, adipisicing elit. Suscipit eius soluta labore porro deserunt velit voluptate excepturi quod, quasi voluptatibus aliquid facere, placeat, quas non incidunt similique eveniet sint error vitae! Rem reiciendis esse odio minima, iure sequi ex? Laboriosam harum incidunt tempore repudiandae itaque rem sunt enim nulla placeat dolorum explicabo rerum beatae minima pariatur, nesciunt nam fugiat ipsa provident assumenda dolorem. Nam numquam doloribus pariatur dicta aut vitae officia reiciendis dolor culpa, reprehenderit quas aperiam optio laudantium, error amet, nemo cum beatae fugiat omnis magnam! Adipisci molestias deleniti et corporis. Ea voluptate illum suscipit id eaque quod nemo rem voluptates aut doloremque nisi odio vel accusantium laudantium inventore molestiae, deserunt beatae vero reprehenderit perferendis temporibus atque. A, maiores!',
        body: 'Dicoding Indonesia',
      };

      // Login
      await server.inject({
        method: 'POST',
        url: '/users',
        payload: {
          username: 'dicoding',
          fullname: 'Dicoding Indonesia',
          password: 'secret',
        },
      });
      const loginPayload = {
        username: 'dicoding',
        password: 'secret',
      };
      const auth = await server.inject({
        method: 'POST',
        url: '/authentications',
        payload: loginPayload,
      });
      const { data } = JSON.parse(auth.payload);
      const { accessToken } = data;

      // Action
      const response = await server.inject({
        method: 'POST',
        url: '/threads',
        payload: requestPayload,
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      });

      // Assert
      const responseJson = JSON.parse(response.payload);
      expect(response.statusCode).toEqual(400);
      expect(responseJson.status).toEqual('fail');
      expect(responseJson.message).toBeDefined();
    });
  });
});
