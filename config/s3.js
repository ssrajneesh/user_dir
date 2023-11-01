
const AWS = require('aws-sdk');
require("aws-sdk/lib/maintenance_mode_message").suppress = true;

AWS.config.update(
  {
    accessKeyId: 'AKIAQEIYP3YMHJHF7ZNY',
    secretAccessKey: "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", // "rajneeshcrud",
    region: 'ap-south-1',
  }
);

module.exports = new AWS.S3();