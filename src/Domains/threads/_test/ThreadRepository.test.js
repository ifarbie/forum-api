const ThreadRepository = require('../ThreadRepository.js');

describe('ThreadRepository interface', () => {
    it('should throw an error when invoke abstract behavior', async () => {
        // Arrange
        const threadRepository = new ThreadRepository();

        // Action & Assert
        await expect(threadRepository.addThread({})).rejects.toThrowError('THREAD_REPOSITORY.METHOD_NOT_IMPLEMENTED')
        await expect(threadRepository.getThreadById(0)).rejects.toThrowError('THREAD_REPOSITORY.METHOD_NOT_IMPLEMENTED')
    })
})