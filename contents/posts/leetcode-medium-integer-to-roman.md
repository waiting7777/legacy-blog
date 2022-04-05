---
title: "[LeetCode][Medium] 12. Integer to Roman"

tags: LeetCode, LeetCode-Medium

category: Engineering

excerpt: Roman numerals are represented by seven different symbols I, V, X, L, C, D and M.

date: 2021-04-01

image: ./images/leetcode.jpeg

image_caption: leetcode

author: author1

slug: leetcode-medium-integer-to-roman
---

## 題目

Roman numerals are represented by seven different symbols: I, V, X, L, C, D and M.

```
Symbol       Value
I             1
V             5
X             10
L             50
C             100
D             500
M             1000
```

For example, 2 is written as II in Roman numeral, just two one's added together. 12 is written as XII, which is simply X + II. The number 27 is written as XXVII, which is XX + V + II.

Roman numerals are usually written largest to smallest from left to right. However, the numeral for four is not IIII. Instead, the number four is written as IV. Because the one is before the five we subtract it making four. The same principle applies to the number nine, which is written as IX. There are six instances where subtraction is used:

- I can be placed before V (5) and X (10) to make 4 and 9. 
- X can be placed before L (50) and C (100) to make 40 and 90. 
- C can be placed before D (500) and M (1000) to make 400 and 900.

Given an integer, convert it to a roman numeral.

## 思路

題目要求輸入數字輸出羅馬數字字串，在羅馬數字的規則裡 4, 9, 40, 90, 400, 900 比較特殊要用減法，而其他用加法即可，然後不超過 3999。
而我的想法是，把數字拆分成單獨的位數去做轉換，比如 `num = 1994` 其實就是 `MC(1000)` + `CM(900` + `XC(90)` + `IV(4)` 
所以先寫個單位數轉換的 `function` 並且把對應的字串丟進去，轉換完成後串起來即可。


## Solution
```javascript
/**
 * @param {number} num
 * @return {string}
 */
var intToRoman = function(num) {
    const symbols = ['I', 'V', 'X', 'L', 'C', 'D', 'M']
    let symbolCounter = 0
    let res = ''
    while(num > 0) {
        const temp = num % 10
        res = `${roman(temp, symbols[symbolCounter], symbols[symbolCounter + 1], symbols[symbolCounter + 2])}${res}`
        num = (num - temp) / 10
        symbolCounter += 2 // 羅馬數字有 1, 5，每進一次 10 進位會前進兩個符號
    }
    return res
};

var roman = function(n, symbol1, symbol5, symbol10) {
    // 4 跟 9 是減法直接特殊解
    if (n == 9) return `${symbol1}${symbol10}`
    if (n == 4) return `${symbol1}${symbol5}`
    
    let res = ''
    
    // 以5當基準，1, 10, 100, 1000 的做法都不變，再看有沒有大於5就好
    for (let i = 0; i < n % 5; i++) {
        res += `${symbol1}`
    }
    
    if (n >= 5) {
        res = `${symbol5}${res}`
    }
    return res
}
```

## Complexity

- Time complexity : O(log(n))
- Space complexity : O(1)