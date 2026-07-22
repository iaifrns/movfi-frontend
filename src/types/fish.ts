export interface Fish {
  id: string;
  activity_id: string;
  length: number;
  weight: number;
  species: string;
  behavior: string;
  note: string;
  name: string;
  file: any;
}

export interface FishInput {
  length: number;
  weight: number;
  species: string;
  behavior: string;
  note: string;
  name: string;
}

export interface FileDataStructure {
  id: string;
  file_name: string;
  data: Record<string, number>;
  fish_id: string;
  create_at: Date;
  expires_at: Date;
  last_accessed: Date;
  access_count: number;
}
