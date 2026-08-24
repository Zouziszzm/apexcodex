export function formatProjectTitle(title: string): string {
  if (!title) {
    return title;
  }

  return title.charAt(0).toUpperCase() + title.slice(1);
}
