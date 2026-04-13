export function pickLocalized(value, lang = "en") {
  if (!value || typeof value !== "object") return "";
  return value[lang] ?? value.en ?? value.ar ?? value.tr ?? "";
}

function normalizeLocalizedArray(values = []) {
  return Array.isArray(values) ? values.filter(Boolean) : [];
}

function normalizeSocialLinks(socialLinks = {}) {
  if (!socialLinks || typeof socialLinks !== "object") {
    return {
      xTwitter: "",
      instagram: "",
      facebook: "",
      linkedin: "",
    };
  }

  return {
    xTwitter: socialLinks.xTwitter ?? "",
    instagram: socialLinks.instagram ?? "",
    facebook: socialLinks.facebook ?? "",
    linkedin: socialLinks.linkedin ?? "",
  };
}

export function normalizeCompany(company = {}) {
  const introductionItems = Array.isArray(company.services)
    ? company.services
    : [];
  const goals = Array.isArray(company.values) ? company.values : [];
  const normalizedGoals = normalizeLocalizedArray(company.goals);
  const normalizedAddresses = normalizeLocalizedArray(company.addresses);
  const normalizedServices = normalizeLocalizedArray(company.services);
  const normalizedValues = normalizeLocalizedArray(company.values);
  const normalizedStatistics = Array.isArray(company.statistics)
    ? company.statistics.filter(Boolean)
    : [];
  const normalizedFundsAssociated = Array.isArray(company.fundsAssociated)
    ? company.fundsAssociated.filter(Boolean)
    : [];

  return {
    ...company,
    logo: company.logo,
    background: company.background,
    companyName: company.companyName ?? company.name ?? {},
    Experience: company.Experience ?? company.experienceYears ?? "",
    ExperienceField: company.ExperienceField ?? company.experienceField ?? {},
    aboutus: company.aboutus ?? company.name ?? {},
    about: company.about ?? {},
    content: company.content ?? {},
    country: company.country ?? "",
    social_links: normalizeSocialLinks(company.social_links),
    addresses: normalizedAddresses,
    phone: company.phone ?? "",
    email: company.email ?? "",
    website: company.website ?? "",
    services: normalizedServices,
    values: normalizedValues,
    statistics: normalizedStatistics,
    fundsAssociated: normalizedFundsAssociated,
    introduction: company.introduction ?? {
      title: company.content ?? company.about ?? {},
      array: introductionItems,
    },
    mission: company.mission ?? {},
    vision: company.vision ?? {},
    goals:
      normalizedGoals.length > 0
        ? normalizedGoals
        : goals.map(
            (value) => value?.description || value?.content || value?.name,
          ),
  };
}

export function normalizeFund(fund = {}) {
  const targetingSectors = normalizeLocalizedArray(fund.targetingSectors);
  const companiesAssociated = Array.isArray(fund.companiesAssociated)
    ? fund.companiesAssociated.filter(Boolean)
    : [];

  return {
    ...fund,
    image: fund.image,
    subtitle: fund.subtitle ?? fund.shortAbout ?? {},
    sectors: fund.sectors ?? fund.targetingSectors ?? [],
    investmentVolume:
      fund.investmentVolume ?? fund.assetsVolume ?? fund.minInvestAmount ?? 0,
    description: fund.description ?? fund.content ?? {},
    fundLink: fund.fundLink ?? "",
    launchDate: fund.launchDate ?? "",
    fundDuration: fund.fundDuration ?? 0,
    assetsVolume: fund.assetsVolume ?? 0,
    sharePrice: fund.sharePrice ?? 0,
    minInvestAmount: fund.minInvestAmount ?? 0,
    irr: fund.irr ?? 0,
    targetingSectors,
    companiesAssociated,
    benefitsTitle: fund.benefitsTitle ?? {
      en: "Associated Companies",
      ar: "الشركات المرتبطة",
      tr: "Ilgili Sirketler",
    },
    benefits: Array.isArray(fund.benefits)
      ? fund.benefits
      : companiesAssociated.length > 0
        ? companiesAssociated
        : [],
  };
}

export function normalizeBoardMember(member = {}) {
  return {
    ...member,
    isFounder:
      typeof member.isFounder === "boolean"
        ? member.isFounder
        : member.isFounder === "true",
  };
}

export function normalizeStatistic(statistic = {}) {
  return {
    ...statistic,
    value: statistic?.value ?? "",
    suffix: statistic?.suffix ?? {},
    description: statistic?.description ?? {},
    title: statistic?.title ?? {},
  };
}

export function normalizeBlog(blog = {}) {
  const image = blog.image ?? blog.thumbnailImage;
  const thumbnailImage = blog.thumbnailImage ?? blog.photo ?? blog.image;

  return {
    ...blog,
    photo: image,
    image,
    thumbnailImage: thumbnailImage ? [thumbnailImage] : [],
  };
}
