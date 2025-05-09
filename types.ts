export type MessageType = {
  id: number;
  content: string;
  by: "user" | "model";
  image: string | null;
};

export type ChatType = {
  id: number;
  title: string;
  isTitleGenerated: number;
};

export type ImageType = {
  filename: string;
  base64: string;
  uri: string;
};
