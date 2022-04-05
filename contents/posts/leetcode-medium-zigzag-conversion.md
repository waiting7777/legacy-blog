---
title: "[LeetCode][Medium] 6. ZigZag Conversion"

tags: LeetCode, LeetCode-Medium

category: Engineering

excerpt: The string "PAYPALISHIRING" is written in a zigzag pattern on a given number of rows like this (you may want to display this pattern in a fixed font for better legibility)

date: 2021-04-01

image: ./images/leetcode.jpeg

image_caption: leetcode

author: author1

slug: leetcode-medium-zigzag-conversion
---
## 題目

The string `PAYPALISHIRING` is written in a zigzag pattern on a given number of rows like this: (you may want to display this pattern in a fixed font for better legibility)

```
P   A   H   N
A P L S I I G
Y   I   R
```

And then read line by line: "PAHNAPLSIIGYIR"

Write the code that will take a string and make this conversion given a number of rows:

```
string convert(string s, int numRows);
```
Example 1:

```
Input: s = "PAYPALISHIRING", numRows = 3
Output: "PAHNAPLSIIGYIR"
```

Example 2:

```
Input: s = "PAYPALISHIRING", numRows = 4
Output: "PINALSIGYAHRPI"
Explanation:
P     I    N
A   L S  I G
Y A   H R
P     I
```

Example 3:

```
Input: s = "A", numRows = 1
Output: "A"
```
## 思路

題目要求將原文轉換為鋸齒狀排列，認真看範例的話可以找到規律，例如頭尾兩列每個字元的間隔都是 `numRows + numRows - 2`
再來中間列的話則需要補上 `(numRos - i - 1) * 2` 的鋸齒字元，如此一來就可以填出答案的字串，
最後再補上特殊條件判斷，當字串長度小於 3 以及 numRows 小於 2 時，是無法鋸齒排列的，直接回傳原字串即可。

## Solution
```javascript
/**
 * @param {string} s
 * @param {number} numRows
 * @return {string}
 */
var convert = function(s, numRows) {
    if (s.length < 3 || numRows < 2) return s
    let res = ''
    for (var i = 0; i < numRows; i++) {
        if (i == 0 || i == numRows - 1) {
            for (var j = i; j < s.length; j += (numRows + numRows - 2)) {
                res += s[j]
            }
        }
        else {
            for (var j = i; j < s.length; j += (numRows + numRows - 2)) {
                res += s[j]
                if (s[j + (numRows - i - 1)*2]) {
                    res += s[j + (numRows - i - 1)*2]
                }
            }
        }
    }
    return res
};
```

## Complexity

- Time complexity : O(n)
- Space complexity : O(n)