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

export interface IUserTasks {
  _id: string;
  user_id: string;
  mention: boolean;
  comment: boolean;
  like: boolean;
  rt: boolean;
  defi: boolean;
}
