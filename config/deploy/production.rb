set :branch    , 'master'
set :deploy_to , "/var/www/#{ application }/alpha"
set :domain    , 'gridkick.com'
set :rails_env , 'production'
set :user      , 'ubuntu'

server domain , :app , :web , :primary => true
