const AddedComment = require('../AddedComment');

describe('an AddedComment entities', () => {
  it('should throw an error when payload did not contain needed property', () => {
    // Arrange
    const payload = {
      id: 'abc',
      owner: 'abc',
    };

    // Action and Assert
    expect(() => new AddedComment(payload)).toThrowError('ADDED_COMMENT.NOT_CONTAIN_NEEDED_PROPERTY');
  });

  it('should throw an error when payload did not meet data type specification', () => {
    // Arrange
    const payload = {
      id: 'comment-123',
      owner: 123,
      content: 123,
    };

    // Action and Assert
    expect(() => new AddedComment(payload)).toThrowError('ADDED_COMMENT.NOT_MEET_DATA_TYPE_SPECIFICATION');
  });

  it('should create addedComment object correctly', () => {
    // Arrange
    const payload = {
      id: 'comment-123',
      owner: 'user-123',
      content: 'sebuah comment',
    };

    // Action
    const addedComment = new AddedComment(payload);

    // Assert
    expect(addedComment.id).toEqual(payload.id);
    expect(addedComment.owner).toEqual(payload.owner);
    expect(addedComment.content).toEqual(payload.content);
  });
});
