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

export interface IUserToReward {
  id: string;
  xid: string;
  username: string;
  name: string;
  profile_image_url: string;
  userId: string;
  updatedAt: string;
  user: {
    address: string;
  };
}

export interface IUserToRewardExtended extends IUserToReward {
  amount: number;
  rewardedAt: string;
  coin: string;
}
