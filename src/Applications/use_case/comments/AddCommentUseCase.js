/* eslint-disable no-return-await */
const NewComment = require('../../../Domains/comments/entities/NewComment');

class AddCommentUseCase {
  constructor({ commentRepository, threadRepository, userRepository }) {
    this._commentRepository = commentRepository;
    this._threadRepository = threadRepository;
    this._userRepository = userRepository;
  }

  async execute(useCasePayload, useCaseThreadId, useCaseCredential) {
    const newComment = new NewComment(useCasePayload);
    const thread = await this._threadRepository.getThreadById(useCaseThreadId);
    const user = await this._userRepository.getIdByUsername(useCaseCredential.username);

    return await this._commentRepository.addComment(newComment.content, thread.id, user.id);
  }
}

module.exports = AddCommentUseCase;
