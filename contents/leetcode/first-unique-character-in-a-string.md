---
id: 387
title: First Unique Character in a String
difficulty: easy
tags: Hash Table, String, Queue, Counting
similar:
slug: first-unique-character-in-a-string
---

Given a string `s`, **find the first non-repeating character in it and return its index. If it does not exist**, return `-1`.

## Example 1:

```
Input: s = "leetcode"
Output: 0
```

## Example 2:

```
Input: s = "loveleetcode"
Output: 2
```

## Example 3:

```
Input: s = "aabb"
Output: -1
```

## Constraints:

- `1 <= s.length <= 10^5`
- `s` consists of lowercase English letters.

## Solution:

```
/*
 * @param {string} s
 * @return {number}
 */
var firstUniqChar = function(s) {
  const map = {}
  for (let i = 0; i < s.length; i++) {
    if (map[s[i]]) {
      map[s[i]]++
    } else {
      map[s[i]] = 1
    }
  }
  for (let i = 0; i < s.length; i++) {
    if (map[s[i]] === 1) {
      return i
    }
  }
  return -1
}
```

## Explanation:

將字串做成 hash map，每個字母有一個 counter，如果 counter 為 1，則回傳 index，否則就減 1。
