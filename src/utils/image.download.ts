export const imageDownload = (filePath: string) => {
  const link = document.createElement("a");
  link.href = `/downloadImage${filePath}`;
  link.download = `${filePath}`;
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
};
