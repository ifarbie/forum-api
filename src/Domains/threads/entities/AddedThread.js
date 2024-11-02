class AddedThread {
    constructor({ id, user_id, title, body }) {
        if (!id || !user_id || !title || !body) {
            throw new Error('ADDED_THREAD.NOT_CONTAIN_NEEDED_PROPERTY');
        }

        if (typeof id !== 'string' ||typeof user_id !== 'string' || typeof title !== 'string' || typeof body !== 'string') {
            throw new Error('ADDED_THREAD.NOT_MEET_DATA_TYPE_SPECIFICATION');
        }

        this.id = id;
        this.user_id = user_id;
        this.title = title;
        this.body = body;
    }
}

module.exports = AddedThread;