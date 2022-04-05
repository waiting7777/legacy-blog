---
title: "[LeetCode][Medium] 77. Combinations"

tags: LeetCode, LeetCode-Medium

category: Engineering

excerpt: Given two integers n and k, return all possible combinations of k numbers out of the range [1, n].

date: 2021-04-04

image: ./images/leetcode.jpeg

image_caption: leetcode

author: author1

slug: leetcode-medium-combinations
---

## 題目

Given two integers `n` and `k`, return all possible combinations of `k` numbers out of the range `[1, n]`.

You may return the answer in **any order**.

Example 1:

```
Input: n = 4, k = 2
Output:
[
  [2,4],
  [3,4],
  [2,3],
  [1,2],
  [1,3],
  [1,4],
]
```

Example 2:

```
Input: n = 1, k = 1
Output: [[1]]
```

## 思路

dfs 的方式遞迴，有數字填入時，`k - 1`，當 `k = 0` 時結束。


## Solution
```javascript
/**
 * @param {number} n
 * @param {number} k
 * @return {number[][]}
 */
var combine = function(n, k) {
    const res = []
    
    var dfs = function(n, k, arr) {
    
        if (k === 0) return res.push(arr)
        if (k > n) return

        dfs(n - 1, k - 1, [...arr, n])
        dfs(n - 1, k, arr)
    }
    
    dfs(n, k, [])
    
    return res
};


```

## Complexity

- Time complexity : O(n * k)
- Space complexity : O(n * k)