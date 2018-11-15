# Rakefile

task :js_build do
  puts 'js_build'
  sh "yarn install && yarn build"
end

Rake::Task["assets:precompile"].enhance [:js_build]
