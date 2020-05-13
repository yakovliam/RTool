package com.yakovliam.rtoolclient.credentials;

import com.yakovliam.rtoolclient.RToolClient;

import java.util.Map;

public class CredentialsLoader {

    public Credentials load() {
        // get config
        Map<String, Object> config = RToolClient.getInstance().getConfigurationManager().getConfig();

        // get creds section
        Map<String, Object> credsSection = (Map<String, Object>) config.get("creds");

        // get clientId
        String clientId = (String) credsSection.get("clientId");
        // get clientToken
        String clientToken = (String) credsSection.get("clientToken");

        // return built creds
        return new Credentials(clientId, clientToken);
    }
}
