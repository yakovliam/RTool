package com.yakovliam.rtoolclient.action;

import org.json.JSONObject;

import java.util.concurrent.ArrayBlockingQueue;
import java.util.concurrent.BlockingQueue;

public class ActionQueue {

    private final BlockingQueue<JSONObject> queue;

    /**
     * Initialization of chat queue
     */
    public ActionQueue() {
        // create queue
        queue = new ArrayBlockingQueue<>(150);

        // create queue runner
        Thread t = new Thread(() -> {
            while (true) {
                try {
                    take(queue.take());
                } catch (InterruptedException e) {
                    e.printStackTrace();
                }
            }
        });
        t.setDaemon(true);
        t.start();
    }

    public void queue(JSONObject message) {
        this.queue.add(message);
    }

    private void take(JSONObject message) {
        ActionParser.run(message);
    }
}
