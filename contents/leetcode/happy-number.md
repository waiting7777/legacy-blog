---
id: 202
title: Happy Number
difficulty: easy
tags: Hash Table, Math, Two Pointers
similar:
slug: happy-number
---

Write an algorithm to determine if a number n is happy.

A **Happy Number** is a number defined by the following process:

- Starting with any positive integer, replace the number by the sum of the squares of its digits
- Repeat the process until the number equals 1 (where it will stay), or it **loops endlessly in a cycle** which does not include 1.
- Those numbers for which this process **ends in 1** are happy numbers.

Return `true` if `n` is a happy number, and `false` if not.

## Example 1:

```
Input: n = 19
Output: true
Explanation:
1^2 + 9^2 = 82
8^2 + 2^2 = 68
6^2 + 8^2 = 100
1^2 + 0^2 + 0^2 = 1
```

## Example 2:

```
Input: n = 2
Output: false
```

## Constraints:

- `1 <= n <= 2^31 - 1`

## Solution:

```
/**
 * @param {number} n
 * @return {boolean}
 */
var isHappy = function(n) {
    const temp = []
    while (1) {
      let sum = 0
        while (n > 0) {
            sum = sum + Math.pow(n % 10, 2)
            n = Math.floor(n / 10)
        }

        if (sum == 1) return true
        if (temp.includes(sum)) return false

        temp.push(sum)
        n = sum
    }
}
```

## Expalnation:

每輪將數值記下來，如果有重複的數值，則代表會循環，因此不是 happy number。
