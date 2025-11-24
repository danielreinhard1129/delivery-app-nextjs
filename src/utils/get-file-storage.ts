export const getFileStorage = (bucket: string, key: string) => {
  return process.env.NEXT_PUBLIC_BASE_URL_STORAGE + `/${bucket}/${key}`;
};
