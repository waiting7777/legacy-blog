---
title: "[LeetCode][Medium] 19. Remove Nth Node From End of List"

tags: LeetCode, LeetCode-Medium

category: Engineering

excerpt: Given the head of a linked list, remove the nth node from the end of the list and return its head.

date: 2021-04-02

image: ./images/leetcode.jpeg

image_caption: leetcode

author: author1

slug: leetcode-medium-remove-nth-node-from-end-of-list
---

## 題目

Given the `head` of a linked list, remove the `nth` node from the end of the list and return its head.

A mapping of digit to letters (just like on the telephone buttons) is given below. Note that 1 does not map to any letters.

Example 1:
![alt](https://assets.leetcode.com/uploads/2020/10/03/remove_ex1.jpg)

```
Input: head = [1,2,3,4,5], n = 2
Output: [1,2,3,5]
```
Example 2:

```
Input: head = [1], n = 1
Output: []
```

Example 3:

```
Input: head = [1,2], n = 1
Output: [1]
```

## 思路

用左右雙指針，先將右邊移動直到雙方相差 `n`，再讓左右同時移動直到右邊到底為止，這時左邊就會是後面數來第`n`個。


## Solution
```javascript
/**
 * Definition for singly-linked list.
 * function ListNode(val, next) {
 *     this.val = (val===undefined ? 0 : val)
 *     this.next = (next===undefined ? null : next)
 * }
 */
/**
 * @param {ListNode} head
 * @param {number} n
 * @return {ListNode}
 */
var removeNthFromEnd = function(head, n) {
    var h = new ListNode(0)
    var l = h
    var r = h
    
    h.next = head
    
    for (var i = 0; i < n + 1; i++) {
        r = r.next
    }
    
    while(r !== null) {
        l = l.next
        r = r.next
    }
    
    l.next = l.next.next
    
    return h.next
};
```

## Complexity

- Time complexity : O(n)
- Space complexity : O(1)