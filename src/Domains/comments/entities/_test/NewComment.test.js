const NewComment = require('../NewComment');

describe('a NewComment entities', () => {
  it('should throw error if payload did not contain needed property', () => {
    // Arrange
    const payload = {
      contents: 'abc',
    };

    // Action and Assert
    expect(() => new NewComment(payload)).toThrowError('ADD_COMMENT.NOT_CONTAIN_NEEDED_PROPERTY');
  });

  it('should throw error if payload did not meet data type specification', () => {
    // Arrange
    const payload = {
      content: true,
    };

    // Action and Assert
    expect(() => new NewComment(payload)).toThrowError('ADD_COMMENT.NOT_MEET_DATA_TYPE_SPECIFICATION');
  });

  it('should create newComment object correctly', () => {
    // Arrange
    const payload = {
      content: 'ini adalah comment',
    };

    // Action
    const { content } = new NewComment(payload);

    // Assert
    expect(content).toEqual(payload.content);
  });
});
