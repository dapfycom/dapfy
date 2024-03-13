import {
  IGameInfo,
  IGamePayment,
  IGameWithUserInfo,
  IScGameInfo,
  IScGamePayment,
  IScUserInfo,
  IUserInfo,
} from "./interface";

export const adaptGame = (game?: IScGameInfo): IGameInfo | undefined => {
  if (!game) {
    return;
  }
  return {
    id: game.id.toNumber(),
    amount: game.amount.toString(),
    token_identifier: game.token_identifier,
    user_creator: game.user_creator.bech32(),
    user_challenger: game.user_challenger.bech32(),
    status: game.status.name,
    winner: game.winner.bech32(),
    date: game.date.toNumber(),
  };
};

export const adaptGamesWithUserInfo = (
  gamesWithInfo?: {
    game: IScGameInfo;
    user_creator: IScUserInfo;
    user_challenger: IScUserInfo;
  }[]
): IGameWithUserInfo[] | undefined => {
  if (!gamesWithInfo) {
    return;
  }
  return gamesWithInfo.map((gameI) => {
    return {
      game: adaptGame(gameI.game),
      user_creator: adaptUserInfo(gameI.user_creator),
      user_challenger: adaptUserInfo(gameI.user_challenger),
    };
  });
};

export const adaptUserInfo = (
  userInfo?: IScUserInfo
): IUserInfo | undefined => {
  if (!userInfo) {
    return;
  }
  return {
    username: userInfo.username.toString("utf8"),
    games_created: userInfo.games_created.toNumber(),
    games_challenged: userInfo.games_challenged.toNumber(),
    games_won: userInfo.games_won.toNumber(),
    games_lost: userInfo.games_lost.toNumber(),
    profile_url: userInfo.profile_url.toString("utf8"),
  };
};

export const adaptGamePayment = (payment: IScGamePayment): IGamePayment => {
  return {
    amount: payment.amount.toString(),
    token_identifier: payment.token_identifier,
  };
};
