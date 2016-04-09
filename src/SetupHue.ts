import hueModule = require("node-hue-api");
import HueApi = hueModule.HueApi;

import settings = require("./settings");

export default async function setupHue() {
    let host = await getFirstHueBridgeIfNotConfigured();
    saveHueBridgeHost(host);

    let username: string = await registerUserIfNotConfigured(host);
    saveHueBridgeUsername(username);

    writeConfigToConsole();
}

function writeConfigToConsole() {
    let hueConfig = settings.getHueConfig();
    console.dir(hueConfig);
}

function saveHueBridgeHost(host: string) {
    let hueConfig = settings.getHueConfig();
    hueConfig.host = host;
    settings.saveHueConfig(hueConfig);
}

function saveHueBridgeUsername(username: string) {
    let hueConfig = settings.getHueConfig();
    hueConfig.username = username;
    settings.saveHueConfig(hueConfig);
}

function getFirstHueBridgeIfNotConfigured(): Promise<string> {
    let hueConfig = settings.getHueConfig();
    let host = hueConfig.host;

    if (host === undefined || host === null || host === "") {
        return getFirstHueBridge();
    }
    else return Promise.resolve(host);
};

function getFirstHueBridge(): Promise<string> {
    return hueModule.nupnpSearch().then(
        function(hueResponse) {
            if (hueResponse.length > 0) {
                let firstBridge = hueResponse[0];
                let host = firstBridge.ipaddress;
                return host;
            }
            else {
                throw "No bridges found";
            }
        }
    );
}

async function registerUserIfNotConfigured(host: string): Promise<string> {
    let hueConfig = settings.getHueConfig();
    let username = hueConfig.username;

    if (!username) {
        if (!host) {
            if (!hueConfig.host) {
                throw "Unknown host";
            }
            else {
                host = hueConfig.host;
            }
        }
        let hueApi = new HueApi();

        console.log("Press the link button on the hub to create a user");

        let creationSucceeded = false;
        let timesTried = 0;
        while (!creationSucceeded && timesTried <= 5) {
            try {
                timesTried++;
                let createdUser = await registerUser(host);
                return createdUser;
            }
            catch (err) {
                await delay(5000);
                console.log("Link button was not pressed. Press the link button on the hub to create a user.");
            }
        }
    }
    else {
        return Promise.resolve(username);
    }

}

async function delay(milliseconds: number) {
    return new Promise<void>(resolve => {
        setTimeout(resolve, milliseconds);
    });
}

async function registerUser(host: string) {
    let userDescription = "Nuimo Hue controller app";
    let hueApi = new HueApi();

    let createdUsername = await hueApi.registerUser(host, userDescription);
    console.log("Successfully created user: " + createdUsername);

    return createdUsername;
}

