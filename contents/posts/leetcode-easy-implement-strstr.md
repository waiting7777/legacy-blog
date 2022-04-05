---
title: "[LeetCode][Easy] 28. Implement strStr()"

tags: LeetCode, LeetCode-Easy

category: Engineering

excerpt: Implement strStr(). Return the index of the first occurrence of needle in haystack, or -1 if needle is not part of haystack.

date: 2021-04-07

image: ./images/leetcode.jpeg

image_caption: leetcode

author: author1

slug: leetcode-easy-implement-strstr
---

## 題目

Implement [strStr()](http://www.cplusplus.com/reference/cstring/strstr/).

Return the index of the first occurrence of needle in haystack, or `-1` if `needle` is not part of `haystack`.

#### Clarification:

What should we return when `needle` is an empty string? This is a great question to ask during an interview.

For the purpose of this problem, we will return 0 when `needle` is an empty string. This is consistent to C's [strstr()](http://www.cplusplus.com/reference/cstring/strstr/) and Java's [indexOf()](https://docs.oracle.com/javase/7/docs/api/java/lang/String.html#indexOf(java.lang.String)).

Example 1:

```
Input: haystack = "hello", needle = "ll"
Output: 2
```

Example 2:

```
Input: haystack = "aaaaa", needle = "bba"
Output: -1
```

Example 3:

```
Input: haystack = "", needle = ""
Output: 0
```

## 思路

兩個指標方別指向頭及 `needle`長度的地方，從頭開始檢查 `substr`，找到目標就回傳 `index`，否則回傳 `-1`。

## Solution
```javascript
/**
 * @param {string} haystack
 * @param {string} needle
 * @return {number}
 */
var strStr = function(haystack, needle) {
    if (needle.length == 0) return 0
    
    let l = 0
    let r = needle.length - 1
    
    while(r < haystack.length) {
        if (haystack.substr(l, needle.length) == needle) {
            return l
        }
        l++
        r++
    }
    return -1
};
```

## Complexity

- Time complexity : O(n)
- Space complexity : O(1)