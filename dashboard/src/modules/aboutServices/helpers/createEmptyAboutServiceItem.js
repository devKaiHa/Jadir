export const createEmptyAboutServiceItem = () => ({
  _id: `${Date.now()}-${Math.random().toString(36).slice(2, 9)}`,
  title: { en: "", ar: "", tr: "" },
  description: { en: "", ar: "", tr: "" },
  contentTitle: { en: "", ar: "", tr: "" },
  contentText: { en: [""], ar: [""], tr: [""] },
  highlight: { en: "", ar: "", tr: "" },
  order: 0,
});
