---
title: "[LeetCode][Medium] 16. 3Sum Cloest"

tags: LeetCode, LeetCode-Medium

category: Engineering

excerpt: Given an array nums of n integers and an integer target, find three integers in nums such that the sum is closest to target. Return the sum of the three integers. You may assume that each input would have exactly one solution.

date: 2021-04-02

image: ./images/leetcode.jpeg

image_caption: leetcode

author: author1

slug: leetcode-medium-3sum-cloest
---

## 題目

Given an array nums of n integers and an integer target, find three integers in nums such that the sum is closest to target. Return the sum of the three integers. You may assume that each input would have exactly one solution.

Example 1:

```
Input: nums = [-1,2,1,-4], target = 1
Output: 2
Explanation: The sum that is closest to the target is 2. (-1 + 2 + 1 = 2).
```

## 思路

如同 `15. 3sum`，但這次要記錄最接近的值，如果剛好 hit target 就直接 return


## Solution
```javascript
/**
 * @param {number[]} nums
 * @param {number} target
 * @return {number}
 */
var threeSumClosest = function(nums, target) {
    nums.sort((a, b) => a - b)
    let res = nums[0] + nums[1] + nums[2]
    let sum = 0
    let left, right
    
    for (let i = 0; i < nums.length - 2; i++) {
        if (i > 0 && nums[i] == nums[i - 1]) continue
        left = i + 1
        right = nums.length - 1
        
        while(left < right) {
            sum = nums[i] + nums[left] + nums[right]
            if (sum < target) {
                left++
            } else if (sum > target) {
                right--
            } else {
                return sum
            }
            if (Math.abs(sum - target) < Math.abs(res - target)) res = sum
        }
    }
    return res
};
```

## Complexity

- Time complexity : O(n^2)
- Space complexity : O(1)