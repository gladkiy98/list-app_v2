# frozen_string_literal: true

RSpec.configure do |config|
  config.use_transactional_fixtures = false
  config.before(:suite) do
  end
  DatabaseCleaner.clean_with(:truncation)

  config.before do
    DatabaseCleaner.strategy = :transaction
  end

  config.before(:each, type: :feature) do
    driver_shares_db_connection = Capybara.current_driver == :rack_test
    DatabaseCleaner.strategy = if driver_shares_db_connection
                                 :transaction
                               else
                                 :truncation
                               end
  end

  config.before do
    DatabaseCleaner.start
  end

  config.after do
    DatabaseCleaner.clean
  end
end
