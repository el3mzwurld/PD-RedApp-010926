export function getDate() {
  const d = new Date(Date.now());
  const month = d.toLocaleString("en-US", { month: "long" });
  const day = d.getDate();
  const year = d.getFullYear();

  return `${month} ${day}, ${year}`;
}
