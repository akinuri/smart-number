class LineItem {

    fields = {
        name: null,
        unit: null,
        quantity: null,
        unitPrice: null,
        discount: {
            type: null,
            value: null,
        },
        taxRate: null,
        total: null,
    };

    constructor(row) {
        this.row = row;
        this.row.lineItem = this;
        this.findFields();
    }

    findFields() {
        this.fields = {
            name: this.row.querySelector(".col-name input"),
            unit: this.row.querySelector(".col-unit input"),
            quantity: this.row.querySelector(".col-quantity input"),
            unitPrice: this.row.querySelector(".col-unit-price input"),
            discount: {
                type: this.row.querySelector(".col-discount select"),
                value: this.row.querySelector(".col-discount input"),
            },
            taxRate: this.row.querySelector(".col-tax input"),
            total: this.row.querySelector(".col-total input"),
        };
    }

    setIndex(index) {
        this.row.querySelector(".col-index").textContent = index;
    }

}