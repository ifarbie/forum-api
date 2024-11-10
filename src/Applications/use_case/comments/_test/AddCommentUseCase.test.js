/* eslint-disable max-len */
const CommentRepository = require('../../../../Domains/comments/CommentRepository');
const ThreadRepository = require('../../../../Domains/threads/ThreadRepository');
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
      id: 'user-123',
    };
    const mockAddedComment = new AddedComment({
      id: 'comment-123',
      content: useCasePayload.content,
      owner: 'user-123',
    });

    // Creating dependency of use case
    const mockCommentRepository = new CommentRepository();
    const mockThreadRepository = new ThreadRepository();

    mockCommentRepository.addComment = jest.fn().mockImplementation(() => Promise.resolve(mockAddedComment));
    mockThreadRepository.verifyThreadById = jest.fn().mockImplementation(() => Promise.resolve());

    // Creating use case instance
    const addCommentUseCase = new AddCommentUseCase({
      threadRepository: mockThreadRepository,
      commentRepository: mockCommentRepository,
    });

    // Action
    const addedComment = await addCommentUseCase.execute(useCasePayload, useCaseThreadId.id, useCaseCredential.id);

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
