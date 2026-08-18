export interface Fish {
  id: string;
  activity_id: string;
  length: number;
  weight: number;
  species: string;
  behavior: string;
  name: string;
  file: any;
  fps?: number;
  duration?: number;
  body_points?: number;
  max_amplitude?: number;
  tail_beat_frequency?: number;
  wave_length?: number;
}

export interface FishInput {
  length: number;
  weight: number;
  species: string;
  behavior: string;
  name: string;
  file?: any;
  fps: number;
  duration: number;
  body_points: number;
  max_amplitude: number;
  tail_beat_frequency: number;
  wave_length: number;
}

export interface FileDataStructure {
  id: string;
  file_name: string;
  data: Record<string, number>[];
  fish_id: string;
  create_at: Date;
  expires_at: Date;
  last_accessed: Date;
  access_count: number;
}

export interface SimulatedData {
  fps: number;
  duration: number;
  body_points: number;
  max_amplitude: number;
  tail_beat_frequency: number;
  wave_length: number;
}
