var compression = require('compression');

module.exports = compression({
  threshold: 512
});