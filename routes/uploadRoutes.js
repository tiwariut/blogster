const AWS = require('aws-sdk');
const uuid = require('uuid/v1');
const requireLogin = require('../middlewares/requireLogin')
const keys = require('../config/keys');

const s3 = new AWS.S3({
  credentials: {
    accessKeyId: keys.accessKeyId,
    secretAccessKey: keys.secretAccessKey,
  },
  region: keys.region
});

module.exports = app => {
  app.get('/api/upload',requireLogin, (req, res) => {
    const key = `${req.user.id}/${uuid()}.jpeg`;

    s3.getSignedUrl('putObject', {
      Bucket: keys.bucket,
      ContentType: 'image/jpeg',
      Key: key
    }, (err, url) => res.send({ key, url }));
  });
}

