---
id: 328
title: Odd Even Linked List
difficulty: medium
tags: Linked List
similar:
slug: odd-even-linked-list
---

Given the `head` of a singly linked list, group all the nodes with odd indices together followed by the nodes with even indices, and return the _reordered list_.

The **first** node is considered **odd**, and the **second** node is **even**, and so on.

Note that the relative order inside both the even and odd groups should remain as it was in the input.

You must solve the problem in `O(1)` extra space complexity and `O(n)` time complexity.

## Example 1:

![](https://assets.leetcode.com/uploads/2021/03/10/oddeven-linked-list.jpg)

```
Input: head = [1,2,3,4,5]
Output: [1,3,5,2,4]
```

## Example 2:

![](https://assets.leetcode.com/uploads/2021/03/10/oddeven2-linked-list.jpg)

```
Input: head = [2,1,3,5,6,4,7]
Output: [2,3,6,7,1,5,4]
```

## Constraints:

- The number of nodes in the list is in the range `[0, 10^4]`
- `-10^6 <= Node.val <= 10^6`

## Solution

```
/**
 * Definition for singly-linked list.
 * function ListNode(val) {
 *     this.val = val;
 *     this.next = null;
 * }
 */
/**
 * @param {ListNode} head
 * @return {ListNode}
 */

var oddEvenList = function(head) {
    if(!head || !head.next) return head;

    var odd = head;
    var even = head.next;
    var evenHead = even;
    while(even && even.next) {
        odd.next = odd.next.next;
        even.next = even.next.next;
        odd = odd.next;
        even = even.next;
    }
    odd.next = evenHead;
    return head;
}
```

## Explanation

將 head 分成兩個部分，odd 和 even。跑完整個 list 再把 odd 和 even 連接起來。
