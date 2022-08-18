---
id: 1338
title: Reduce Array Size to The Half
difficulty: medium
tags: Array, Hash Table, Greedy, Sorting, Heap (Priority Queue)
similar:
slug: reduce-array-size-to-the-half
---

You are given an integer array `arr`. You can choose a set of integers and remove all the occurrences of these integers in the array.

Return the _minimum size of the set so that **at least** half of the integers of the array are removed._

## Example 1:

```
Input: arr = [3,3,3,3,5,5,5,2,2,7]
Output: 2
Explanation: Choosing {3,7} will make the new array [5,5,5,2,2] which has size 5 (i.e equal to half of the size of the old array).
Possible sets of size 2 are {3,5},{3,2},{5,2}.
Choosing set {2,7} is not possible as it will make the new array [3,3,3,3,5,5,5] which has size greater than half of the size of the old array.
```

## Example 2:

```
Input: arr = [7,7,7,7,7,7]
Output: 1
Explanation: The only possible set you can choose is {7}. This will make the new array empty.
```

## Constraints:

- `2 <= arr.length <= 10^5`
- `arr.length` is even
- `1 <= arr[i] <= 10^5`

## Solution:

```
/**
 * @param {number[]} arr
 * @return {number}
 */
var minSetSize = function(arr) {
    const n = arr.length
    const map = {}

    for (let i = 0; i < n; i++) {
        if (map[arr[i]]) {
            map[arr[i]] += 1
        } else {
            map[arr[i]] = 1
        }
    }
    const sortMap = Object.values(map).sort((a, b) => b - a)

    let temp = n
    let counter = 0

    while (temp > (n / 2)) {
        temp -= sortMap[counter]
        counter++
    }
    return counter
};
```

## Explanation:

先用 hash 算出每個元素的出現次數，然後照次數排序，再從多的開始刪除直到超過一半，並用 counter 計算出要刪除的元素數量。
