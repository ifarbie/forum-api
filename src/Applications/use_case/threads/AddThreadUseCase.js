/* eslint-disable no-return-await */
const NewThread = require('../../../Domains/threads/entities/NewThread');

class AddThreadUseCase {
  constructor({ threadRepository }) {
    this._threadRepository = threadRepository;
  }

  async execute(useCasePayload, useCaseCredential) {
    const newThread = new NewThread(useCasePayload);

    return await this._threadRepository.addThread(newThread, useCaseCredential);
  }
}

module.exports = AddThreadUseCase;
