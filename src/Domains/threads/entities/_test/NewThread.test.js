const NewThread = require('../NewThread');

describe('a NewThread entities', () => {
  it('should throw an error when payload did not contain needed property', () => {
    // Arrange
    const payload = {
      title: 'abc',
    };

    // Action and Assert
    expect(() => new NewThread(payload)).toThrowError('ADD_THREAD.NOT_CONTAIN_NEEDED_PROPERTY');
  });

  it('should throw error when payload did not meet data type specification', () => {
    // Arrange
    const payload = {
      title: 123,
      body: true,
    };

    // Action and Assert
    expect(() => new NewThread(payload)).toThrowError('ADD_THREAD.NOT_MEET_DATA_TYPE_SPECIFICATION');
  });

  it('should throw an error when title contains more than 100 character', () => {
    // Arrange
    const payload = {
      title: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Nisi maiores tempora ad totam sapiente dolor fuga, earum non, hic expedita cum? Temporibus fugiat dolor expedita, necessitatibus deleniti autem molestiae sit, officiis et dicta esse error laudantium molestias nesciunt inventore, impedit quae debitis nisi optio amet eius facilis iure. Atque ab minus quaerat, labore ut modi reiciendis veritatis quisquam deleniti accusantium, obcaecati nesciunt sint hic, saepe culpa eligendi quam suscipit dignissimos rem? Incidunt veniam repellat similique est velit odio quia, deleniti harum asperiores laborum itaque inventore, architecto delectus nihil laboriosam ducimus hic voluptates aliquam corporis quos omnis? Ipsa libero quidem impedit voluptatum nobis. Illo, distinctio animi.',
      body: 'Dicoding Indonesia',
    };

    // Action and Assert
    expect(() => new NewThread(payload)).toThrowError('ADD_THREAD.TITLE_LIMIT_CHAR');
  });

  it('should create addUser object correctly', () => {
    // Arrange
    const payload = {
      title: 'dicoding',
      body: 'Dicoding Indonesia',
    };

    // Action
    const { title, body } = new NewThread(payload);

    // Assert
    expect(title).toEqual(payload.title);
    expect(body).toEqual(payload.body);
  });
});
