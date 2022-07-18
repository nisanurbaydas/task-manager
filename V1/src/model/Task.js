const Mongoose = require('mongoose');

const TaskSchema = new Mongoose.Schema(
  {
    title: String,
    description: String,
    assigned_to: {
      type: Mongoose.Types.ObjectId,
      ref: 'User',
    },
    due_date: Date,
    statuses: [String],
    project_id: {
      type: Mongoose.Types.ObjectId,
      ref: 'Project',
    },
    section_id: {
      type: Mongoose.Types.ObjectId,
      ref: 'Section',
    },
    user_id: {
      type: Mongoose.Types.ObjectId,
      ref: 'User',
    },
    order: Number,
    isCompleted: Boolean,
    comments: [
      {
        comment: String,
        commented_at: Date,
        user_id: {
          type: Mongoose.Types.ObjectId,
          ref: 'User',
        },
      },
    ],
    media: [String],
    sub_tasks: [
      {
        type: Mongoose.Types.ObjectId,
        ref: 'Task',
      },
    ],
  },
  { timestamps: true, versionKey: false }
);

module.exports = Mongoose.model('Task', TaskSchema);
