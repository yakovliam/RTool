package com.yakovliam.rtoolclient.messaging;

import com.yakovliam.rtoolclient.RToolClient;
import com.yakovliam.rtoolclient.thread.DaemonThreadFactory;
import org.apache.commons.httpclient.DefaultHttpMethodRetryHandler;
import org.apache.commons.httpclient.HttpClient;
import org.apache.commons.httpclient.HttpException;
import org.apache.commons.httpclient.HttpStatus;
import org.apache.commons.httpclient.methods.GetMethod;
import org.apache.commons.httpclient.methods.PostMethod;
import org.apache.commons.httpclient.methods.RequestEntity;
import org.apache.commons.httpclient.methods.StringRequestEntity;
import org.apache.commons.httpclient.params.HttpMethodParams;
import org.json.JSONObject;

import java.io.IOException;
import java.util.HashMap;
import java.util.Map;
import java.util.concurrent.*;

public class MessageChecker {

    private ScheduledExecutorService scheduledExecutorService;

    /**
     * Constructor
     * Starts message checker service
     */
    public MessageChecker() {
        // get configuration
        Map<String, Object> config = RToolClient.getInstance().getConfigurationManager().getConfig();

        // get checker section
        Map<String, Object> checker = (Map<String, Object>) config.get("checker");
        // get delayBetweenChecksSeconds (delay between checks in seconds)
        int delayBetweenChecksSeconds = (Integer) checker.get("delayBetweenChecksSeconds");

        // create threadFactory (now it's daemon! :)) )
        DaemonThreadFactory daemonThreadFactory = new DaemonThreadFactory();

        // set up task repeating async
        scheduledExecutorService = Executors.newSingleThreadScheduledExecutor(daemonThreadFactory);
        // run with start delay of 0, and a delay between of {delayBetweenChecksSeconds} seconds
        scheduledExecutorService.scheduleAtFixedRate(MessageChecker::check, 0, delayBetweenChecksSeconds, TimeUnit.SECONDS);
    }

    private static void check() {
        // get config
        Map<String, Object> config = RToolClient.getInstance().getConfigurationManager().getConfig();

        // get server section
        Map<String, Object> serverSection = (Map<String, Object>) config.get("server");

        // get baseUrl
        String baseUrl = (String) serverSection.get("baseUrl");

        // add "/update" to end because that's the url for getting updates from the API
        baseUrl = baseUrl + "/update";

        /* create HTTP request to url */

        // Create an instance of HttpClient.
        HttpClient client = new HttpClient();

        // Create a method instance.
        PostMethod method = new PostMethod(baseUrl);

        // Add fields / headers
        method.addRequestHeader("Content-Type", "application/json");

        Map<String, String> body = new HashMap<>();
        body.put("clientId", RToolClient.getInstance().getCredentials().getClientId());
        body.put("clientToken", RToolClient.getInstance().getCredentials().getClientToken());

        // CREATE BODY
        String jsonBody = new JSONObject(body).toString();

        try {
            // request entity (body data)
            StringRequestEntity requestEntity = new StringRequestEntity(jsonBody, "application/json", "utf-8");

            // set body
            method.setRequestEntity(requestEntity);

            // Execute the method.
            int statusCode = client.executeMethod(method);

            // Read the response body.
            byte[] responseBody = method.getResponseBody();

            String response = new String(responseBody);

            System.out.println("Response > " + response);

        } catch (IOException e) {
            e.printStackTrace();
        } finally {
            // Release the connection.
            method.releaseConnection();
        }
    }
}
