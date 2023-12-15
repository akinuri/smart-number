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
        this.sn.add(value, SmartNumber.getFunctionName());
    }
    
    raise(value, type = "amount") {
        if (type == "amount") {
            this.sn.add(value, SmartNumber.getFunctionName());
        }
        else if (type == "percentage") {
            this.sn.mult((100 + value) / 100, SmartNumber.getFunctionName());
        }
    }
    
    discount(value, type = "amount") {
        if (type == "amount") {
            this.sn.sub(value, SmartNumber.getFunctionName());
        }
        else if (type == "percentage") {
            this.sn.div(100 / (100 - value), SmartNumber.getFunctionName());
        }
    }
    
    quantity(value) {
        this.sn.mult(value, SmartNumber.getFunctionName());
    }
    
    tax(value) {
        this.sn.mult((100 + value) / 100, SmartNumber.getFunctionName());
    }
    
    getOperationValue(name, isAlias = true) {
        return this.sn.getOperationValue(name, isAlias);
    }
    
    //#endregion
    
    
    // #region ==================== RESULT
    
    reset() {
        this.sn.reset();
    }
    
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