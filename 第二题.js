/**
 * @param {number[]} nums
 * @param {number} target
 * @return {number}
 */
var threeSumClosest = function (nums, target) {
    let res = nums[0] + nums[1] + nums[2]
    let diff = Math.abs(res - target)
    let len = nums.length
    for (let i = 0; i < len; i++) {
        for (let j = 0; j < len; j++) {
            if (j == i) {
                continue
            }
            for (let k = 0; k < len; k++) {
                if (k == i || k == j) {
                    continue
                }
                let tmp = nums[i] + nums[j] + nums[k]
                let diff1 = Math.abs(tmp - target)
                if (diff1 < diff) {
                    res = tmp
                    diff = diff1
                }
            }
        }
    }
    return res
};
let res = threeSumClosest(
    [-3, -2, -5, 3, -4],
    - 1)