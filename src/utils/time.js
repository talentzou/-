import DayJs from "dayjs"

export const FormatTime = (time) => {
  return DayJs(time).format("YYYY-MM-DD")
}
