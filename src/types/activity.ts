export interface ActivityResponse {
  id: string;
  name: string;
  description: string;
  user_id: number;
}

export interface ActivityInput {
  name: string;
  description: string;
}
