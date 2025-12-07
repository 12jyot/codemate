const mongoose = require('mongoose');
const { Schema } = mongoose;

const NewsSchema = new Schema({
  title: { type: String },
  url: { type: String },
  source: { type: String },
  excerpt: { type: String },
  publishedAt: { type: Date },
  competitors: [{ type: Schema.Types.ObjectId, ref: 'Company' }],
  tags: [String],
  metadata: { type: Schema.Types.Mixed, default: {} },
  createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model('News', NewsSchema);
