class WritableTextbox {
    /*

    */

    constructor(min, max, width, height) {
        [ this.min, this.max ] = [ min, max ];

        this.mainComponent = document.createElement("div");
        this.mainComponent.style.width = "fit-content";
        this.mainComponent.style.height = "fit-content";

        this.displayComponent = document.createElement("div");
        this.displayComponent.innerText = `${this.min}`;
        this.displayComponent.style.width = "50px";
        this.displayComponent.style.height = "20px";
        this.displayComponent.style.fontSize = "16px";
        this.displayComponent.style.border = "1px solid black";
        this.displayComponent.style.textAlign = "center";

        this.inputComponent = document.createElement("input");
        this.inputComponent.style.width = "50px";
        this.inputComponent.style.height = "20px";
        this.inputComponent.style.fontSize = "16px";
        this.inputComponent.style.fontFamily = "Times New Roman";
        this.inputComponent.style.border = "1px solid black";
        this.inputComponent.style.outline = "none";
        this.inputComponent.style.textAlign = "center";

        this.displayComponent.onclick = event => {
            if (event.button === 0) {
                this.inputComponent.value = this.displayComponent.innerText;
                this.mainComponent.replaceChild(this.inputComponent, this.displayComponent);
                this.inputComponent.focus();
                this.inputComponent.select();
            }
        };

        this.inputComponent.onblur = event => {
            setTimeout(() => {
                this.displayComponent.innerText = this.inputComponent.value;
                if (this.mainComponent.children[0] === this.inputComponent)
                    this.mainComponent.replaceChild(this.displayComponent, this.inputComponent);
                this.mainComponent.dispatchEvent(new CustomEvent("valueset"));
            });
        }

        this.inputComponent.onkeydown = event => {
            if (event.key === "Enter") {
                event.preventDefault();
                this.displayComponent.innerText = this.inputComponent.value;
                this.mainComponent.replaceChild(this.displayComponent, this.inputComponent);
            } else if (/^[0-9]$/.test(event.key)) {
                event.preventDefault();
                this.inputComponent.value = `${this.inputComponent.value.slice(0, this.inputComponent.selectionStart)}${event.key}${this.inputComponent.value.slice(this.inputComponent.selectionEnd)}`;
                if (this.getValue() > this.max)
                    this.inputComponent.value = `${this.max}`;
                this.mainComponent.dispatchEvent(new CustomEvent("valuechanged"))
            } else if (event.key === "Backspace") {
                this.inputComponent.value = `${this.inputComponent.value.slice(0, this.inputComponent.selectionStart)}${this.inputComponent.value.slice(this.inputComponent.selectionEnd)}`;
            }
        }

        this.mainComponent.append(this.displayComponent);
    }

    isActive() {
        return this.mainComponent.children[0] === this.inputComponent;
    }

    getValue() {
        if (this.isActive())
            return Number(this.inputComponent.value);
        else
            return Number(this.displayComponent.innerText);
    }

    setValue(value) {
        if (this.isActive())
            this.inputComponent.value = value;
        else
            this.displayComponent.innerText = value;
    }

    getComponent() {
        return this.mainComponent;
    }
}