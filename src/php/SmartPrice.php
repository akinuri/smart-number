<?php

class SmartPrice {
    
    
    /** SmartNumber */
    protected $sn = null;
    
    
    /**
     * Alias is the user-provided name for the operation.
     */
    public function __construct($value = null) {
        $this->sn = new SmartNumber();
        if ($value) {
            $this->unit($value);
        }
    }
    
    
    #region ==================== OPERATIONS
    
    public function unit($value) {
        $this->sn->add($value, __FUNCTION__);
    }
    
    public function raise($value, $type = "amount") {
        if ($type == "amount") {
            $this->sn->add($value, __FUNCTION__);
        }
        else if ($type == "percentage") {
            $this->sn->mult((100 + $value) / 100, __FUNCTION__);
        }
    }
    
    public function discount($value, $type = "amount") {
        if ($type == "amount") {
            $this->sn->sub($value, __FUNCTION__);
        }
        else if ($type == "percentage") {
            $this->sn->div(100 / (100 - $value), __FUNCTION__);
        }
    }
    
    public function quantity($value) {
        $this->sn->mult($value, __FUNCTION__);
    }
    
    public function tax($value) {
        $this->sn->mult((100 + $value) / 100, __FUNCTION__);
    }
    
    #endregion
    
    
    #region ==================== RESULT
    
    
    public function setResult($value) {
        $this->sn->setResult($value);
    }
    
    public function getResult() {
        return $this->sn->getResult(...func_get_args());
    }
    
    public function getTotal() {
        return $this->sn->getResult();
    }
    
    public function getChange() {
        return $this->sn->getChange(...func_get_args());
    }
    
    #endregion
    
    
}