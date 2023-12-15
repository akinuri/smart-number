<?php

class SmartNumber {
    
    
    /** Registry for the applied operations. */
    protected $operations = [
        // [operationAlias, operationName, value],
        // ["initial", "add", 1000],
    ];
    
    
    /**
     * Alias is the user-provided name for the operation.
     */
    public function __construct($value = null, string $alias = "initial") {
        if ($value) {
            $this->add($value, $alias);
        }
    }
    
    
    #region ==================== VALIDATION
    
    protected function validateAlias($alias = null) {
        if ($alias) {
            $aliasIsFound = false;
            $aliasHasChanged = false;
            foreach ($this->operations as $operation) {
                [$opAlias] = $operation;
                if ($aliasIsFound) {
                    if ($opAlias !== $alias) {
                        $aliasHasChanged = true;
                        break;
                    }
                } else {
                    if ($opAlias === $alias) {
                        $aliasIsFound = true;
                    }
                }
            }
            if ($aliasIsFound && $aliasHasChanged) {
                throw new Error(
                    implode(" ", [
                        sprintf('The alias "%s" is not valid.', $alias),
                        "It has been used before.",
                    ])
                );
            }
        }
    }
    
    #endregion
    
    
    #region ==================== OPERATIONS
    
    protected function registerOperation($alias, $operation, $value) {
        $this->validateAlias(alias);
        $this->operations[] = [$alias, $operation, $value];
    }
    
    public function add($value, $alias = null) {
        $this->registerOperation($alias, __FUNCTION__, $value);
    }
    
    public function sub($value, $alias = null) {
        $this->registerOperation($alias, __FUNCTION__, $value);
    }
    
    public function mult($value, $alias = null) {
        $this->registerOperation($alias, __FUNCTION__, $value);
    }
    
    public function div($value, $alias = null) {
        $this->registerOperation($alias, __FUNCTION__, $value);
    }
    
    public function getOperations(): array {
        return $this->operations;
    }
    
    public function getOperationsAliases(): array {
        return array_unique( array_map(fn ($op) => $op[0], $this->operations) );
    }
    
    #endregion
    
    
    #region ==================== RESULT
    
    public function getResult() {
        $requestedAliases = func_get_args();
        $allAliases = $this->getOperationsAliases();
        if (count($requestedAliases) == 0) {
            $requestedAliases = $allAliases;
        }
        $requestedOperations = [];
        foreach ($requestedAliases as $requestedAlias) {
            if (in_array($requestedAlias, $allAliases)) {
                foreach ($this->operations as $op) {
                    [$opAlias] = $op;
                    if ($opAlias == $requestedAlias) {
                        $requestedOperations[] = $op;
                    }
                }
            }
        }
        $result = 0;
        foreach ($requestedOperations as $op) {
            [, $opName, $opValue] = $op;
            switch ($opName) {
                case "add":  $result += $opValue; break;
                case "sub":  $result -= $opValue; break;
                case "mult": $result *= $opValue; break;
                case "div":  $result /= $opValue; break;
            }
        }
        return $result;
    }
    
    public function setResult($result) {
        $operations = $this->operations;
        $operations = array_reverse($operations);
        $calcResult = $result;
        for ($i == 0; $i < count($operations); $i++) {
            [, $opName, $opValue] = $operations[$i];
            if ($opValue === null) {
                $reverseIndex = (count($operations) - 1) - $i;
                $this->operations[$reverseIndex][2] = $calcResult;
                break;
            } else {
                switch ($opName) {
                    case "add":  $calcResult -= $opValue; break;
                    case "sub":  $calcResult += $opValue; break;
                    case "mult": $calcResult /= $opValue; break;
                    case "div":  $calcResult *= $opValue; break;
                }
            }
        }
    }
    
    #endregion
    
    
    #region ==================== CHANGE
    
    /**
     * Returns the change the last operation brings/causes.
     */
    public function getChange() {
        $min = 0;
        $max = 0;
        $requestedAliases = func_get_args();
        if (count($requestedAliases) == 0) {
            $max = $this->getResult();
            $min = $this->getFirstAmount();
        }
        else if (count($requestedAliases) == 1) {
            $max = $this->getResult(...$requestedAliases);
            $min = 0;
        }
        else {
            $max = $this->getResult(...$requestedAliases);
            $minReqAliases = $requestedAliases;
            array_pop($minReqAliases);
            $min = $this->getResult(...$minReqAliases);
        }
        $change = $max - $min;
        return $change;
    }
    
    /**
     * Returns the first add or sub operation.
     */
    protected function getFirstAmount() {
        $targetOp = null;
        foreach ($this->operations as $op) {
            if (in_array($op[1], ["add", "sub"])) {
                $targetOp = $op;
                break;
            }
        }
        $amount = $targetOp[2] ?? 0;
        return $amount;
    }
    
    #endregion
    
    
}