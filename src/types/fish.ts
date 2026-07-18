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