/* eslint-disable function-paren-newline */
/* eslint-disable implicit-arrow-linebreak */
const AddedThread = require('../../../../Domains/threads/entities/AddedThread');
const ThreadRepository = require('../../../../Domains/threads/ThreadRepository');
const AddThreadUseCase = require('../AddThreadUseCase');

describe('AddThreadUseCase', () => {
  it('should orchestrating the add thread action correctly', async () => {
    // Arrange
    const useCasePayload = {
      title: 'dicoding',
      body: 'Dicoding Indonesia',
    };
    const useCaseCredential = {
      id: 'user-001',
    };
    const mockAddedThread = new AddedThread({
      id: 'thread-123',
      owner: useCaseCredential.id,
      title: useCasePayload.title,
    });

    /** creating dependency of use case*/
    const mockThreadRepository = new ThreadRepository();

    /** mocking needed function */
    mockThreadRepository.addThread = jest.fn().mockImplementation(() =>
      Promise.resolve(
        new AddedThread({
          id: 'thread-123',
          owner: useCaseCredential.id,
          title: useCasePayload.title,
        })
      )
    );

    /** creating use case instance */
    const addThreadUseCase = new AddThreadUseCase({
      threadRepository: mockThreadRepository,
    });

    // Action
    const addedThread = await addThreadUseCase.execute(useCasePayload, useCaseCredential);

    // Assert
    expect(addedThread).toStrictEqual(mockAddedThread);
    expect(mockThreadRepository.addThread).toBeCalledWith(useCasePayload, useCaseCredential);
  });
});
