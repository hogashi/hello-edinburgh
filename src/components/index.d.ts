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

interface ITweet {
  id: number;
  text: string;
  tweet_url: string;
  created_at: Date;
  user: IUser;
  urls: IUrl[];
  media_urls: IUrl[];
  retweeter?: ITweet;
  time?: number;
}
