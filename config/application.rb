# frozen_string_literal: true

# config file
require 'rails'
require 'active_model/railtie'
require 'active_job/railtie'
require 'active_record/railtie'
require 'active_storage/engine'
require 'action_controller/railtie'
require 'action_mailer/railtie'
require 'action_view/railtie'
require 'action_cable/engine'

Bundler.require(*Rails.groups)

module ListAppV2
  # rack cors
  class Application < Rails::Application
    config.middleware.use ActionDispatch::Flash
    config.paths.add Rails.root.join('lib').to_s, eager_load: true
    config.load_defaults 5.2

    config.generators.system_tests = nil

    config.middleware.insert_before 0, Rack::Cors do
      allow do
        origins '*'
        resource '*', headers: :any, methods: %i[
          delete put patch get post options
        ]
      end
    end
    config.api_only = true
  end
end
