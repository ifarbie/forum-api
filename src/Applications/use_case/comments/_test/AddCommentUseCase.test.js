/* eslint-disable max-len */
const CommentRepository = require('../../../../Domains/comments/CommentRepository');
const ThreadRepository = require('../../../../Domains/threads/ThreadRepository');
const UserRepository = require('../../../../Domains/users/UserRepository');
const AddedComment = require('../../../../Domains/comments/entities/AddedComment');
const AddCommentUseCase = require('../AddCommentUseCase');

describe('AddCommentUseCase', () => {
  it('should orchestrating the add comment action correctly', async () => {
    //  Arrange
    const useCasePayload = {
      content: 'ini adalah comment',
    };
    const useCaseThreadId = {
      id: 'thread-123',
    };
    const useCaseCredential = {
      username: 'dicoding',
    };
    const mockAddedComment = new AddedComment({
      id: 'comment-123',
      content: useCasePayload.content,
      owner: 'user-123',
    });

    // Creating dependency of use case
    const mockCommentRepository = new CommentRepository();
    const mockThreadRepository = new ThreadRepository();
    const mockUserRepository = new UserRepository();

    mockCommentRepository.addComment = jest.fn().mockImplementation(() => Promise.resolve(mockAddedComment));
    mockThreadRepository.getThreadById = jest.fn().mockImplementation(() => Promise.resolve(useCaseThreadId));
    mockUserRepository.getIdByUsername = jest.fn().mockImplementation(() => Promise.resolve(useCaseCredential));

    // Creating use case instance
    const addCommentUseCase = new AddCommentUseCase({
      userRepository: mockUserRepository,
      threadRepository: mockThreadRepository,
      commentRepository: mockCommentRepository,
    });

    // Action
    const addedComment = await addCommentUseCase.execute(useCasePayload, useCaseThreadId, useCaseCredential);

    // Assert
    expect(addedComment).toStrictEqual(
      new AddedComment({
        id: 'comment-123',
        content: useCasePayload.content,
        owner: 'user-123',
      }),
    );
  });
});
