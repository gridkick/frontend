class StaticController < ApplicationController
  caches_action :alpha
  def alpha; end

  caches_action :home
  def home;  end

  caches_action :thanks
  def thanks;  end

  def login
    @body_class = "js-app"
  end
end
