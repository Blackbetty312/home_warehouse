module TranslationsHelper
    def translation_keys(i18n_locale)
        default_keys
    end
    
    private

    def default_keys
        pl = YAML.load_file("#{Rails.root}/config/locales/pl.yml")
        devise_pl = YAML.load_file("#{Rails.root}/config/locales/devise.pl.yml")
        pl.deep_merge!(devise_pl)
        nested_hash_to_string(pl).map {|x| x.split(".")[1..].join(".")}
    end

    def translation_for_key(translations, key)
    hits = translations.to_a.select{ |t| t.key == key }
    hits.first
    end

    def nested_hash_to_string(hash, prefix = '')
        hash.map do |key, value|
          if value.is_a?(Hash)
            nested_hash_to_string(value, "#{prefix}#{key}.")
          else
            "#{prefix}#{key}"
          end
        end.flatten
      end
end
