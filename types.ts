export type MessageType = {
  id: number;
  content: string;
  by: "user" | "model";
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
