export interface DocumentType {
  id: number;
  name: string;
  description: string;
  image: string;
  selected: boolean;
}

export interface DocumentState {
  items: DocumentType[],
  selected: null | number,
  loading: boolean,
  error: null | string,
}
