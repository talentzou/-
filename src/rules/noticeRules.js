export const noticeRules = {
  author: [
    {
      required: true,
      message: "作者名字不能为空",
      trigger: "blur"
    }
  ],
  title: [
    {
      required: true,
      message: "标题不能为空",
      trigger: "blur"
    }
  ],
  timestamp: [
    {
      required: true,
      message: "发布时间不能为空",
      trigger: "blur"
    }
  ]
}
