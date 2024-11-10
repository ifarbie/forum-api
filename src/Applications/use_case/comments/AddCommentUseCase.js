const NewComment = require('../../../Domains/comments/entities/NewComment');

class AddCommentUseCase {
  constructor({ commentRepository, threadRepository }) {
    this._commentRepository = commentRepository;
    this._threadRepository = threadRepository;
  }

  async execute(useCasePayload, useCaseThreadId, useCaseCredential) {
    const newComment = new NewComment(useCasePayload);
    await this._threadRepository.verifyThreadById(useCaseThreadId);

    // eslint-disable-next-line max-len
    return this._commentRepository.addComment(newComment, useCaseThreadId, useCaseCredential.id);
  }
}

module.exports = AddCommentUseCase;
