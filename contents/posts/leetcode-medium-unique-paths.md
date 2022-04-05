---
title: "[LeetCode][Medium] 62. Unique Paths"

tags: LeetCode, LeetCode-Medium

category: Engineering

excerpt: A robot is located at the top-left corner of a m x n grid (marked 'Start' in the diagram below).

date: 2021-04-03

image: ./images/leetcode.jpeg

image_caption: leetcode

author: author1

slug: leetcode-medium-unique-paths
---

## 題目

A robot is located at the top-left corner of a `m x n` grid (marked 'Start' in the diagram below).

The robot can only move either down or right at any point in time. The robot is trying to reach the bottom-right corner of the grid (marked 'Finish' in the diagram below).

How many possible unique paths are there?

 

Example 1:

![alt](https://assets.leetcode.com/uploads/2018/10/22/robot_maze.png)

```
Input: m = 3, n = 7
Output: 28
```

Example 2:

```
Input: m = 3, n = 2
Output: 3
Explanation:
From the top-left corner, there are a total of 3 ways to reach the bottom-right corner:
1. Right -> Down -> Down
2. Down -> Down -> Right
3. Down -> Right -> Down
```

Example 3:

```
Input: m = 7, n = 3
Output: 28
```
Example 4:

```
Input: m = 3, n = 3
Output: 6
```

## 思路

dp[i][j] 代表到達該點的路徑數量。而該點可以從左邊或上面到達 也就是 dp[i][j] = dp[i - 1][j] + dp[i][j - 1] 。


## Solution
```javascript
/**
 * @param {number} m
 * @param {number} n
 * @return {number}
 */
var uniquePaths = function(m, n) {
    var dp = new Array(m)
    
    if (!m || !n) return 0
    
    for (var i = 0; i < m; i++) {
        dp[i] = new Array(n)
        for (var j = 0; j < n; j++) {
            if (j > 0 && i > 0) dp[i][j] = dp[i - 1][j] + dp[i][j - 1]
            else if (j > 0 && i === 0) dp[i][j] = dp[i][j - 1]
            else if (j === 0 && i > 0) dp[i][j] = dp[i - 1][j]
            else dp[i][j] = 1
        }
    }
    return dp[m - 1][n - 1]
};
```

## Complexity

- Time complexity : O(m * n)
- Space complexity : O(m * n)