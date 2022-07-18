---
id: 54
title: Spiral Matrix
difficulty: medium
tags: Array, Matrix, Simulation
similar:
slug: spiral-matrix
---

Given an `m x n` `matrix`, eturn all elements of the `matrix` in spiral order.

## Example 1:

![](https://assets.leetcode.com/uploads/2020/11/13/spiral1.jpg)

```
Input: matrix = [[1,2,3],[4,5,6],[7,8,9]]
Output: [1,2,3,6,9,8,7,4,5]
```

## Example 2:

![](https://assets.leetcode.com/uploads/2020/11/13/spiral.jpg)

```
Input: matrix = [[1,2,3,4],[5,6,7,8],[9,10,11,12]]
Output: [1,2,3,4,8,12,11,10,9,5,6,7]
```

## Constraints:

- `m == matrix.length`
- `n == matrix[i].length`
- `1 <= m, n <= 10`
- `-100 <= matrix[i][j] <= 100

## Solution

```
/**
 * @param {number[][]} matrix
 * @return {number[]}
 */
var spiralOrder = function(matrix) {
    let m = matrix.length
    let n = matrix[0].length
    const res = []
    const move = {
        x: 0,
        y: 1
    }
    let x = 0, y = 0

    while (res.length < m * n) {
        res.push(matrix[x][y])
        matrix[x][y] = 0

        if (!matrix[x + move.x] || !matrix[x + move.x][y + move.y]) {
            if (move.x == 1) {
                move.x = 0
                move.y = -1
            } else if (move.x == -1) {
                move.x = 0
                move.y = 1
            } else if (move.y == 1) {
                move.x = 1
                move.y = 0
            } else {
                move.x = -1
                move.y = 0
            }
        }
        x = x + move.x
        y = y + move.y
    }
    return res
};
```

## Explanation

從 [0, 0] 開始遍歷 array，將數值放入 res，然後將數值設為 0，並且檢查是否可以繼續遍歷，如果不能繼續遍歷，就改變方向，並且更新 x, y。
