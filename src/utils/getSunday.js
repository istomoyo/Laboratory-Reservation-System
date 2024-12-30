export default function getSundays(start_date, end_date) {
  let sundays = [];

  // 将日期字符串转换为 Date 对象
  let start = new Date(start_date);
  let end = new Date(end_date);

  // 如果起始日期的星期不是星期天，跳到下一个星期天
  start.setDate(start.getDate() + ((7 - start.getDay()) % 7));

  // 循环遍历从起始日期到结束日期的每个星期天
  while (start <= end) {
    sundays.push(new Date(start));
    start.setDate(start.getDate() + 7); // 下一周的星期天
  }

  return sundays;
}
