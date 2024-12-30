export default function deepUnique(arr) {
    const seen = new Set();
    return arr.filter(item => {
      const key = JSON.stringify(item); // 将对象转换为字符串
      if (!seen.has(key)) {
        seen.add(key);
        return true;
      }
      return false;
    });
  }  
