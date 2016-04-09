import jsonfile = require("jsonfile");
import fs = require("fs");

// configuration file
jsonfile.spaces = 4;
let configurationFile = "./configuration.json";

if (!fs.existsSync(configurationFile)) {
    setupInitialConfig();
}

export function setupInitialConfig(): void {
    let emptyConfig = {
        hue: {
            host: "",
            username: ""
        },
        mqtt: {
            host: "ws://broker.mqttdashboard.com:8000"
        }
    };
    jsonfile.writeFileSync(configurationFile, emptyConfig);
};

export function getConfig(): HueControllerConfiguration {
    let config = jsonfile.readFileSync(configurationFile);
    return config || {};
};

export function getHueConfig(): HueBridgeConnectionConfiguration {
    let config = jsonfile.readFileSync(configurationFile);
    return config.hue || {};
};

export function saveHueConfig(hueConfig: HueBridgeConnectionConfiguration) {
    let config = jsonfile.readFileSync(configurationFile);
    config.hue = hueConfig;
    jsonfile.writeFileSync(configurationFile, config);
};

export function getMqttConfig(): MqttBrokerConfiguration {
    let config = jsonfile.readFileSync(configurationFile);
    return config.mqtt || {};
};

export function saveMqttConfig(mqttConfig: MqttBrokerConfiguration) {
    let config = jsonfile.readFileSync(configurationFile);
    config.mqtt = mqttConfig;
    jsonfile.writeFileSync(configurationFile, config);
};

export interface HueControllerConfiguration {
    hue: HueBridgeConnectionConfiguration;
    mqtt: MqttBrokerConfiguration;
}

export interface HueBridgeConnectionConfiguration {
    host: string;
    username: string;
}

export interface MqttBrokerConfiguration {
    host: string;
}