---
id: 1
title: Two Sum
difficulty: easy
tag: array, hash table
similar:
slug: two-sum
---

Given an array of integers `nums` and an integer `target`, return _indices of the two numbers such that they add up to `target`._

You may assume that each input would have exactly **one solution**, and you may not use the same element twice.

You can return the answer in any order.

## Example 1:

```
Input: nums = [2,7,11,15], target = 9
Output: [0,1]
Explanation: Because nums[0] + nums[1] == 9, we return [0, 1].
```

## Example 2:

```
Input: nums = [3,2,4], target = 6
Output: [1,2]
```

## Example 3:

```
Input: nums = [3,3], target = 6
Output: [0,1]
```

## Constraints:

- `2 <= nums.length <= 10^4`
- `-10^9 <= nums[i] <= 10^9`
- `-10^9 <= target <= 10^9`
- **Only one valid answer exists.**

## Solution

```
/**
 * @param {number[]} nums
 * @param {number} target
 * @return {number[]}
 */
var twoSum = function(nums, target) {
  var hash = {};
  var len = nums.length;
  for (var i = 0; i < len; i++) {
    if (nums[i] in hash) return [hash[nums[i]], i];
    hash[target - nums[i]] = i
  }
  return [-1, -1];
};
```

## Explain:

none.
