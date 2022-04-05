---
title: "[LeetCode][Medium] 89. Gray Code"

tags: LeetCode, LeetCode-Medium

category: Engineering

excerpt: An n-bit gray code sequence is a sequence of 2n integers where

date: 2021-04-06

image: ./images/leetcode.jpeg

image_caption: leetcode

author: author1

slug: leetcode-medium-gray-code
---

## 題目

An **n-bit gray code sequence** is a sequence of `2n` integers where:

- Every integer is in the **inclusive** range `[0, 2n - 1]`,
- The first integer is `0`,
- An integer appears **no more than once** in the sequence,
- The binary representation of every pair of **adjacent** integers differs by **exactly one bit**, and
- The binary representation of the **first** and **last** integers differs by **exactly one bit**.

Given an integer `n`, return any valid **n-bit gray code sequence**.

Example 1:

```
Input: n = 2
Output: [0,1,3,2]
Explanation:
The binary representation of [0,1,3,2] is [00,01,11,10].
- 00 and 01 differ by one bit
- 01 and 11 differ by one bit
- 11 and 10 differ by one bit
- 10 and 00 differ by one bit
[0,2,3,1] is also a valid gray code sequence, whose binary representation is [00,10,11,01].
- 00 and 10 differ by one bit
- 10 and 11 differ by one bit
- 11 and 01 differ by one bit
- 01 and 00 differ by one bit
```

Example 2:

```
Input: n = 1
Output: [0,1]
```

## 思路

- n = 0 [0]
- n = 1 [0, 1]
- n = 2 [0, 1, 3, 2]
- n = 3 [0, 1, 3, 2, 6, 7, 5, 4]

認真找尋規律，每一個都會是前一個的 reverse 再加上最大的 bit，也就是 `2^(n - 1)`

## Solution
```javascript
/**
 * @param {number} n
 * @return {number[]}
 */
var grayCode = function(n) {
    var res = [0]
    var count = 0
    while(count < n) {
        const offset = Math.pow(2, n - 1)
        const temp = [...res].reverse().map(v => v + offset)
        res = res.concat(temp)
        n--
    }
    return res
};
```

## Complexity

- Time complexity : O(n)
- Space complexity : O(1)