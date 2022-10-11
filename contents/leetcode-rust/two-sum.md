---
id: 1
title: Two Sum
difficulty: easy
tags: Array, Hash Table
similar:
slug: two-sum
---

Given an array of integers `nums` and an integer `target`, return _indices of the two numbers such that they add up to `target`_.

You may assume that each input would have **exactly one solution**, and you may not use the same element twice.

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

## Constraints

- `2 <= nums.length <= 104`
- `-109 <= nums[i] <= 109`
- `-109 <= target <= 109`
- **Only one valid answer exists.**

## Solution:

```rust
use std::collections::HashMap;

impl Solution {
    pub fn two_sum(nums: Vec<i32>, target: i32) -> Vec<i32> {
        let len_ns = nums.len();
        let mut num_to_idx: HashMap<i32, usize> = HashMap::with_capacity(len_ns);
        for (idx, num) in nums.into_iter().enumerate() {
            let expected_sum = target - num;
            match num_to_idx.get(&expected_sum) {
                Some(&prev_idx) => {
                    return vec![prev_idx as i32, idx as i32];
                }
                None => {
                    num_to_idx.insert(num, idx);
                }
            }
        }
        unreachable!()
    }
}
```

## Explanation:

用 hashmap ，如果 `target - num` 不在 key 裡就把值跟 `index` 存下來，這樣下次碰到 match 的值就會拿到剛剛存的 key，再 return 即可，
