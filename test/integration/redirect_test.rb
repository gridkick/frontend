require 'test_helper'

class RedirectTest < ActionDispatch::IntegrationTest
  it 'does not redirect on the home route' do
    get '/'
    response.ok?.must_equal true
  end

  it 'does not redirect on the alpha route' do
    get '/alpha'
    response.ok?.must_equal true
  end

  it 'redirects all others to the homepage' do
    get '/__bogus__'
    response.redirect?.must_equal true
    URI( response[ 'Location' ] ).path.must_equal '/'
  end
end
