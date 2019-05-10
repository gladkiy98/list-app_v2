# frozen_string_literal: true

require 'spec_helper'
ENV['RAILS_ENV'] ||= 'test'
require File.expand_path('../config/environment', __dir__)

abort('The Rails running in production mode!') if Rails.env.production?
require 'rspec/rails'
require 'capybara/rspec'
require 'capybara/rails'
require 'support/factory_bot'
require 'support/database_cleaner'
Dir[File.expand_path('support/shared_examples/*.rb', __dir__)].each { |file| require file }
require 'faker'
require 'database_cleaner'
require 'helpers/helpers'
require 'helpers/request_spec_helper'
require 'helpers/items_spec_helper'
require 'helpers/lists_spec_helper'

begin
  ActiveRecord::Migration.maintain_test_schema!
rescue ActiveRecord::PendingMigrationError => e
  puts e.to_s.strip
  exit 1
end

RSpec.configure do |config|
  config.include Helpers
  config.include RequestSpecHelper
  config.include ItemsSpecHelper
  config.include ListsSpecHelper
  config.fixture_path = "#{::Rails.root}/spec/fixtures"

  config.infer_spec_type_from_file_location!
  config.filter_rails_from_backtrace!
end
