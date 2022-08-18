---
id: 206
title: Reverse Linked List
difficulty: easy
tags: Linked List, Recursion
similar:
slug: reverse-linked-list
---

Given the `head` of a singly linked list, reverse the list.

## Example 1:

![](https://assets.leetcode.com/uploads/2021/02/19/rev1ex1.jpg)

```
Input: head = [1,2,3,4,5]
Output: [5,4,3,2,1]
```

## Example 2:

![](https://assets.leetcode.com/uploads/2021/02/19/rev1ex2.jpg)

```
Input: head = [1,2]
Output: [2,1]
```

## Example 3:

```
Input: head = []
Output: []
```

## Constraints:

- The number of nodes in the list is in the range `[0, 5000]`.
- -5000 <= Node.val <= 5000

## Solution:

```
/**
 * Definition for singly-linked list.
 * public class ListNode {
 *     int val;
 *     ListNode next;
 *     ListNode(int x) {
 *         val = x;
 *         next = null;
 *     }
 * }
 */
/**
 * @param {ListNode} head
 * @return {ListNode}
 */
var reverseList = function(head) {
    var newHead = null;
    var tmp = null;
    while (head) {
        tmp = head.next;
        head.next = newHead;
        newHead = head;
        head = tmp;
    }
    return newHead;
};
```

## Explaintion:

Nope.
