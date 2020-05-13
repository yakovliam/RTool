package com.yakovliam.rtoolclient.messaging;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@AllArgsConstructor
@NoArgsConstructor
public class Message {

    @Getter @Setter private Boolean queued;
    @Getter @Setter private String messageId;
    @Getter @Setter private String dateSent;
    @Getter @Setter private String _id;
    @Getter @Setter private String creator;
    @Getter @Setter private String clientId;
    @Getter @Setter private String message;

}
