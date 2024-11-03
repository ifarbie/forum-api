const AddedThread = require('../AddedThread');

describe('an AddedThread entities', () => {
  it('should throw an error when payload did not contain needed property', () => {
    // Arrange
    const payload = {
      title: 'abc',
      body: 'abc',
    };

    // Action and Assert
    expect(() => new AddedThread(payload)).toThrowError('ADDED_THREAD.NOT_CONTAIN_NEEDED_PROPERTY');
  });

  it('should throw an error when payload did not meet data type specification', () => {
    // Arrange
    const payload = {
      id: 'thread-123',
      owner: 123,
      title: 123,
    };

    // Action and Assert
    expect(() => new AddedThread(payload)).toThrowError('ADDED_THREAD.NOT_MEET_DATA_TYPE_SPECIFICATION');
  });

  it('should throw an error when title length is over 100', () => {
    // Arrange
    const payload = {
      id: 'thread-123',
      owner: 'user-123',
      title: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Velit blanditiis quidem dolorem odit non necessitatibus exercitationem, molestiae corrupti aliquid doloremque dignissimos quasi cum deserunt consectetur? Illo unde esse eum quasi? Aliquid nesciunt corporis voluptatem iste sequi ab et labore asperiores similique a qui vel atque amet totam, voluptatibus quas recusandae eius dignissimos ea enim earum! Nemo dolores dolorum ratione laudantium ab nostrum velit eveniet praesentium architecto nesciunt. At nihil, rem officia sed nulla qui ea animi. Nam quasi vero facere nemo distinctio, eveniet eius dolores commodi necessitatibus unde soluta corporis? Nisi, perferendis distinctio similique modi minima explicabo debitis a voluptas tenetur, minus porro? Quasi unde corporis dolore tempora voluptatum quia temporibus et iusto, maiores, ipsum reiciendis beatae voluptate quas cumque.',
    };

    // Action and Assert
    expect(() => new AddedThread(payload)).toThrowError('ADDED_THREAD.TITLE_LIMIT_CHAR');
  });

  it('should create addedThread object correctly', () => {
    // Arrange
    const payload = {
      id: 'thread-123',
      owner: 'user-123',
      title: 'dicoding',
    };

    // Action
    const addedThread = new AddedThread(payload);

    // Assert
    expect(addedThread.id).toEqual(payload.id);
    expect(addedThread.owner).toEqual(payload.owner);
    expect(addedThread.title).toEqual(payload.title);
  });
});
