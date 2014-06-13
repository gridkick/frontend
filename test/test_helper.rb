ENV['RAILS_ENV'] = 'test'
require File.expand_path('../../config/environment', __FILE__)

gem 'minitest'

# Removed `hell` because it breaks w/ Mocha
%w(
  autorun
  rails
  pride
).each do | test_lib |
  require "minitest/#{ test_lib }"
end

Dir[ "#{ File.dirname __FILE__ }/support/**/*.rb" ].each { | f | require f }

class ActiveSupport::TestCase
end

require 'mocha/setup'
