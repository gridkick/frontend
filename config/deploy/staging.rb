set :branch    , 'master'
set :deploy_to , "/var/www/#{ application }/alpha-staging"
set :domain    , 'staging.gridkick.com'
set :rails_env , 'staging'
set :user      , 'ubuntu'

server domain , :app , :web , :primary => true
