# config/initializers/load_translations.rb
backend = I18n::Backend::ActiveRecord.new
I18n.backend = I18n::Backend::Chain.new(backend, I18n.backend)

Translation.pluck(:key, :locale, :value).each do |key, locale, value|
  I18n.backend.store_translations(locale, { key => value }, escape: false)
end

translations_yml = YAML.load_file(Rails.root.join('config', 'locales', 'pl.yml'))
devise_translations_yml = YAML.load_file(Rails.root.join('config', 'locales', 'devise.pl.yml'))
flatten_hash = lambda do |hash, prefix|
  hash.each do |key, value|
    full_key = prefix ? "#{prefix}.#{key}" : key.to_s
    if value.is_a?(Hash)
      flatten_hash.call(value, full_key)
    else
      # todo update tez
      Translation.find_or_create_by(key: full_key.split(".")[1..].join("."), locale: :pl) do |t|
        t.value = value
      end
    end
  end
end
flatten_hash.call(translations_yml, nil)
flatten_hash.call(devise_translations_yml, nil)