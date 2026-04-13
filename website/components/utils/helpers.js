export const formatNumber = (value, decimalPlaces) => {
  if (value === null || value === undefined || isNaN(value)) return "";

  const decimalSeparator = ",";
  const thousandSeparator = ".";
  const decimals = "2";

  const decimalsToUse =
    typeof decimalPlaces === "number" ? decimalPlaces : Number(decimals);

  const fixed = Number(value).toFixed(decimalsToUse);
  const [intPart, decimalPart] = fixed.split(".");

  const withThousands = intPart.replace(
    /\B(?=(\d{3})+(?!\d))/g,
    thousandSeparator,
  );
  if (!decimalPart || /^0+$/.test(decimalPart)) {
    return withThousands;
  }
  return `${withThousands}${decimalSeparator}${decimalPart}`;
};

export const stripHtml = (html = "") => {
  if (typeof window !== "undefined") {
    const div = document.createElement("div");
    div.innerHTML = html;
    return div.textContent || div.innerText || "";
  }

  return html.replace(/<[^>]*>/g, "");
};

export const formatNumberSuff = (num, options = {}) => {
  const { decimals = 1 } = options;

  if (num === null || num === undefined) return "";

  const abs = Math.abs(num);

  const format = (value, suffix) =>
    value.toFixed(decimals).replace(/\.0+$/, "") + suffix;

  if (abs >= 1_000_000_000) {
    return format(num / 1_000_000_000, "B");
  }

  if (abs >= 1_000_000) {
    return format(num / 1_000_000, "M");
  }

  if (abs >= 1_000) {
    return format(num / 1_000, "K");
  }

  return num.toString();
};
