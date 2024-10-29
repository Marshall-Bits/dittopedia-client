export const formatUrl = (url: string) => {
  // https://www.example.com/whatever -> example.com
  const urlObj = new URL(url);

  // Remove www. from the hostname
  const hostname = urlObj.hostname.replace('www.', '');
  return hostname;
};
