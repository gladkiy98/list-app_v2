# frozen_string_literal: true

require 'rubygems'
ENV['RAILS_ENV'] ||= 'test'
require File.expand_path('../config/environment', __dir__)

require 'factory_bot_rails'
require 'capybara/poltergeist'

Capybara.register_driver :poltergeist do |app|
  Capybara::Poltergeist::Driver.new(
    app,
    js_errors: false,
    phantomjs_options: ['--ignore-ssl-errors=yes', '--ssl-protocol=any'],
    debug: false,
    timeout: 500,
    phantomjs: File.absolute_path(Phantomjs.path)
  )
end

Capybara.javascript_driver = :selenium

Capybara.run_server = true
Capybara.server_port = 7000
Capybara.app_host = "http://localhost:#{Capybara.server_port}"

RSpec.configure do |config|
  config.expect_with :rspec do |expectations|
    expectations.include_chain_clauses_in_custom_matcher_descriptions = true
  end

  config.mock_with :rspec do |mocks|
    mocks.verify_partial_doubles = true
  end

  config.shared_context_metadata_behavior = :apply_to_host_groups
end
