const Mongoose = require('Mongoose');

const ProjectSchema = new Mongoose.Schema(
  {
    name: String,
    /*user_id: {
    type: Mongoose.Types.ObjectId,
    ref: 'user',
  },*/
  },
  { timestamps: true, versionKey: false }
);

module.exports = Mongoose.model("Project", ProjectSchema);