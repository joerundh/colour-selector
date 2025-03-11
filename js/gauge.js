class LinearIntegralGauge {
    constructor(min, max, label) {
        [ this.min, this.max ] = [ min ? min : 0, max ? max : 100 ];

        /*
        Create component and set style
        */
        this.mainComponent = document.createElement("div");
        this.mainComponent.className = "linear-integral-gauge";
        this.mainComponent.style.width = "fit-content";
        this.mainComponent.style.height = "fit-content";
        this.mainComponent.style.padding = "10px";
        this.mainComponent.style.display = "flex";
        this.mainComponent.style.flexDirection = "row";
        this.mainComponent.style.justifyItems = "space-between";
        this.mainComponent.style.gap = "10px";

        /*
        Create label component
        */
        this.labelComponent = document.createElement("div");
        this.labelComponent.className = "gauge-label";
        this.labelComponent.style.userSelect = "none";
        this.labelComponent.style.textAlign = "right";
        if (label) {
            this.labelComponent.innerText = label;
            this.mainComponent.append(this.labelComponent);
        }

        /*
        Create and style linear integral indicator
        */
        this.indicator = new LinearIntegralIndicator(min, max);
        this.mainComponent.append(this.indicator.getComponent());

        /*
        Create and style writable span
        */
        this.display = new WritableTextbox(min, max);
        this.display.displayComponent.className = "gauge-display";
        this.display.inputComponent.className = "gauge-input";
        this.mainComponent.append(this.display.getComponent());

        /*
        Events
        */  
        this.indicator.mainComponent.addEventListener("adjusted", event => {
            if (this.display.isActive())
                this.display.inputComponent.blur();
            this.display.setValue(this.indicator.getValue());
            this.mainComponent.dispatchEvent(new CustomEvent("newvalue"));
        });

        this.display.mainComponent.addEventListener("valuechanged", event => {
            this.indicator.setValue(this.display.getValue());
            this.mainComponent.dispatchEvent(new CustomEvent("newvalue"));
        });

        this.display.mainComponent.addEventListener("valueset", event => {
            if (this.display.displayComponent.innerText === "")
                this.display.setValue(this.min);
            this.mainComponent.dispatchEvent(new CustomEvent("newvalue"));
        });

        this.indicator.setValue(50)

        /*
        Add to main component
        */
        this.mainComponent.append(this.labelComponent, this.indicator.getComponent(), this.display.getComponent());
    }

    getValue() {
        return this.indicator.getValue();
    }

    /*
    Get the top DOM element to append
    */

    getComponent() {
        return this.mainComponent;
    }
}

class ColourComponentGauge extends LinearIntegralGauge {
    constructor() {
        super(0, 255);
    }
}