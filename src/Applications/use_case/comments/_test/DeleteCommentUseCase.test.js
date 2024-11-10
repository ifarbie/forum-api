/* eslint-disable max-len */
const CommentRepository = require('../../../../Domains/comments/CommentRepository');
const ThreadRepository = require('../../../../Domains/threads/ThreadRepository');
const DeleteCommentUseCase = require('../DeleteCommentUseCase');

describe('DeleteCommentUseCase', () => {
  it('should orchestrating the soft delete comment action correctly', async () => {
    //  Arrange
    const useCaseThreadId = {
      id: 'thread-123',
    };
    const useCaseCommentId = {
      id: 'comment-123',
    };
    const useCaseCredential = {
      id: 'user-123',
    };

    // Creating dependency of use case
    const mockCommentRepository = new CommentRepository();
    const mockThreadRepository = new ThreadRepository();

    mockThreadRepository.verifyThreadById = jest.fn().mockImplementation(() => Promise.resolve());
    mockCommentRepository.verifyCommentById = jest.fn().mockImplementation(() => Promise.resolve());
    mockCommentRepository.verifyCommentOwner = jest.fn().mockImplementation(() => Promise.resolve());
    mockCommentRepository.deleteCommentById = jest.fn().mockImplementation(() => Promise.resolve({ status: 'success' }));

    // Creating use case instance
    const deleteCommentUseCase = new DeleteCommentUseCase({
      threadRepository: mockThreadRepository,
      commentRepository: mockCommentRepository,
    });

    // Action
    const response = await deleteCommentUseCase.execute(useCaseThreadId.id, useCaseCommentId.id, useCaseCredential.id);

    // Assert
    expect(response).toStrictEqual({
      status: 'success',
    });
  });
});
