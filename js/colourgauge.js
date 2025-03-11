class ColourGauge {
    constructor() {
        this.mainComponent = document.createElement("div");
        this.mainComponent.className = "colour-gauge";

        this.redGauge = new ColourComponentGauge();
        this.greenGauge = new ColourComponentGauge();
        this.blueGauge = new ColourComponentGauge();

        this.mainComponent.append(this.redGauge.getComponent(), this.greenGauge.getComponent(), this.blueGauge.getComponent());
    }
}