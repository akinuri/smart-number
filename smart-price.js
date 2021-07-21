class SmartPrice {
    
    /** SmartNumber */
    sn = null;
    
    constructor(value = null) {
        this.sn = new SmartNumber();
        if (value) {
            this.unit(value);
        }
    }
    
    
    // #region ==================== OPERATIONS
    
    unit(value) {
        this.sn.add(value, "unit");
    }
    
    raise(value, type = "amount") {
        if (type == "amount") {
            this.sn.add(value, "raise");
        }
        else if (type == "percent") {
            this.sn.mult((100 + value) / 100, "raise");
        }
    }
    
    discount(value, type = "amount") {
        if (type == "amount") {
            this.sn.sub(value, "discount");
        }
        else if (type == "percent") {
            this.sn.div(100 / (100 - value), "discount");
        }
    }
    
    quantity(value) {
        this.sn.mult(value, "quantity");
    }
    
    tax(value) {
        this.sn.mult((100 + value) / 100, "tax");
    }
    
    //#endregion
    
    
    // #region ==================== RESULT
    
    setResult(value) {
        this.sn.setResult(value);
    }
    
    getResult() {
        return this.sn.getResult(...Array.from(arguments));
    }
    
    getTotal() {
        return this.sn.getResult();
    }
    
    getChange() {
        return this.sn.getChange(...Array.from(arguments));
    }
    
    //#endregion
    
    
}