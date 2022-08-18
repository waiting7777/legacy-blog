---
id: 14
title: Longest Common Prefix
difficulty: easy
tags: String
similar:
slug: longest-common-prefix
---

Write a function to find the longest common prefix string amongst an array of strings.

If there is no common prefix, return an empty string "".

## Example 1:

```
Input: ["flower","flow","flight"]
Output: "fl"
```

## Example 2:

```
Input: ["dog","racecar","car"]
Output: ""
```

## Constraints:

- `1 <= strs.length <= 200`
- `0 <= strs[i].length <= 200`
- `strs[i]` consists of only lower-case English letters.

## Solution:

```
/**
 * @param {string[]} strs
 * @return {string}
 */

var longestCommonPrefix = function(strs) {
    if (strs.length == 0) return ""
    if (strs.length == 1) return strs[0]
    let res = strs[0]
    for (let i = 1; i < strs.length; i++) {
        while (strs[i].indexOf(res) != 0) {
            res = res.slice(0, -1)
            if (res == "") return ""
        }
    }
    return res
}
```

## Expalnation:

先預設第一個 string 是答案，然後依序往後比對，只要 indexOf(res) 不是 0，就代表它不是後面項目的 prefix，那就把 res 後面的字元去掉，直到空字串或是找到答案為止。
