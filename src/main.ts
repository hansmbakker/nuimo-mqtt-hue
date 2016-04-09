import settings = require("./settings");
import { default as setupHue } from "./SetupHue";
import { default as HueClient } from "./HueClient";

// find the bridge and create a Hue username on the bridge
setupHue();

let controllerSettings = settings.getConfig();
let hueClient = new HueClient(controllerSettings);
