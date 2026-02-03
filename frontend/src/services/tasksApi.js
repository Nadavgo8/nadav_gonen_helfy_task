const BASE = "http://localhost:4000/api/tasks";

async function request(url, options) {
  const res = await fetch(url, options);
  const isJson = (res.headers.get("content-type") || "").includes("application/json");
  const data = isJson ? await res.json() : null;

  if (!res.ok) {
    throw new Error(data?.message || `Request failed (${res.status})`);
  }
  return data;
}

export const tasksApi = {
  getAll() {
    return request(BASE);
  },
  create(payload) {
    return request(BASE, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
    });
  },
  update(id, patch) {
    return request(`${BASE}/${id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(patch),
    });
  },
  remove(id) {
    return request(`${BASE}/${id}`, { method: "DELETE" });
  },
  toggle(id) {
    return request(`${BASE}/${id}/toggle`, { method: "PATCH" });
  },
};
