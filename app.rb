# -*- coding: utf-8 -*-

require 'rubygems'

require 'dotenv'

require 'sinatra'
require 'thin'

require 'twitter'

Dotenv.load

client = Twitter::REST::Client.new do |config|
  config.consumer_key        = ENV["CONSUMER_KEY"]
  config.consumer_secret     = ENV["CONSUMER_SECRET"]
  config.access_token        = ENV["ACCESS_TOKEN"]
  config.access_token_secret = ENV["ACCESS_TOKEN_SECRET"]
end

#lat = 30.0
#long = 150.0

# Edinburgh, Scotland
lat  = 55.9413212
long = -3.3454201

geoopts = {
  :lat  => lat,
  :long => long,
  :name => 'Edinburgh',
}

place = client.similar_places(geoopts).first

#p place

opts = {
  :place => place,
}

get '/' do
  erb :index, :locals => { :res_ok => '' }
end

post '/' do
  #text = "test: a: #{lat}, o: #{long}, #{Time.now.to_s}"
  #p params
  text = params['text']
  res = "ok or ng"
  begin
    res = client.update(text, opts)
    res_ok = 'ok'
  rescue
    res_ok = 'ng'
  end
  #p res
  erb :index, :locals => { :res_ok => res_ok }
end

