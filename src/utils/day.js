// export default function getWeekInfo(inputDate = new Date()) {
//   const now = new Date(inputDate);
//   const daysOfWeek = [
//     "星期日",
//     "星期一",
//     "星期二",
//     "星期三",
//     "星期四",
//     "星期五",
//     "星期六",
//   ];

//   // 获取今天是周几
//   const today = {
//     day: daysOfWeek[now.getDay()],
//     date: now.toISOString().split("T")[0],
//     numDay: now.getDay(),
//     //   toISOString() 方法将日期转换为 ISO 8601 格式的字符串，例如 2024-12-21T14:30:00.000Z。
//   };

//   // 获取本周日期
//   const startOfWeek = new Date(now);
//   startOfWeek.setDate(now.getDate() - now.getDay());
//   const weekDates = Array.from({ length: 7 }, (_, i) => {
//     const date = new Date(startOfWeek);
//     date.setDate(startOfWeek.getDate() + i);
//     return {
//       day: daysOfWeek[i],
//       date: date.toISOString().split("T")[0].slice(5),
//       year: date.toISOString().split("T")[0].slice(0, 4),
//     };
//   });

//   return { today, weekDates };
// }

export default function getWeekInfo(inputDate = new Date()) {
  const now = new Date(inputDate);
  const daysOfWeek = [
    "星期一",
    "星期二",
    "星期三",
    "星期四",
    "星期五",
    "星期六",
    "星期日",
  ];

  // 格式化日期
  const formatDate = (date) => date.toISOString().split("T")[0];

  // 获取今天的信息
  const today = {
    day: daysOfWeek[(now.getDay() + 6) % 7], // 星期调整，星期日变为最后一天
    date: formatDate(now),
    numDay: ((now.getDay() + 6) % 7) + 1, // 数字调整，星期一为 1
  };

  // 获取本周日期
  const startOfWeek = new Date(now);
  const currentDay = (now.getDay() + 6) % 7; // 星期调整
  startOfWeek.setDate(now.getDate() - currentDay);
  const weekDates = Array.from({ length: 7 }, (_, i) => {
    const date = new Date(startOfWeek);
    date.setDate(startOfWeek.getDate() + i);
    return {
      day: daysOfWeek[i],
      date: formatDate(date).slice(5), // 格式化为 MM-DD
      year: formatDate(date).slice(0, 4), // 提取年份
    };
  });

  return { today, weekDates };
}

// 在其他地方引入
// import { getWeekInfo } from './path/to/this/file.js';
// const weekInfo = getWeekInfo(new Date());
