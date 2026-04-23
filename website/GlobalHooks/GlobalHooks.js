export const formatDate = (date) =>
  new Date(date || Date.now()).toLocaleDateString("en-US", {
    year: "numeric",
    month: "short",
    day: "numeric",
  });

export const truncateText = (text = "", maxLength = 150) => {
  if (!text) return "";
  return text.length > maxLength ? text.slice(0, maxLength) + "..." : text;
};

export async function fetchJSON(url, init = {}) {
  const controller = new AbortController();
  const timeout = setTimeout(() => controller.abort(), init.timeoutMs || 8000);

  const res = await fetch(url, {
    ...init,
    signal: init.signal || controller.signal,
  }).finally(() => clearTimeout(timeout));

  if (!res.ok) {
    const text = await res.text().catch(() => "");
    const err = new Error(
      `Fetch failed ${res.status} ${res.statusText} for ${url}`,
    );
    err.status = res.status;
    err.body = text;
    throw err;
  }
  return res.json();
}

// unwrap { data: [...] } or return []/{} safely
export function pickArray(x) {
  if (Array.isArray(x)) return x;
  if (x && Array.isArray(x.data)) return x.data;
  return [];
}
export function pickObject(x) {
  if (x && typeof x === "object") return x.data ?? x;
  return {};
}
