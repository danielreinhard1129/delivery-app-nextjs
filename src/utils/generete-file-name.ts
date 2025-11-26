import { v4 as uuid } from "uuid";

export function generateFileName(file: File) {
  const ext = file.name.split(".").pop();
  return `${uuid()}.${ext}`;
}
