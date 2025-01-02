export default function weekArr(arr) {
  let result = [];
  let temp = [];

  for (let i = 0; i < arr.length; i++) {
    // 如果当前元素是第一个元素或当前元素与前一个元素不连续
    if (i === 0 || arr[i] !== arr[i - 1] + 1) {
      // 如果 temp 数组已有元素，合并成范围字符串
      if (temp.length > 1) {
        result.push(`${temp[0]}~${temp[temp.length - 1]}`);
      } else if (temp.length === 1) {
        result.push(temp[0]);
      }
      // 重新开始新的连续序列
      temp = [arr[i]];
    } else {
      temp.push(arr[i]);
    }
  }

  // 最后处理一次 temp 中的元素
  if (temp.length > 1) {
    result.push(`${temp[0]}~${temp[temp.length - 1]}`);
  } else if (temp.length === 1) {
    result.push(temp[0]);
  }

  return result;
}
