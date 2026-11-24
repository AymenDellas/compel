export function isPrivateSitePath(path: string) {
  return ['/proposals', '/watch', '/outreach'].some(prefix => path === prefix || path.startsWith(`${prefix}/`));
}
