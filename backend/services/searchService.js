const asyncHandler = require("express-async-handler");
const ServiceModel = require("../models/Service/ourServicesModel");
const ProjectModel = require("../models/projectModel");
const BlogModel = require("../models/blogModel");
const CustomPageModel = require("../models/customPageModel");
const BoardMemberModel = require("../models/boardMemberModel");
const CareerModel = require("../models/careerPageModel");

const SEARCH_TYPES = [
  {
    key: "services",
    aliases: ["service"],
    label: "Services",
    model: ServiceModel,
    titleField: "title",
    url: (item) => `/Services/${item.slug}`,
    imageField: "bannerImage",
    imageFolder: "ourServices",
    priority: 1,
    sort: { order: 1, createdAt: -1 },
  },
  {
    key: "projects",
    aliases: ["project"],
    label: "Projects",
    model: ProjectModel,
    titleField: "title",
    url: (item) => `/projects/${item.slug}`,
    imageField: "image",
    imageFolder: "projects",
    priority: 2,
    sort: { order: 1, createdAt: -1 },
  },
  {
    key: "blogs",
    aliases: ["blog"],
    label: "Blogs",
    model: BlogModel,
    titleField: "title",
    url: (item) => `/blogs/${item.slug}`,
    imageField: "thumbnailImage",
    fallbackImageField: "image",
    imageFolder: "blogs",
    baseQuery: { published: true },
    priority: 3,
    sort: { createdAt: -1 },
  },
  {
    key: "pages",
    aliases: ["page"],
    label: "Pages",
    model: CustomPageModel,
    titleField: "title",
    url: (item) => `/pages/${item.slug}`,
    priority: 4,
    sort: { order: 1, createdAt: -1 },
  },
  {
    key: "team",
    aliases: ["member", "members"],
    label: "Team",
    model: BoardMemberModel,
    titleField: "name",
    url: () => "/about#team",
    imageField: "image",
    imageFolder: "boardMember",
    priority: 5,
    sort: { order: 1, createdAt: -1 },
  },
  {
    key: "careers",
    aliases: ["career", "job", "jobs"],
    label: "Careers",
    model: CareerModel,
    titleField: "title",
    url: (item) => `/career#career-${item._id}`,
    imageField: "image",
    imageFolder: "careers",
    priority: 6,
    sort: { endDate: 1, createdAt: -1 },
    baseQuery: () => {
      const today = new Date();
      today.setHours(0, 0, 0, 0);
      return { $or: [{ endDate: null }, { endDate: { $gte: today } }] };
    },
  },
];

const escapeRegex = (value = "") =>
  value.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");

const tokenizeKeyword = (value = "") =>
  `${value}`
    .trim()
    .split(/\s+/)
    .map((item) => item.trim())
    .filter((item) => item.length >= 2);

const buildTitleQuery = (field, keyword) => ({
  $or: [
    { [`${field}.en`]: { $regex: keyword, $options: "i" } },
    { [`${field}.ar`]: { $regex: keyword, $options: "i" } },
  ],
});

const buildLooseTitleQuery = (field, tokens = []) => ({
  $or: tokens.flatMap((token) => [
    { [`${field}.en`]: { $regex: escapeRegex(token), $options: "i" } },
    { [`${field}.ar`]: { $regex: escapeRegex(token), $options: "i" } },
  ]),
});

const resolveBaseQuery = (config) =>
  typeof config.baseQuery === "function"
    ? config.baseQuery()
    : config.baseQuery || {};

const selectedTypes = (type = "") => {
  const requested = `${type}`.trim().toLowerCase();
  if (!requested || requested === "all") return SEARCH_TYPES;

  return SEARCH_TYPES.filter(
    (config) =>
      config.key === requested || (config.aliases || []).includes(requested),
  );
};

const normalizeType = (type = "") => {
  const requested = `${type}`.trim().toLowerCase();
  if (!requested || requested === "all") return "all";

  const match = SEARCH_TYPES.find(
    (config) =>
      config.key === requested || (config.aliases || []).includes(requested),
  );

  return match?.key || "all";
};

const localizedValues = (value = {}) => {
  if (typeof value === "string") return [value];
  return [value?.en, value?.ar].filter(Boolean);
};

const relevanceScore = (title, keyword) => {
  const needle = keyword.toLowerCase();

  return localizedValues(title).reduce((best, value) => {
    const haystack = `${value}`.toLowerCase();
    const index = haystack.indexOf(needle);
    if (index < 0) return best;
    if (haystack === needle) return Math.max(best, 120);
    if (haystack.startsWith(needle)) return Math.max(best, 100);
    return Math.max(best, 80 - Math.min(index, 50));
  }, 0);
};

const compareByDate = (direction) => (a, b) => {
  const aDate = new Date(a.createdAt || 0).getTime();
  const bDate = new Date(b.createdAt || 0).getTime();
  return direction === "oldest" ? aDate - bDate : bDate - aDate;
};

const toSearchItem = (config, item, keyword) => {
  const image =
    item[config.imageField] || item[config.fallbackImageField] || "";

  return {
    id: item._id,
    type: config.key,
    typeLabel: config.label,
    title: item[config.titleField],
    url: config.url(item),
    image,
    imageFolder: image ? config.imageFolder : "",
    createdAt: item.createdAt,
    relevance: relevanceScore(item[config.titleField], keyword),
    priority: config.priority,
    suggested: false,
  };
};

exports.searchWebsite = asyncHandler(async (req, res) => {
  const keyword = `${req.query.q || ""}`.trim();
  const previewLimit = Math.min(Number(req.query.limit) || 4, 12);
  const includeAll = req.query.all === "true";
  const type = normalizeType(req.query.type || "all");
  const sort = ["newest", "oldest"].includes(req.query.sort)
    ? req.query.sort
    : "relevant";
  const page = Math.max(Number(req.query.page) || 1, 1);
  const limit = Math.min(Math.max(Number(req.query.pageLimit) || 10, 1), 50);

  if (!keyword) {
    return res.status(200).json({
      status: true,
      query: "",
      data: [],
      groups: {},
      total: 0,
      pagination: {
        totalItems: 0,
        totalPages: 0,
        currentPage: 1,
        itemsPerPage: limit,
      },
      filters: { type, sort },
    });
  }

  const safeKeyword = escapeRegex(keyword);
  const tokens = tokenizeKeyword(keyword);
  const typesToSearch = selectedTypes(type);
  const groups = {};

  const resultsByType = await Promise.all(
    SEARCH_TYPES.map(async (config) => {
      const shouldInclude = typesToSearch.some(
        (item) => item.key === config.key,
      );
      const baseQuery = resolveBaseQuery(config);
      const titleQuery = buildTitleQuery(config.titleField, safeKeyword);
      const query = Object.keys(baseQuery).length
        ? { $and: [baseQuery, titleQuery] }
        : titleQuery;
      const fields = [
        config.titleField,
        "slug",
        config.imageField,
        config.fallbackImageField,
        "endDate",
        "createdAt",
      ]
        .filter(Boolean)
        .join(" ");

      const [items, total] = await Promise.all([
        shouldInclude
          ? config.model.find(query).select(fields).sort(config.sort).lean()
          : Promise.resolve([]),
        config.model.countDocuments(query),
      ]);

      const mappedItems = items.map((item) =>
        toSearchItem(config, item, keyword),
      );
      groups[config.key] = {
        label: config.label,
        total,
        items: includeAll ? mappedItems : mappedItems.slice(0, previewLimit),
      };

      return shouldInclude ? mappedItems : [];
    }),
  );

  let allItems = resultsByType.flat();

  if (sort === "newest" || sort === "oldest") {
    allItems = allItems.sort(compareByDate(sort));
  } else {
    allItems = allItems.sort(
      (a, b) =>
        a.priority - b.priority ||
        b.relevance - a.relevance ||
        compareByDate("newest")(a, b),
    );
  }

  const total = allItems.length;
  const previewData = allItems.slice(0, previewLimit);
  const totalPages = Math.ceil(total / limit);
  const currentPage = totalPages ? Math.min(page, totalPages) : 1;
  const pagedData = allItems.slice(
    (currentPage - 1) * limit,
    currentPage * limit,
  );

  let suggestions = [];

  if (total === 0) {
    const suggestionGroups = await Promise.all(
      typesToSearch.map(async (config) => {
        const baseQuery = resolveBaseQuery(config);
        const looseQuery = tokens.length
          ? buildLooseTitleQuery(config.titleField, tokens)
          : null;
        const query = looseQuery
          ? Object.keys(baseQuery).length
            ? { $and: [baseQuery, looseQuery] }
            : looseQuery
          : baseQuery;
        const fields = [
          config.titleField,
          "slug",
          config.imageField,
          config.fallbackImageField,
          "endDate",
          "createdAt",
        ]
          .filter(Boolean)
          .join(" ");

        const items = await config.model
          .find(query)
          .select(fields)
          .sort(config.sort)
          .limit(4)
          .lean();

        return items.map((item) => ({
          ...toSearchItem(config, item, keyword),
          suggested: true,
        }));
      }),
    );

    suggestions = suggestionGroups
      .flat()
      .sort(
        (a, b) =>
          a.priority - b.priority ||
          b.relevance - a.relevance ||
          compareByDate("newest")(a, b),
      )
      .slice(0, 6);
  }

  res.status(200).json({
    status: true,
    query: keyword,
    data: includeAll ? pagedData : previewData,
    groups,
    total,
    pagination: {
      totalItems: total,
      totalPages,
      currentPage,
      itemsPerPage: limit,
      hasNextPage: currentPage < totalPages,
      hasPreviousPage: currentPage > 1,
    },
    filters: { type, sort },
    suggestions,
  });
});
