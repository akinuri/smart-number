class LineItems {

    constructor(tbody, rowTemplate) {
        this.tbody = tbody;
        this.rowTemplate = rowTemplate;
    }

    addLine() {
        let row = this.buildLineItemRow();
        this.prepRow(row);
        this.tbody.append(row);
    }

    buildLineItemRow() {
        return this.rowTemplate.content.children[0].cloneNode(true);
    }

    prepRow(row) {
        let count = this.getRowCount() + 1;
        row.querySelector(".row-index").textContent = count;
    }

    getRowCount() {
        return this.tbody.children.length;
    }

    removeLine(row) {
        row.remove();
        this.reindexLines();
    }

    reindexLines() {
        Array.from(this.tbody.children).forEach((row, index) => {
            row.querySelector(".row-index").textContent = index + 1;
        });
    }

}