AdventureFrontend::Application.routes.draw do
  get '/alpha' => 'static#alpha'
  get '/thanks' => 'static#thanks'

  # catch all to frontend application
  match "/*any" => "static#login"

  #need this so we can use root_url helper in links
  root :to => "static#home"
end
