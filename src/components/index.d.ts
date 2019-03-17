interface IUser {
  icon: string;
  name: string;
  screen_name: string;
}

interface IUrl {
  short_url: string;
  expanded_url: string;
  display_url: string;
  actual_url: string;
}

interface ITweetBase {
  id: number,
  tweet_url: string,
  created_at: string,
  user: IUser,
}

interface ITweet extends ITweetBase {
  text: string;
  urls: IUrl[];
  media_urls: IUrl[];
  retweeter?: ITweetBase;
  time?: number;
}
