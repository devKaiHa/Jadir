const slugify = require("slugify");

const buildSlug = (name = {}) => {
  const base = name?.en || name?.ar || "";
  return slugify(base, { lower: true, strict: true, trim: true });
};
module.exports = buildSlug;
