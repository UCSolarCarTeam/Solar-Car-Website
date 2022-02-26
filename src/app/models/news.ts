export interface News {
  id?: string;
  name: string;
  date: string;
  markdown: string;
  link?: string;
  thumbnail?: File;
  thumbnailUrl: string;
}
