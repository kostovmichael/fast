import { attr, FASTElement, observable } from "@microsoft/fast-element";

/**
 * An Option Custom HTML Element.
 * Implements {@link https://www.w3.org/TR/wai-aria-1.1/#option | ARIA menuitem }.
 *
 * @public
 */
export class Option extends FASTElement {
    /**
     * The defaultSelected state of the option.
     * @public
     */
    @observable
    public defaultSelected: boolean = false;
    private defaultSelectedChanged(): void {
        if (!this.dirtySelected) {
            this.selected = this.defaultSelected;
        }
    }

    /**
     * Tracks whether the "selected" property has been changed.
     * @internal
     */
    private dirtySelected: boolean = false;

    /**
     * The disabled state of the option.
     * @public
     * @remarks
     * HTML Attribute: disabled
     */
    @attr({ mode: "boolean" })
    public disabled: boolean;

    /**
     * The selected attribute value. This sets the initial selected value.
     *
     * @public
     * @remarks
     * HTML Attribute: selected
     */
    @attr({ attribute: "selected", mode: "boolean" })
    public selectedAttribute: boolean;
    private selectedAttributeChanged(): void {
        this.defaultSelected = this.selectedAttribute;
    }

    /**
     * The checked state of the control.
     *
     * @public
     */
    @observable
    public selected: boolean = this.defaultSelected;
    private selectedChanged(oldValue, newValue): void {
        if (this.$fastController.isConnected) {
            if (!this.dirtySelected) {
                this.dirtySelected = true;
            }

            this.classList.toggle("selected", oldValue !== newValue ? newValue : false);

            if (newValue) {
                this.$emit("change");
            }
        }
    }

    public get value(): string {
        return this.valueAttribute ? this.valueAttribute : this.textContent || "";
    }

    /**
     * The value attribute.
     * @public
     * @remarks
     * HTML Attribute: value
     */
    @attr({ attribute: "value", mode: "fromView" })
    public valueAttribute: string;

    public handleClick = (e: MouseEvent): void => {
        if (this.disabled) {
            return;
        }

        this.selected = true;
    };

    public get label() {
        return this.value ? this.value : this.textContent;
    }

    public get text(): string | null {
        return this.textContent;
    }
}
