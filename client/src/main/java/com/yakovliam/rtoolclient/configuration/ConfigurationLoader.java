package com.yakovliam.rtoolclient.configuration;

import org.yaml.snakeyaml.Yaml;

import java.io.InputStream;
import java.util.Map;

public class ConfigurationLoader {

    public Map<String, Object> load() {
        Yaml yaml = new Yaml();

        InputStream inputStream = getClass().getClassLoader().getResourceAsStream("config.yml");
        return yaml.load(inputStream);
    }
}
