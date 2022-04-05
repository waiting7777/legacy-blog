---
title: "[LeetCode][Medium] 15. 3Sum"

tags: LeetCode, LeetCode-Medium

category: Engineering

excerpt: Given an integer array nums, return all the triplets [nums[i], nums[j], nums[k]] such that i != j, i != k, and j != k, and nums[i] + nums[j] + nums[k] == 0.

date: 2021-04-02

image: ./images/leetcode.jpeg

image_caption: leetcode

author: author1

slug: leetcode-medium-3sum
---

## 題目

Given an integer array nums, return all the triplets [nums[i], nums[j], nums[k]] such that i != j, i != k, and j != k, and nums[i] + nums[j] + nums[k] == 0.

Notice that the solution set must not contain duplicate triplets.

Example 1:

```
Input: nums = [-1,0,1,2,-1,-4]
Output: [[-1,-1,2],[-1,0,1]]
Example 2:
```

```
Input: nums = []
Output: []
```

Example 3:

```
Input: nums = [0]
Output: []
```

## 思路

先排序，接著用雙指針求解，要注意重複的數字


## Solution
```javascript
/**
 * @param {number[]} nums
 * @return {number[][]}
 */
var threeSum = function(nums) {
    if (nums.length < 3) return []
    
    nums.sort((a,b) => a - b);
    const triplets = [];

    for(let i=0; i < nums.length - 2; i++){
        if(nums[i] != nums[i-1]){ // making sure our solution set does not contain duplicate triplets
            let left = i + 1;
            let right = nums.length - 1;

            while (left < right){
                const currentSum = nums[i] + nums[left] + nums[right];
                if (currentSum === 0){
                    triplets.push([nums[i], nums[left], nums[right]]);
                    while(nums[left] == nums[left + 1]) left ++
                    while(nums[right] == nums[right - 1]) right -- // making sure our solution set does not contain duplicate triplets
                    left ++;
                    right --;
                } else if(currentSum < 0) {
                    left ++
                } else if(currentSum > 0){
                    right --
                }
            }
        }
    }
    return triplets
}
```

## Complexity

- Time complexity : O(n^2)
- Space complexity : O(1)