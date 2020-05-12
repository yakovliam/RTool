package com.yakovliam.rtoolclient.action;

import com.google.gson.Gson;
import com.yakovliam.rtoolclient.messaging.Message;
import org.json.JSONObject;

public class ActionParser {

    public static void run(JSONObject messageJson) {
        // get message class from message object
        Message actionMessage = new Gson().fromJson(messageJson.toString(), Message.class);

        // get message
        String message = actionMessage.getMessage();
    }
}
