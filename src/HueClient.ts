import { NuimoMQTTClient, NuimoGestureEvent, NuimoGesture, NuimoProgressBarStyle } from "./NuimoMQTTClient";
import hueModule = require("node-hue-api");
import settings = require("./settings");

import HueApi = hueModule.HueApi;
import lightState = hueModule.lightState;

export default class HueClient extends NuimoMQTTClient {

    constructor(config: settings.HueControllerConfiguration) {
        super("philipsHue", "Philips Hue", "            ...     .   .    .   .    .   .     ...      ...      ...       .    ");

        super.connectToBroker(config.mqtt.host);
        this.connectToBridge(config.hue.host, config.hue.username);
    }

    hueConnection: HueApi;

    connectToBridge = function(host: string, username: string) {
        this.hueConnection = new HueApi(host, username);
    };

    handleNuimoEvent(nuimoUuid: string, event: NuimoGestureEvent) {

        switch (event.gesture) {
            case NuimoGesture.RotateLeft:
            case NuimoGesture.RotateRight:

                console.log("leftright");
                this.brightnessIncreaseAll(event.value);

                this.sendProgressBarIcon(nuimoUuid, 0.5, NuimoProgressBarStyle.VolumeBar, 0.5); // TODO get actual value
                break;
            case NuimoGesture.ButtonPress:
                this.allOff();
                this.sendNamedIcon(nuimoUuid, "powerOff", 0.5);
                break;
            default:
                break;
        }
    }

    brightnessIncreaseAll = async function(value: number) {
        if (this.hueConnection) {
            let state = lightState.create().on().bri_inc(value / 10);
            let success = await this.hueConnection.setGroupLightState(0, state);
        }
    };

    allOff = async function() {
        if (this.hueConnection) {
            let state = lightState.create().off();
            let success = await this.hueConnection.setGroupLightState(0, state);
        }
    };
}