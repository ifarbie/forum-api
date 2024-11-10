const GetThread = require('../GetThread');

describe('a GetThread entities', () => {
  it('should throw error when payload did not contain needed property', () => {
    const payload = {};
    //   Action and assert
    expect(() => new GetThread(payload)).toThrowError('GET_THREAD.NOT_CONTAIN_NEEDED_PROPERTY');
  });

  it('should throw an error when payload did not meet data type specification', () => {
    const payload = {
      id: 123,
      title: true,
      body: 'abc',
      date: true,
      username: true,
    };

    //   Action and assert
    expect(() => new GetThread(payload)).toThrowError('GET_THREAD.NOT_MEET_DATA_TYPE_SPECIFICATION');
  });

  it('should create getThread object correctly', () => {
    const payload = {
      id: 'thread-123',
      title: 'dicoding',
      body: 'Dicoding Indonesia',
      date: '2021-01-01',
      username: 'dicoding',
    };

    const { id, username, title, body, date } = new GetThread(payload);

    expect(id).toEqual(payload.id);
    expect(username).toEqual(payload.username);
    expect(title).toEqual(payload.title);
    expect(body).toEqual(payload.body);
    expect(date).toEqual(payload.date);
  });
});
