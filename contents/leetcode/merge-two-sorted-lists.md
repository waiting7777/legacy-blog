---
id: 21
title: Merge Two Sorted Lists
difficulty: easy
tags: Linked List, Recursion
similar:
slug: merge-two-sorted-lists
---

You are given the heads of two sorted linked lists `list1` and `list2`.

Merge the two lists in a one **sorted** list. The list should be made by splicing together the nodes of the first two lists.

Return the head of the merged list.

## Example 1:

![](https://assets.leetcode.com/uploads/2020/10/03/merge_ex1.jpg)

```
Input: list1 = [1,3,5], list2 = [2,4,6]
Output: [1,2,3,4,5,6]
```

## Example 2:

```
Input: list1 = [] , list2 = []
Output: []
```

## Example 3:

```
Input: list1 = [], list2 = [0]
Output: [0]
```

## Constraints:

- The number of nodes in both lists is in the range `[0, 50]`.
- `-100 <= node.val <= 100`
- Both the lists are sorted in non-decreasing order.

## Solution

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
 * @param {ListNode} list1
 * @param {ListNode} list2
 * @return {ListNode}
 */
var mergeTwoLists = function(list1, list2) {
    var head = new ListNode(0);
    var cur = head;
    while (list1 && list2) {
        if (list1.val < list2.val) {
            cur.next = list1;
            list1 = list1.next;
        } else {
            cur.next = list2;
            list2 = list2.next;
        }
        cur = cur.next;
    }
    cur.next = list1 || list2;
    return head.next;
}
```

## Expalnation

判斷 `list1.val` 與 `list2.val` 將 next 接往比較小的那邊，反覆直到兩個 list 都為空。
