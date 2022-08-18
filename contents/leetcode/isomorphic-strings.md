---
id: 205
title: Isomorphic Strings
difficulty: easy
tags: Hash Table, String
similar:
slug: isomorphic-strings
---

Given two strings `s` and `t`, determine if they are isomorphic.

Two strings are isomorphic if the characters in `s` can be replaced to get `t`.

All occurrences of a character must be replaced with another character while preserving the order of characters. No two characters may map to the same character but a character may map to itself.

## Example 1:

```
Input: s = "egg", t = "add"
Output: true
```

## Example 2:

```
Input: s = "foo", t = "bar"
Output: false
```

## Example 3:

```
Input: s = "paper", t = "title"
Output: true
```

## Constraints:

- `1 <= s.length, t.length <= 5 * 10^4`
- `t.length == s.length`
- `s` and `t` consist any valid ascii character.

## Solution:

```
/**
 * @param {string} s
 * @param {string} t
 * @return {boolean}
 */

var isIsomorphic = function(s, t) {
    const mapS = {}
    const mapT = {}
    for (let i = 0; i < s.length; i++) {
        if (!mapS[s[i]] && !mapT[t[i]]) {
            mapS[s[i]] = t[i]
            mapT[t[i]] = s[i]
        } else {
            if (mapS[s[i]] != t[i]) {
                return false
            }
        }
    }
    return true
}
```

## Expalnation:

建立兩個 map，當 s[i] t[i] 都第一次出現時，在兩邊建立對應，如果不是第一次出現就檢查是否相同，如果不相同就 return false
