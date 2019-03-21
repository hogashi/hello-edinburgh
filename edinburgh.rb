# -*- coding: utf-8 -*-

require 'rubygems'

require 'dotenv'

require 'json'
require 'sinatra/base'
require 'sinatra/json'
require 'sinatra/reloader' if Sinatra::Base.development?
require 'thin'

require 'twitter'
require 'omniauth-twitter'

Dotenv.load

class Edinburgh < Sinatra::Base
  configure :development do
    register Sinatra::Reloader
  end

  configure do
    enable :sessions
    use Rack::Session::Cookie,
      :key => 'rack.session',
      :expire_after => 60 * 60 * 24 * 30,
      :secret => Digest::SHA256.hexdigest(rand.to_s)

    mime_type :js, 'text/javascript'
    mime_type :css, 'text/css'

    use OmniAuth::Builder do
      provider :twitter, ENV["CONSUMER_KEY"], ENV["CONSUMER_SECRET"]
    end
  end

  helpers do
    def logged_in?
      !session[:client].nil?
    end
    def current_client
      session[:client]
    end
    def format_tweet_base(tweet)
      user = tweet.user
      formatted_base = {
        :id => tweet.id.to_s,
        :timebase_id =>  tweet.id.to_s,
        :tweet_url => tweet.uri.to_s,
        :created_at => tweet.created_at.dup.localtime('+09:00').strftime("%Y%m%d-%H%M%S"),
        :user => {
          :icon => user.profile_image_uri_https.to_s,
          :name => user.name,
          :screen_name => user.screen_name,
        },
      }
      return formatted_base
    end
    def format_tweet(tweet)
      # p '----------'
      retweeted_status = tweet.retweeted_status
      if retweeted_status.is_a? Twitter::Tweet
        # p tweet
        # p retweeted_status
        retweeter = format_tweet_base(tweet)
        tweet = retweeted_status
      end
      formatted = format_tweet_base(tweet)
      formatted[:retweeter] = retweeter
      formatted[:timebase_id] = retweeter[:id] if retweeter
      # p tweet.attrs
      # p "full: '#{tweet.attrs[:full_text]}'"
      formatted[:text] = tweet.attrs[:full_text]
      formatted[:urls] = []
      tweet.uris.each do |u|
        formatted[:urls].push({
          :short_url => u.uri.to_s,
          :expanded_url => u.expanded_uri.to_s,
          :display_url => u.display_uri.to_s,
          :actual_url => u.expanded_uri.to_s,
        })
      end
      formatted[:media_urls] = []
      tweet.media.each do |m, i|
        formatted[:media_urls].push({
          :short_url => m.url.to_s,
          :expanded_url => m.expanded_url.to_s,
          :display_url => m.display_url.to_s,
          :actual_url => m.media_url_https.to_s
        })
      end
      # p formatted
      return formatted
    end
  end

  before do
    #p settings.production?
    #p request.secure?
    if settings.production? && !request.secure?
      redirect to(request.url.gsub(/^http/, 'https'))
    end
  end

  get '/auth/twitter/callback' do
    auth_hash = env['omniauth.auth']
    #p auth_hash
    credentials = auth_hash[:credentials]
    #p credentials

    client = Twitter::REST::Client.new do |config|
      config.consumer_key        = ENV["CONSUMER_KEY"]
      config.consumer_secret     = ENV["CONSUMER_SECRET"]
      config.access_token        = credentials[:token]
      config.access_token_secret = credentials[:secret]
    end
    #p client

    # Edinburgh, Scotland
    geoopts = {
      :lat  => 55.9413212,
      :long => -3.3454201,
      :name => 'Edinburgh',
    }

    place = client.similar_places(geoopts).first
    #p place

    #session[:auth_hash] = auth_hash
    session[:client] = client
    session[:opts] = { :place => place }
    session[:message] = 'logged in'

    #redirect to('/auth')
    redirect to('/')
  end

  get '/auth' do
    @message = 'debug'
    erb :index
  end

  get '/auth/failure' do
    @message = 'failed'
    redirect to('/')
  end

  get '/' do
    @message = session[:message]
    session[:message] = ''
    erb :index
  end

  # API
  get '/api/rate_limit_status' do
  end

  get '/api/home_timeline' do
    return 401 unless logged_in?

    # p params
    # TODO, add count-number setting
    opts = {
      :count => 60,
    }
    if !params[:since_id].empty?
      opts = {
        :since_id => params[:since_id].to_i,
      }
    end
    # p opts

    client = session[:client]
    begin
      tweets = client.home_timeline(opts)
    rescue => evar
      # p evar
      # p evar.code
      # p evar.message
      # p evar.rate_limit
      reset_at = evar.rate_limit.reset_at.dup.localtime('+09:00').strftime("%Y%m%d-%H%M%S")
      # p reset_at
      return 400, "#{evar.code}, #{evar.message}, reset at: #{reset_at}"
    end

    @tweets = tweets.map do |tweet|
      format_tweet(tweet)
    end

    json @tweets
  end

  # TODO, post にしたい
  get '/api/tweet' do
    # p params
    #text = "#{params[:text]} : #{Time.now().to_s}"
    text = params[:text]
    client = session[:client]
    #p client
    opts = session[:opts]
    #p opts
    begin
      res = client.update(text, opts)
      @message = "ok: #{res.id.to_s}"
    rescue
      @message = "ng"
    end
    #p res
    session[:message] = ''
    #erb :index
    @message
  end

  get '/logout' do
    session.clear
    redirect to('/')
  end
end
