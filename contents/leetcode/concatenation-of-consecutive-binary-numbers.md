---
id: 1680
title: Concatenation of Consecutive Binary Numbers
difficulty: medium
tags: Math, Bit Manipulation, Simulation
similar:
slug: concatenation-of-consecutive-binary-numbers
---

Given an integer `n`, return the **decimal value** of the binary string formed by concatenating the binary representations of `1` to `n` in order, **modulo** `10^9 + 7`.

## Example 1:

```
Input: n = 1
Output: 1
Explanation: "1" in binary corresponds to the decimal value 1.
```

## Example 2:

```
Input: n = 3
Output: 27
Explanation: In binary, 1, 2, and 3 corresponds to "1", "10", and "11".
After concatenating them, we have "11011", which corresponds to the decimal value 27.
```

## Example 3:

```
Input: n = 12
Output: 505379714
Explanation: The concatenation results in "1101110010111011110001001101010111100".
The decimal value of that is 118505380540.
After modulo 109 + 7, the result is 505379714.
```

## Constraints:

- `1 <= n <= 105`

## Solutions:

```
/**
 * @param {number} n
 * @return {number}
 */
var concatenatedBinary = function(n) {
    const kMod = BigInt(1e9 + 7)
    let ans = 0n
    let shift = 0n

    for (let i = 1; i <= n; i++) {
        if ((i & (i - 1)) == 0) shift++

        ans = ans << shift
        ans += BigInt(i)
        ans %= kMod
    }
    return ans
};
```

## Explantion:

1 1
2 1 10
3 1 10 11
4 1 10 11 100

答案其實如這般排列，n 每多 1 就把之前答案 shift 一次再加上 n，至於 shift 的長度則是每次遇到 `power of 2` 就增加，這邊用了個 trick 的判斷方法: `isPowerOf2: (i & i - 1) == 0`，然後因為 javascript 的 int 不夠大，所以要用 bigInt 不然會溢位。
