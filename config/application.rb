require File.expand_path('../boot', __FILE__)

%w(
  action_controller
  sprockets
).each do | framework |
  require "#{ framework }/railtie"
end

if defined?(Bundler)
  # If you precompile assets before deploying to production, use this line
  Bundler.require(*Rails.groups(:assets => %w(development test)))
  # If you want your assets lazily compiled in production, use this line
  # Bundler.require(:default, :assets, Rails.env)
end

module AdventureFrontend
  class Application < Rails::Application
    # Configure the default encoding used in templates for Ruby 1.9.
    config.encoding = "utf-8"

    # Configure sensitive parameters which will be filtered from the log file.
    config.filter_parameters += [:password]

    # Enable escaping HTML in JSON.
    config.active_support.escape_html_entities_in_json = true

    # Enable the asset pipeline
    config.assets.enabled = true

    # Version of your assets, change this if you want to expire all your assets
    config.assets.version = '1.0'

    # Load local environment data if it is present
    envfile = "#{ config.root }/.env"
    if File.exists?( envfile )
      require 'foreman/env'
      Foreman::Env.new( envfile ).entries do | key , value |
        ENV[ key ] = value if ENV[ key ].blank?
      end
    end
  end
end
