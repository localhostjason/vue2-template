export default function getPageTitle(key, title) {
  if (key) {
    return `${key} - ${title}`
  }
  return `${title}`
}
