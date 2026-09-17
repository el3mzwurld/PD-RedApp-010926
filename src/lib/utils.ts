export function getDate(): string {
  const d = new Date(Date.now());
  const month = d.toLocaleString("en-US", { month: "long" });
  const day = d.getDate();
  const year = d.getFullYear();

  return `${month} ${day}, ${year}`;
}

export function generateBusinessCode(businessName: string): string {
  const cleanName = businessName.replace(/[^a-zA-Z]/g, "").toUpperCase();
  const prefix = cleanName.padEnd(3, "X").slice(0, 3);

  const uuid = crypto.randomUUID();
  const shortcode = uuid.substring(0, 6).toUpperCase();

  const businessNumber = prefix + "-" + shortcode;

  return businessNumber;
}
