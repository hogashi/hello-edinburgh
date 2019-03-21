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
  id: string;
  // 普通のツイートなら普通の,RTならRTのid
  timebase_id: string;
  tweet_url: string;
  created_at: number;
  user: IUser;
  loaded_at: number;
}

interface ITweet extends ITweetBase {
  text: string;
  urls: IUrl[];
  media_urls: IUrl[];
  retweeter?: ITweetBase;
  colorIndex?: number;
}
