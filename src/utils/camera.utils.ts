export const dataURLtoFile = (dataurl: string, filename: string) => {
  const arr = dataurl.split(",");
  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  // @ts-ignore
  const mime = arr.length > 0 ? arr[0].match(/:(.*?);/)[1] : undefined;
  const bstr = atob(arr[1]);
  let n = bstr.length;
  const u8arr = new Uint8Array(n);
  while (n) {
    u8arr[n - 1] = bstr.charCodeAt(n - 1);
    n -= 1;
  }
  return new File([u8arr], filename, { type: mime });
};
