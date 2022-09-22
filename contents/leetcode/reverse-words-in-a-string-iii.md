---
id: 557
title: Reverse Words in a String III
difficulty: easy
tags: Two Pointers, String
similar:
slug: reverse-words-in-a-string-iii
---

Given a string `s`, reverse the order of characters in each word within a sentence while still preserving whitespace and initial word order.

## Example 1:

```
Input: s = "Let's take LeetCode contest"
Output: "s'teL ekat edoCteeL tsetnoc"
```

## Example 2:

```
Input: s = "God Ding"
Output: "doG gniD"
```

## Constraints:

- `1 <= s.length <= 5 * 104`
- `s` contains printable **ASCII** characters.
- `s` does not contain any leading or trailing spaces.
- There is **at least one** word in `s`.
- All the words in `s` are separated by a single space.

## Solution:

#### 左右指針

```
/**
 * @param {string} s
 * @return {string}
 */
var reverseWords = function(s) {
    let left = 0
    let right = 0
    let r = []

    for (let i = 0; i < s.length; i++) {
        if (s[i] == " " || i == s.length - 1) {
            if (i == s.length - 1) {
                right = i
            } else {
                right = i - 1
            }
            while (left <= right) {
                r[left] = s[right]
                r[right] = s[left]
                left++
                right--
            }
            if (i != s.length - 1) {
                r[i] = " "
            }
            left = i + 1
        }
    }

    return r.join("")
};
```

#### 快速語法

```
/**
 * @param {string} s
 * @return {string}
 */
var reverseWords = function(s) {
    return s.split(' ').map(w => w.split('').reverse().join('')).join(' ')
};
```

## Expalnation:

以左右指針夾字做反轉，遇到空白再跳往下個字。
快速語法的畫就是將原字串用 `' '` 切開然後針對每個 word 做 `reverse` 再合併。
