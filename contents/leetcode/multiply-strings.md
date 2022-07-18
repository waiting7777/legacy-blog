---
id: 43
title: Multiply Strings
difficulty: medium
tags: Math, String, Simulation
similar:
slug: multiply-strings
---

Given two non-negative integers `num1` and `num2` represented as strings, return the product of `num1` and `num2`, also represented as a string.

**Note**: You must not use any built-in BigInteger library or convert the inputs to integer directly.

## Example 1:

```
Input: num1 = "2", num2 = "3"
Output: "6"
```

## Example 2:

```
Input: num1 = "123", num2 = "456"
Output: "56088"
```

## Constraints:

- `1 <= num1.length, num2.length <= 200`
- `num1` and `num2` consist of digits only.
- Both `num1` and `num2` do not contain any leading zero, except the number 0 itself.

## Solution

```
/**
 * @param {string} num1
 * @param {string} num2
 * @return {string}
 */

var multiply = function(num1, num2) {
    var len1 = num1.length;
    var len2 = num2.length;
    var res = Array(len1 + len2).fill(0);
    var carry = 0;
    var val = 0;
    var index = 0;

    for (var i = len1 - 1; i >= 0; i--) {
      carry = 0;
      for (var j = len2 - 1; j >= 0; j--) {
        index = len1 + len2 - 2 - i - j;
        val= (num1[i] * num2[j]) + carry + res[index];
        carry = Math.floor(val / 10);
        res[index] = val % 10;
      }
      if (carry) res[index + 1] = carry;
    }

    while (res.length > 1 && res[res.length - 1] === 0) res.pop();

    return res.reverse().join('');
}
```
