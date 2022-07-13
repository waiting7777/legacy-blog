---
id: 392
title: Is Subsequence
difficulty: easy
tag: two pointers, string, dynamic programming
similar:
slug: is-subsequence
---

Given two strings `s` and `t`, return `true` if `s` is a **subsequence** of `t`, or `false` otherwise.

A **subsequence** of a string `t` is a new string that is formed from the original string by deleting some (can be none) of the characters without disturbing the relative positions of the remaining characters. (ie, `"ace"` is a subsequence of `"abcde"` while `"aec"` is not).

## Example 1:

```
Input: s = "abc", t = "ahbgdc"
Output: true
```

## Example 2:

```
Input: s = "axc", t = "ahbgdc"
Output: false
```

## Constraints:

- `0 <= s.length <= 100`
- `0 <= t.length <= 10^4`
- `s` and `t` consist of lowercase English letters.

## Solution

```
/**
 * @param {string} s
 * @param {string} t
 * @return {boolean}
 */

var isSubsequence = function(s, t) {
    let left = 0
    let right = 0
    while (left < s.length && right < t.length) {
        if (s[left] === t[right]) {
            left++
        }
        right++
    }
    return left === s.length
}
```

## Expalnation

設置字串 s 跟 t 指針，開始檢查字串 t 每個字元，當跟 s 字元相同時，將 s 指針往右移，如果已經跑完整個 s 字串，則為 true，否則為 false。
