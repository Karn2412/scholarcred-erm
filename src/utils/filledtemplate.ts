
  export function fillTemplate(html: string, data: Record<string, string | number>) {
  let filled = html;
  Object.entries(data).forEach(([key, value]) => {
    const regex = new RegExp(`{{${key}}}`, "g");
    filled = filled.replace(regex, String(value));
  });
  return filled;
}