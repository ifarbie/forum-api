/* eslint-disable function-paren-newline */
/* eslint-disable implicit-arrow-linebreak */
const CommentRepository = require('../../../../Domains/comments/CommentRepository');
const GetComment = require('../../../../Domains/comments/entities/GetComment');
const GetThread = require('../../../../Domains/threads/entities/GetThread');
const ThreadRepository = require('../../../../Domains/threads/ThreadRepository');
const GetDetailThreadUseCase = require('../GetDetailThreadUseCase');

describe('GetDetailThreadUseCase', () => {
  it('should orchestrating the get detail thread action correctly', async () => {
    const threadId = 'thread-123';
    const commentId1 = 'comment-123';
    const commentId2 = 'comment-124';

    const expectedDetailThread = {
      id: threadId,
      username: 'dicoding',
      title: 'Title thread',
      body: 'Body thread',
      date: '2021-01-01',
      comments: [
        {
          id: commentId1,
          username: 'fariz',
          date: '2024-11-11T07:14:33.555Z',
          content: 'ini comment 1',
        },
        {
          id: commentId2,
          username: 'john',
          date: '2024-11-11T07:26:21.338Z',
          content: '**komentar telah dihapus**',
        },
      ],
    };

    const mockThreadRepository = new ThreadRepository();
    const mockCommentRepository = new CommentRepository();

    mockThreadRepository.verifyThreadById = jest.fn().mockImplementation(() => Promise.resolve());
    mockThreadRepository.getThreadById = jest.fn().mockImplementation(() =>
      Promise.resolve(
        new GetThread({
          id: threadId,
          title: 'Title thread',
          body: 'Body thread',
          date: '2021-01-01',
          username: 'dicoding',
        })
      )
    );
    mockCommentRepository.getAllCommentsByThreadId = jest.fn().mockImplementation(() =>
      Promise.resolve([
        new GetComment({
          id: commentId1,
          username: 'fariz',
          date: '2024-11-11T07:14:33.555Z',
          content: 'ini comment 1',
          is_delete: false,
        }),
        new GetComment({
          id: commentId2,
          username: 'john',
          date: '2024-11-11T07:26:21.338Z',
          content: '**komentar telah dihapus**',
          is_delete: true,
        }),
      ])
    );

    const getDetailThreadUseCase = new GetDetailThreadUseCase({
      threadRepository: mockThreadRepository,
      commentRepository: mockCommentRepository,
    });

    const thread = await getDetailThreadUseCase.execute(threadId);

    expect(mockThreadRepository.verifyThreadById).toBeCalledWith(threadId);
    expect(mockThreadRepository.getThreadById).toBeCalledWith(threadId);
    expect(mockCommentRepository.getAllCommentsByThreadId).toBeCalledWith(threadId);

    expect(thread.id).toEqual(expectedDetailThread.id);
    expect(thread.username).toEqual(expectedDetailThread.username);
    expect(thread.title).toEqual(expectedDetailThread.title);
    expect(thread.body).toEqual(expectedDetailThread.body);
    expect(thread.date).toBeDefined();
    expect(thread.comments).toHaveLength(2);
    expect(thread).toEqual(expectedDetailThread);
  });
});
