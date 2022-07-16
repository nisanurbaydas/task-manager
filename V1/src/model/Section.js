const Mongoose = require('mongoose');

const SectionSchema = new Mongoose.Schema(
  {
    name: String,
    user_id: {
      type: Mongoose.Types.ObjectId,
      ref: 'User',
    },
    project_id: {
      type: Mongoose.Types.ObjectId,
      ref: 'Project',
    },
    order: Number,
  },
  { timestamps: true, versionKey: false }
);

module.exports = Mongoose.model('Section', SectionSchema);
