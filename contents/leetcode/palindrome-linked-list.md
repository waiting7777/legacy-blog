---
id: 234
title: Palindrome Linked List
difficulty: easy
tags: Linked List, Two Pointers, Stack, Recursion
similar:
slug: palindrome-linked-list
---

Given the `head` of a singly linked list, return `true` if it is a palindrome.

## Example 1:

![](https://assets.leetcode.com/uploads/2021/03/03/pal1linked-list.jpg)

```
Input: head = [1,2,2,1]
Output: true
```

## Example 2:

![](https://assets.leetcode.com/uploads/2021/03/03/pal2linked-list.jpg)

```
Input: head = [1,2]
Output: false
```

## Constraints:

- The number of nodes in the list is in the range `[1, 10^5]`
- `0 <= Node.val <= 9`

## Solution:

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
 * @return {boolean}
 */

var isPalindrome = function(head) {
    var middle = findMiddle(head);   // 找尋中點
    var rNode = reverseNode(middle); // 從中點反轉

    // 比對反轉後的node與head前半段是否相等
    while(rNode != null){
        if(head.val != rNode.val) {
            return false;
        }
        head = head.next;
        rNode = rNode.next;
    }
    return true;



    // 使用快慢指針找出中點
    function findMiddle(node){
        var fast = node;
        var slow = node;

        while(fast != null && fast.next != null){
            slow = slow.next;
            fast = fast.next.next;
        }
        return slow;
    }

    // 反轉linked list
    function reverseNode(node){
        if(node==null || node.next==null) return node;
        var prev = null;
        var cur  = node;
        while(cur != null){
            var temp = cur;
            cur = cur.next;
            temp.next = prev;
            prev = temp;
        }
        return prev;
    }
}
```

## Explanation:

先用快慢指針找到中點，再從中點反轉，比對前半段與後半段是否相等。
