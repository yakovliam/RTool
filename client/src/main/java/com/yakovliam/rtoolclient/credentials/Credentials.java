package com.yakovliam.rtoolclient.credentials;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@NoArgsConstructor
@AllArgsConstructor
public class Credentials {

    /**
     * The client's given ID
     */
    @Getter @Setter private String clientId;
    /**
     * The client's given Token
     */
    @Getter @Setter private String clientToken;
}
