function hex(dec) {
    let hexString = "0123456789ABCDEF";
    return `${hexString.charAt((dec - dec % 16)/16)}${hexString.charAt(dec % 16)}`;
}

function getHexCode(r, g, b) {
    return `#${hex(r)}${hex(g)}${hex(b)}`;
}

function copyHex() {
        navigator.clipboard.writeText(document.getElementById("colour-hex-display").innerText)
    }

let colourPicker = Array.from(document.getElementsByClassName("colour-picker")).at(-1);
let gaugeObjects = Array.from(colourPicker.children[0].children)

    .map(el => {
        let gauge = new LinearIntegralGauge(el.getAttribute("data-min"), el.getAttribute("data-max"), el.getAttribute("data-label"));
        colourPicker.children[0].replaceChild(gauge.getComponent(), el);
        gauge.indicator.adjustableComponent.style.backgroundColor = `${el.getAttribute("data-colour") || "grey"}`;
        return gauge;
    });
let colourResult = Array.from(colourPicker.children)
    .filter(el => el.className === "colour-result")[0];
let hexSpan = colourResult.children[0];

gaugeObjects.forEach((gauge, i, arr) => {
    gauge.display.inputComponent.addEventListener("keydown", event => {
        if (event.key === "Tab") {
            event.preventDefault();
            if (event.shiftKey) {
                if (i === 0)
                    arr.at(-1).display.displayComponent.onclick({ button: 0 });
                else
                    arr[i - 1].display.displayComponent.onclick({ button: 0 });
            } else {
                if (i === arr.length - 1)
                    arr[0].display.displayComponent.onclick({ button: 0 });
                else
                    arr[i + 1].display.displayComponent.onclick({ button: 0 });
            }
        }
    });
});

let maxWidth = gaugeObjects.reduce((acc, cur) => {
    let width = cur.labelComponent.getBoundingClientRect().width;
    if (width > acc)
        return width;
    else
        return acc;
}, 0);
gaugeObjects.forEach(gauge => {
    gauge.labelComponent.style.width = `${maxWidth}px`;
});

gaugeObjects.forEach(gauge => {
    gauge.mainComponent.addEventListener("newvalue", event => {
        setColour();
    });
})

function setColour() {
    let hexCode = getHexCode(...gaugeObjects.map(gauge => gauge.getValue()));
    colourResult.style.backgroundColor = `${hexCode}`;
    hexSpan.innerText = `${hexCode}`;
}

setColour();