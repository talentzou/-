export const constantRoutes = [
  //主页
  {
    path: "/",
    name: "layout",
    component: () => import("@/layout/layout.vue"),
    hidden: false,
    redirect: "/home",
    meta: {
      title: "首页",
      icon: ""
    },
    children: [
      {
        path: "home",
        name: "home",
        component: () => import("@/views/Home/Home.vue"),
        meta: {
          title: "首页",
          icon: "home"
        }
      }
    ]
  },
  //登录
  {
    path: "/login",
    name: "login",
    hidden: true,
    component: () => import("@/views/login/login.vue")
  },
  
]
// //404
export const anyRoute = {
  path: "/:pathMath(.*)",
  name: "404",
  hidden: true,
  component: () => import("@/views/404/notFound.vue")
}
