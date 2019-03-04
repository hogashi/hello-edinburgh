interface IUser {
  icon: string;
  name: string;
  screen_name: string;
}

interface ITweet {
  id: number;
  text: string;
  tweet_url: string;
  created_at: Date;
  user: IUser;
  media_urls?: string[];
  retweeter?: ITweet;
}
