package com.yakovliam.rtoolclient.configuration;

import lombok.Getter;

import java.util.HashMap;
import java.util.Map;

public class ConfigurationManager {

    /**
     * The configuration map that contains all configurations
     */
    @Getter private Map<String, Object> config;

    /**
     * Constructor
     * Loads configuration into map
     */
    public ConfigurationManager() {
        config = new HashMap<>();

        // load actual configuration
        config = new ConfigurationLoader().load();
    }
}
