// 提供一个用来处理日期时间的工具模块

import dayjs from 'dayjs'

// 引入插件relativeTime相对时间
import rTime from 'dayjs/plugin/relativeTime'

// 引入中文语言包
import 'dayjs/locale/zh-cn'

dayjs.locale('zh-cn')
dayjs.extend(rTime)
export const relativeTime = function (yourTime) {
  return dayjs().to(dayjs(yourTime))
}
