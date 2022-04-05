---
title: "[LeetCode][Medium] 17. Letter Combinations of a Phone Number"

tags: LeetCode, LeetCode-Medium

category: Engineering

excerpt: Given a string containing digits from 2-9 inclusive, return all possible letter combinations that the number could represent. Return the answer in any order.

date: 2021-04-02

image: ./images/leetcode.jpeg

image_caption: leetcode

author: author1

slug: leetcode-medium-letter-combinations-of-a-phone-number
---

## 題目

Given a string containing digits from 2-9 inclusive, return all possible letter combinations that the number could represent. Return the answer in any order.

A mapping of digit to letters (just like on the telephone buttons) is given below. Note that 1 does not map to any letters.

![alt](http://upload.wikimedia.org/wikipedia/commons/thumb/7/73/Telephone-keypad2.svg/200px-Telephone-keypad2.svg.png)

## 思路

寫一個縫合矩陣的函式，然後把數字字串輸入，合成出最終結果。


## Solution
```javascript
/**
 * @param {string} digits
 * @return {string[]}
 */
var letterCombinations = function(digits) {
    const letterMap = {
        '': [],
        '2': ['a', 'b', 'c'],
        '3': ['d', 'e', 'f'],
        '4': ['g', 'h', 'i'],
        '5': ['j', 'k', 'l'],
        '6': ['m', 'n', 'o'],
        '7': ['p', 'q', 'r', 's'],
        '8': ['t', 'u', 'v'],
        '9': ['w', 'x', 'y', 'z']
    }

    if (digits.length < 2) return letterMap[digits]
    
    let res = []
    
    for (var i = 0; i < digits.length; i++) {
        res = zip(res, letterMap[digits[i]])
    }
    return res
};

var zip = function(a, b) {
    const res = []
    if (a.length < 1) return b
    
    for (var i = 0; i < a.length; i++) {
        for(var j = 0; j < b.length; j++) {
            res.push(a[i] + b[j])
        }
    }
    return res
}
```

## Complexity

- Time complexity : O(n^2)
- Space complexity : O(n)