const mongoose = require('mongoose');
const { Schema } = mongoose;

const CampaignSchema = new Schema({
  companyId: { type: Schema.Types.ObjectId, ref: 'Company', required: true },
  title: { type: String },
  source: { type: String }, // website, meta, youtube, local-storage
  startDate: { type: Date },
  endDate: { type: Date },
  productCategories: [String],
  offerTypes: [String],
  metadata: { type: Schema.Types.Mixed, default: {} },
  createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Campaign', CampaignSchema);
