# -*- coding: utf-8 -*-

require 'rubygems'

require 'dotenv'

require 'sinatra'
require 'thin'

require 'twitter'
require 'omniauth-twitter'

Dotenv.load

configure do
  enable :sessions

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
end

before do
  #p '--------------------'
  #p session[:client]
  #p logged_in?
  #p request.path_info
  #p request.path_info.match? /^\/auth/

  #unless request.path_info.match? /^\/auth/
  #  unless logged_in?
  #    redirect to('/auth/twitter')
  #  end
  #end
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

get '/' do
  @message = session[:message]
  session[:message] = ''
  erb :index
end

post '/' do
  #p params
  text = params['text']
  client = session[:client]
  #p client
  opts = session[:opts]
  #p opts
  begin
    res = client.update(text, opts)
    @message = "ok: #{res.id}"
  rescue
    @message = "ng"
  end
  #p res
  session[:message] = ''
  erb :index
end

get '/logout' do
  session.clear
  redirect to('/')
end

