/**
 * @param {number} 状态码
 * @param {string} 状态消息
 * @return {boolean} 
 */
export const Notification = (code, msg) => {
  if (code == 204) {
    ElNotification({
      title: "Success",
      message: msg,
      duration:2000,
      type: "success"
    })
  } else if(code==200){
    ElNotification({
      title: "Success",
      message: msg,
      duration:2000,
      type: "success"
    })
  
  }else {
    ElNotification({
        title: "Error",
        message: msg,
        duration:2000,
        type: "error"
      })
      return false
  }
  return true
}
