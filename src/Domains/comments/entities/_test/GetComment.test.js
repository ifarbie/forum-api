const GetComment = require('../GetComment');

describe('GetComment entities', () => {
  it('should throw an error when payload did not contain needed property', () => {
    const payload = {
      id: 'comment-123',
    };

    expect(() => new GetComment(payload)).toThrowError('GET_COMMENT.NOT_CONTAIN_NEEDED_PROPERTY');
  });

  it('should throw error if payload did not meet data type specification', () => {
    const payload = {
      id: 'comment-123',
      date: true,
      username: 123,
      content: 123,
      is_delete: true,
    };

    expect(() => new GetComment(payload)).toThrowError('GET_COMMENT.NOT_MEET_DATA_TYPE_SPECIFICATION');
  });

  it('should create getComment object correctly', () => {
    const payload = {
      id: 'comment-123',
      content: 'content',
      username: 'dicoding',
      date: '2021-02-10',
      is_delete: true,
    };
    const getComment = new GetComment(payload);
    expect(getComment.id).toStrictEqual(payload.id);
    expect(getComment.content).toStrictEqual(payload.content);
    expect(getComment.username).toStrictEqual(payload.username);
    expect(getComment.date).toStrictEqual(payload.date);
    expect(getComment.is_delete).toStrictEqual(payload.is_delete);
  });
});
