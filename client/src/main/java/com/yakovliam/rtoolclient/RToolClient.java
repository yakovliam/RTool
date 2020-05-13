package com.yakovliam.rtoolclient;

import com.yakovliam.rtoolclient.action.ActionQueue;
import com.yakovliam.rtoolclient.configuration.ConfigurationManager;
import com.yakovliam.rtoolclient.credentials.Credentials;
import com.yakovliam.rtoolclient.credentials.CredentialsLoader;
import com.yakovliam.rtoolclient.messaging.MessageChecker;
import lombok.Getter;
import lombok.Setter;

public class RToolClient {

    /**
     * Client credentials
     * Allows the client to talk to the server
     */
    @Getter
    @Setter
    private Credentials credentials;

    /**
     * Configuration manager
     */
    @Getter
    @Setter
    private ConfigurationManager configurationManager;

    /**
     * The queue for actions received by the server
     */
    @Getter
    @Setter
    private ActionQueue actionQueue;

    /**
     * Instance of self
     */
    @Getter
    @Setter
    private static RToolClient instance;

    public RToolClient() {
        instance = this;
        enable(); // enable self
    }

    /**
     * Enable method
     * Entry point of program
     */
    public void enable() {

        // load configurationManager
        configurationManager = new ConfigurationManager();

        // load credentials
        credentials = new CredentialsLoader().load();

        // load queue
        actionQueue = new ActionQueue();

        new MessageChecker();
    }

    /**
     * True entry point of the program
     *
     * @param args CommandLine arguments created with {-arg-here}
     */
    public static void main(String[] args) {
        new RToolClient(); // init self to start process
    }
}
