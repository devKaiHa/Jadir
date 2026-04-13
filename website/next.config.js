// next.config.js
const withNextIntl = require("next-intl/plugin")("./next-intl.config.js");

module.exports = withNextIntl({
  trailingSlash: true,
  distDir: process.env.NEXT_DIST_DIR || ".next",
});
