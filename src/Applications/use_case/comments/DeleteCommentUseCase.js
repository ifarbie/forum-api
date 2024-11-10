/* eslint-disable max-len */
class DeleteCommentUseCase {
  constructor({ commentRepository, threadRepository, userRepository }) {
    this._commentRepository = commentRepository;
    this._threadRepository = threadRepository;
    this._userRepository = userRepository;
  }

  async execute(useCaseThreadId, useCaseCommentId, useCaseCredential) {
    await this._threadRepository.verifyThreadById(useCaseThreadId);
    await this._commentRepository.verifyCommentById(useCaseCommentId);
    await this._commentRepository.verifyCommentOwner(useCaseCommentId, useCaseCredential.id);

    return this._commentRepository.deleteCommentById(useCaseCommentId, useCaseThreadId, useCaseCredential.id);
  }
}

module.exports = DeleteCommentUseCase;
