class SmartNumber {
    
    
    /**
     * Registry for the applied operations.
     */
    #operations = [
        // [operationAlias, operationName, value],
        // ["initial", "add", 1000],
    ];
    
    
    /**
     * Alias is the user-provided name for the operation.
     */
    constructor(value = null, alias = "initial") {
        if (value) {
            this.add(value, alias);
        }
    }
    
    
    // #region ==================== VALIDATION
    
    #validateAlias(alias = null) {
        if (alias) {
            let aliasIsFound = false;
            let aliasHasChanged = false;
            for (let operation of this.#operations) {
                let [opAlias] = operation;
                if (aliasIsFound) {
                    if (opAlias !== alias) {
                        aliasHasChanged = true;
                        break;
                    }
                } else {
                    if (opAlias === alias) {
                        aliasIsFound = true;
                    }
                }
            }
            if (aliasIsFound && aliasHasChanged) {
                throw new Error(
                    [`The alias "${alias}" is not valid.`,
                     `It has been used before.`,
                    ].join(" "),
                );
            }
        }
    }
    
    //#endregion
    
    
    // #region ==================== OPERATIONS
    
    #registerOperation(alias, operation, value) {
        this.#validateAlias(alias);
        this.#operations.push( [alias, operation, value] );
    }
    
    static getFunctionName() {
        let stack = new Error().stack.split(/\n/);
        let callerMethod = stack[2].match(/at (?:\w+\.)*?([^.]+) \(/)[1] ?? null;
        return callerMethod;
    }
    
    add(value, alias = null) {
        this.#registerOperation(alias, SmartNumber.getFunctionName(), value);
    }
    
    sub(value, alias = null) {
        this.#registerOperation(alias, SmartNumber.getFunctionName(), value);
    }
    
    mult(value, alias = null) {
        this.#registerOperation(alias, SmartNumber.getFunctionName(), value);
    }
    
    div(value, alias = null) {
        this.#registerOperation(alias, SmartNumber.getFunctionName(), value);
    }
    
    getOperations() {
        return this.#operations;
    }
    
    getOperationsAliases() {
        let aliases = Array.from( new Set( this.#operations.map(entry => entry[0]) ) );
        return aliases;
    }
    
    //#endregion
    
    
    // #region ==================== RESULT
    
    getResult() {
        let requestedAliases = Array.from(arguments);
        let allAliases = this.getOperationsAliases();
        if (requestedAliases.length == 0) {
            requestedAliases = allAliases.slice();
        }
        let requestedOperations = [];
        requestedAliases.forEach(requestedAlias => {
            if (allAliases.includes(requestedAlias)) {
                this.#operations.forEach(op => {
                    let [opAlias] = op;
                    if (opAlias == requestedAlias) {
                        requestedOperations.push(op);
                    }
                });
            }
        });
        let result = 0;
        requestedOperations.forEach(op => {
            let [, opName, opValue] = op;
            switch (opName) {
                case "add":  result += opValue; break;
                case "sub":  result -= opValue; break;
                case "mult": result *= opValue; break;
                case "div":  result /= opValue; break;
            }
        });
        return result;
    }
    
    /**
     * Allows us to calculate the missing/unknown values (back in time).
     */
    setResult(result) {
        let operations = this.#operations.slice();
        operations = operations.reverse();
        let calcResult = result;
        for (let i = 0; i < operations.length; i++) {
            let [_, opName, opValue] = operations[i];
            if (opValue === null) {
                let reverseIndex = (operations.length - 1) - i;
                this.#operations[reverseIndex][2] = calcResult;
                break;
            } else {
                switch (opName) {
                    case "add":  calcResult -= opValue; break;
                    case "sub":  calcResult += opValue; break;
                    case "mult": calcResult /= opValue; break;
                    case "div":  calcResult *= opValue; break;
                }
            }
        }
    }
    
    //#endregion
    
    
    // #region ==================== CHANGE
    
    /**
     * Returns the change the last operation brings/causes.
     */
    getChange() {
        let min = 0;
        let max = 0;
        let requestedAliases = Array.from(arguments);
        if (requestedAliases.length == 0) {
            max = this.getResult();
            min = this.#getFirstAmount();
        }
        else if (requestedAliases.length == 1) {
            max = this.getResult(...requestedAliases);
            min = 0;
        }
        else {
            max = this.getResult(...requestedAliases);
            let minReqAliases = requestedAliases.slice();
            minReqAliases.pop();
            min = this.getResult(...minReqAliases);
        }
        let change = max - min;
        return change;
    }
    
    /**
     * Returns the first add or sub operation.
     */
    #getFirstAmount() {
        let op = this.#operations.find(op => ["add", "sub"].includes(op[1]));
        let amount = op[2] ?? 0;
        return amount;
    }
    
    //#endregion
    
    
}