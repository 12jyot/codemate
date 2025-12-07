const mongoose = require('mongoose');
const { Schema } = mongoose;

const CreativeSchema = new Schema({
  campaignId: { type: Schema.Types.ObjectId, ref: 'Campaign' },
  companyId: { type: Schema.Types.ObjectId, ref: 'Company' },
  url: { type: String }, // stored location (file:// or S3)
  filename: { type: String },
  type: { type: String }, // image | video | html
  textExtract: { type: String },
  metadata: { type: Schema.Types.Mixed, default: {} },
  createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Creative', CreativeSchema);
