// 判断当前时间是否晚于指定时间段的结束时间
export default function isAfterTimeRange(timeString) {
  // 输入验证，确保 timeString 格式正确
  if (typeof timeString !== "string" || !timeString.includes("~")) {
    throw new Error(
      'Invalid time string format. Expected format: "YYYY-MM-DD HH:MM~HH:MM"'
    );
  }

  // 解析输入的时间段
  const [dateTimeRange, endTime] = timeString.split("~");
  const [date, startTime] = dateTimeRange.split(" ");

  // 构建开始时间和结束时间的 Date 对象
  const startDate = new Date(`${date} ${startTime}`);
  const endDate = new Date(`${date} ${endTime}`);

  // 获取当前时间
  const currentTime = new Date();

  // 判断当前时间是否晚于结束时间
  return currentTime > startDate;
}

// // // 测试函数
// const timeString = "2024-11-18 9:55~11:30";
// console.log(isAfterTimeRange(timeString)); // 输出 true 或 false
