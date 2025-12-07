const mongoose = require('mongoose');
const { Schema } = mongoose;

const AlertSchema = new Schema({
  type: { type: String }, // NEW_CAMPAIGN, SPIKE, etc.
  severity: { type: String, default: 'info' },
  payload: { type: Schema.Types.Mixed },
  read: { type: Boolean, default: false },
  createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Alert', AlertSchema);
