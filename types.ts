export type MessageType = {
  id: number;
  content: string;
  by: "user" | "model";
};

export type ChatType = {
  id: number;
  title: string;
};
