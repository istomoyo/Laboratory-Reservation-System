export default function throttle(fn, delay) {
  let lastTime = 0; // 上次执行的时间
  return function (...args) {
    const now = Date.now();
    if (now - lastTime >= delay) {
      // 如果距离上次执行的时间超过指定的间隔
      fn.apply(this, args); // 执行函数
      lastTime = now; // 更新上次执行的时间
    }
  };
}
