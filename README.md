# smart-number
A library to make high-level calculations.

## Problem

I've been working with price calculations, and I've got to say, it's troublesome. A small change in the process/UI requires extensive modifications. This is especially true if one is working with multiple items/products and if there are summary price/total tables for the items.

The complexity (the number of items and the summary tables, etc.) aside, the use of low-level operations (e.g. arithmetic) becomes tedious after a while. I've had to repeat this a couple times, and it was enough. I thought there should be a better way to handle this.

I wanted a way to move through the steps of a calculation, get the result (and the change) of an arbitrary step.

## Solution

Instead of approaching this as a single problem, I've divided it into two; one low-level (`SmartNumber`) and one high-level (`SmartPrice`).

`SmartNumber` allows one to apply arithmetic operations to a number and name these operations arbitrarily. One can later use these names to get different result values.

`SmartPrice` uses `SmartNumber` internally, and builds price related solutions on top of it.

## Examples

A simple price calculation:

```javascript
sp = new SmartPrice();
sp.unit(1000);
sp.raise(200);
sp.discount(10, "percent");
sp.quantity(2);
sp.tax(18);
console.log("total", sp.getTotal()); // 2548.7999
```

If we were to do the same calculation using `SmartNumber`, it'd look like this:

```javascript
sn = new SmartNumber();
sn.add(1000, "unit");
sn.add(200, "raise");
sn.mult(0.9, "discount");
sn.mult(2, "quantity");
sn.mult(1.18, "tax");
console.log("total", sn.getResult()); // 2548.7999
```

The benefit of using this method(s) is that one can pick the result one wishes. For example,

* if one wants to get the result after the discount is applied: 

  `sn.getResult("unit", "raise", "discount") // 1080` 

* or wants to get the change the discount brings:

  `sn.getChange("unit", "raise", "discount") // -120` 

One can also do the calculations backwards, that is the end result is known, but the initial value is not known. For example:

```javascript
sp = new SmartPrice();
sp.unit(null);
sp.raise(200);
sp.discount(10, "percent");
sp.quantity(2);
sp.tax(18);
sp.setResult(2100);
console.log("unit", sp.getResult("unit")); // 788.7005
```

Now, one can get the result and change of any arbitrary step/operation.

Using the `SmartNumber` , one can write other solutions like `SmartPrice`.

## How it works?

[TBA]