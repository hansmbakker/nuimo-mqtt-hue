/// <reference path="./index.d.ts" />

declare module "node-hue-api" {
    
    export module lightState {

        class State {
            payload(): Object;
        
            /**
             * Resets/Clears the properties that have been set in the light state object.
             * @returns {State}
             */
            reset(): State;
            clear(): State;

            /**
             * Creates a copy of the state object
             * @returns {State}
             */
            copy(): State;

            /**
             * Sets the strict state for setting parameters for the light state.
             * @param strict
             * @returns {State}
             */
            strict(): State;

            isStrict(): boolean;

            /**
             * Sets the on state
             * @param on The state (true for on, false for off). If this parameter is not specified, it is assumed to be true.
             * @returns {State}
             */
            on(on?: boolean): State;

            /**
             * Adds the bri state
             * @param value The hue bri value, 0 to 254.
             * @return {State}
             */
            bri(value: number): State;

            /**
             * Adds the hue for the color desired.
             * @param hue The hue value is a wrapping value between 0 and 65535. Both 0 and 65535 are red, 25500 is green and 46920 is blue.
             * @returns {State}
             */
            hue(hue: number): State;

            /**
             * The saturation of the color for the bulb, 0 being the least saturated i.e. white.
             * @param saturation The saturation value 0 to 255
             * @returns {State}
             */
            sat(saturation: number): State;

            /**
             * Adds the xy values
             * @param x The x value ranged from 0 to 1, or an Array of [x, y] values
             * @param y The y value ranged from 0 to 1
             * @return {State}
             */
            xy(x: number, y: number): State;

            /**
             * Adds the Mired Color Temperature
             * @param colorTemp The Color Temperature between 153 to 500 inclusive.
             * @returns {State}
             */
            ct(colorTemp: number): State;

            /**
             * Adds the alert state
             * @param value A String value representing the alert state, "none", "select", "lselect".
             * @return {State}
             */
            alert(value: HueLightAlert): State;

            /**
             * Adds an effect for the bulb.
             * @param value The type of effect, currently supports "none" and "colorloop".
             * @returns {State}
             */
            effect(value: HueLightEffect): State;

            /**
             * Adds a transition to the desired state.
             * @param value This is given as a multiple of 100ms and defaults to 4 (400ms).
             * @return {State}
             */
            transitiontime(value: number): State;

            /**
             * Increments/Decrements the brightness value for the lights.
             * @param value An amount to change the current brightness by, -254 to 254.
             * @returns {State}
             */
            bri_inc(value: number): State;

            /**
             * Increments/Decrements the saturation value for the lights.
             * @param value An amount to change the current saturation by, -254 to 254.
             * @returns {State}
             */
            sat_inc(value: number): State;

            /**
             * Increments/Decrements the Hue value for the lights.
             * @param value An amount to change the current hue by, -65534 to 65534.
             * @returns {State}
             */
            hue_inc(value: number): State;

            /**
             * Increments/Decrements the color temperature value for the lights.
             * @param value An amount to change the current color temperature by, -65534 to 65534.
             * @returns {State}
             */
            ct_inc(value: number): State;

            /**
             * Increments/Decrements the XY value for the lights.
             * @param value An amount to change the current XY by, -0.5 to 0.5.
             * @returns {State}
             */
            xy_inc(value: number): State;

            scene(value: string): State;


            ///////////////////////////////////////////////////////////////////////
            // Convenience functions

            turnOn(): State;

            off(): State;
            turnOff(): State;

            /**
             * Set the brightness as a percent value
             * @param percentage The brightness percentage value between 0 and 100.
             * @returns {State}
             */
            brightness(percentage: number): State;

            incrementBrightness(value: number): State;

            colorTemperature(value: number): State;
            colourTemperature(value: number): State;
            colorTemp(value: number): State;
            colourTemp(value: number): State;

            incrementColorTemp(value: number): State;
            incrementColorTemperature(value: number): State;
            incrementColourTemp(value: number): State;
            incrementColourTemperature(value: number): State;

            incrementHue(value: number): State;

            incrementXY(value: number): State;

            saturation(percentage: number): State;

            incrementSaturation(value: number): State;

            shortAlert(): State;
            alertShort(): State;

            longAlert(): State;
            alertLong(): State;

            transitionTime(value: number): State;
            /**
             * Sets the transition time in milliseconds.
             * @param milliseconds The number of milliseconds for the transition
             * @returns {State}
             */
            transition(milliseconds: number): State;

            transitionSlow(): State;

            transitionFast(): State;

            transitionInstant(): State;

            transitionDefault(): State;

            /**
             * Builds the White state for a lamp
             * @param colorTemp The temperature, a value of 153-500
             * @param brightPercentage The percentage of brightness 0-100
             * @return {State}
             */
            white(colorTemp: number, brightPercentage: number): State;

            /**
             * Adds the HSL values
             * @param hue The hue value in degrees 0-360
             * @param saturation The saturation percentage 0-100
             * @param luminosity The luminosity percentage 0-100
             * @return {State}
             */
            hsl(hue: number, saturation: number, luminosity: number): State;

            /**
             * Adds the HSB values
             * @param hue The hue value in degrees 0-360
             * @param saturation The saturation percentage 0-100
             * @param brightness The brightness percentage 0-100
             * @return {State}
             */
            hsb(hue: number, saturation: number, brightness: number): State;

            /**
             * Adds the rgb color to the state. This requires knowledge of the light type to be able to convert it into
             * an actual color that the map can display.
             *
             * @param r The amount of Red 0-255, or an {Array} or r, g, b values.
             * @param g The amount of Green 0-255
             * @param b The amount of Blue 0-255
             * @return {State}
             */
            rgb(r: number, g: number, b: number): State;

            hasRGB(): boolean;

            colorLoop(): State;
            colourLoop(): State;
            effectColorLoop(): State;
            effectColourLoop(): State;

            /**
             * Creates a copy of the State if there is an RGB value set.
             *
             * @param modelid The model ID of the light(s) to convert the rgb value for.
             *
             * @returns {State} If there is an RGB value set, then a copy of the state, with the rgb value applied based on the
             * lamp model provided. If there is no RGB value set, then {null} will be returned.
             */
            applyRGB(modelid: string): State;
        }

        function create(values?: Object): State;
        function isLightState(obj: Object): boolean;
    }
}