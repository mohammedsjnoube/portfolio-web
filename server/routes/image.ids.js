const { randomImages } = require('./../modules')

module.exports = (req, res) =>
  res.json({ imageIds: randomImages.getIds() })
