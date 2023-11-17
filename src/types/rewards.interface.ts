export interface IUserX {
  id: string;
  name: string;
  username: string;
  profile_image_url: string;
}

export interface IUserPoints {
  _id: string;
  id?: string;
  username: string;
  points: number;
}
