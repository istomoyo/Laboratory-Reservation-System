function dexp(text) {
  const regex =
    /([\u4e00-\u9fa5]+)\n([\u4e00-\u9fa50-9\-，,班 ]+)\n([\d,-]+周)\[(\d+(?:-\d+)?节)]\n([\u4e00-\u9fa5\d]+)/g;

  const matches = [...text.matchAll(regex)];

  const extractedData = matches.map((match) => ({
    course: match[1],
    classInfo: match[2],
    weeks: match[3],
    sessions: match[4],
    classroom: match[5],
  }));
  // console.log("extractedData", extractedData);
  return extractedData;
  // console.log(extractedData);
}
// // 示例调用：
// let data = [
//   ["东北林业大学 王波  教师课表"],
//   [],
//   [null, "星期一", "星期二", "星期三", "星期四", "星期五", "星期六", "星期天"],
//   [
//     "第一二节",
//     null,
//     null,
//     null,
//     null,
//     null,
//     "电磁场与电磁波\n电子信息类2023-06\n13周[01-02节]\n丹青楼901\n",
//   ],
//   [
//     "第三四节",
//     null,
//     "过程控制工程\n自动化2021-01-2\n1-9周[03-04节]\n丹青楼901\n",
//   ],
//   ["第五六节"],
//   ["第七八节"],
//   ["第九十节"],
//   ["第十一十二节"],
//   ["备注:"],
//   ["东北林业大学 边继龙  教师课表"],
//   [],
//   [null, "星期一", "星期二", "星期三", "星期四", "星期五", "星期六", "星期天"],
//   [
//     "第一二节",
//     "数字图像处理\n人工智能2022-01-2\n4-5,7-8周[01-02节]\n丹青楼902\n",
//   ],
//   ["第三四节"],
//   [
//     "第五六节",
//     "程序设计语言基础\n数据科学与大数据技术2024-01-2\n8-15周[05-06节]\n丹青楼902\n\n程序设计语言基础\n数据科学与大数据技术2024-01-2\n16-17周[05-06节]\n丹青楼902\n",
//   ],
//   ["第七八节"],
//   ["第九十节"],
//   ["第十一十二节"],
//   ["备注:"],
//   ["东北林业大学 单颖  教师课表"],
//   [],
//   [null, "星期一", "星期二", "星期三", "星期四", "星期五", "星期六", "星期天"],
//   ["第一二节"],
//   [
//     "第三四节",
//     "数据结构\n人工智能2023-01-2\n1-3,5,7-9周[03-04节]\n丹青楼903\n\n电子设计自动化\n自动化2022-01-4班,电气工程及其自动化2022-01-4\n11-14,16周[03-04节]\n丹青楼903\n",
//   ],
//   [
//     "第五六节",
//     "数据结构\n人工智能2023-01-2\n4,6,9,10,12-15周[05-06节]\n丹青楼903\n",
//   ],
//   ["第七八节"],
//   ["第九十节"],
//   ["第十一十二节"],
//   ["备注:"],
// ];

// console.log(parseSchedule(data));
export default function parseSchedule(data) {
  let teacherCourse = [];
  const weekString = [
    "第一二节",
    "第三四节",
    "第五六节",
    "第七八节",
    "第九十节",
    "第十一十二节",
  ];
  const chunkSize = 10;
  let l = data.length;
  let result = [];
  for (let i = 0; i < data.length; i += chunkSize) {
    result.push(data.slice(i, i + chunkSize)); // 使用 slice 方法分割数组
  }
  result.forEach((arr) => {
    // const course = {}
    // console.log();
    const teacherName = arr[0][0].split(" ")[1];
    for (let j of [3, 4, 5, 6, 7, 8]) {
      //   console.log(`arr[${j}]`,arr[j]);
      arr[j].forEach((a, index) => {
        if (a != "" && a != null && !weekString.includes(a)) {
          teacherCourse.push({ teacherName, course: dexp(a) });
        }
      });
    }
  });
  // return result;
  console.log(teacherCourse);
}
