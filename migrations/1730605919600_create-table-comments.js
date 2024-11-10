/* eslint-disable camelcase */

exports.up = (pgm) => {
  pgm.createTable('comments', {
    id: {
      type: 'VARCHAR(50)',
      primaryKey: true,
    },
    user_id: {
      type: 'VARCHAR(50)',
      notNull: true,
      references: 'users',
      onDelete: 'CASCADE',
      onUpdate: 'CASCADE',
    },
    thread_id: {
      type: 'VARCHAR(50)',
      notNull: true,
      references: 'threads',
      onDelete: 'CASCADE',
      onUpdate: 'CASCADE',
    },
    content: {
      type: 'TEXT',
      notNull: true,
    },
    created_at: {
      type: 'TIMESTAMP WITH TIME ZONE',
      notNull: true,
      default: pgm.func('current_timestamp'),
    },
    is_delete: {
      type: 'BOOLEAN',
      notNull: true,
      default: false,
    },
  });
};

exports.down = (pgm) => {
  pgm.dropTable('comments');
};
