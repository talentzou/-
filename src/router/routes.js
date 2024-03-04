export const routes = [
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

  //宿舍管理
  {
    path: "/DM",
    name: "dormitory-management",
    hidden: false,
    component: () => import("@/layout/layout.vue"),
    meta: {
      title: "宿舍管理",
      icon: "dorm_m"
    },
    children: [
      //楼层信息
      {
        path: "floorsInfo",
        name: "floors",
        hidden: false,
        component: () => import("@/views/Dorm/floors.vue"),
        meta: {
          title: "楼层信息",
          icon: "floors"
        }
      },
      //宿舍信息
      {
        path: "dorm-Info",
        name: "dorm",
        hidden: false,
        component: () => import("@/views/Dorm/dorm.vue"),
        meta: {
          title: "宿舍信息",
          icon: "dorm"
        }
      },
      //舍评分
      {
        path: "dorm-Rating",
        name: "rate",
        hidden: false,
        component: () => import("@/views/Dorm/rate.vue"),
        meta: {
          title: "宿舍评分",
          icon: "rate"
        }
      },
      //留宿申请
      {
        path: "application-stay",
        name: "stay",
        hidden: false,
        component: () => import("@/views/Dorm/stay.vue"),
        meta: {
          title: "留宿申请",
          icon: "application"
        }
      },
      {
        path: "dorm-bed/:name/:type",
        // path: "dorm-bed",
        name: "bed",
        hidden: true,
        component: () => import("@/views/Dorm/bed.vue"),
        meta: {
          title: "床位",
          icon: ""
        }
      }
    ]
  },
  //维修
  {
    path: "/Maintenance",
    name: "Maintenance",
    hidden: false,
    component: () => import("@/layout/layout.vue"),
    meta: {
      title: "维修管理",
      icon: "repair"
    },
    children: [
      //维修列表
      // {
      //   path: "network-repair",
      //   name: "network",
      //   hidden: false,
      //   component: () => import("@/views/Maintenance/network.vue"),
      //   meta: {
      //     title: "网络维修",
      //     icon: "network"
      //   }
      // },
      //设备维修
      {
        path: "equipment-repair",
        name: "equipment",
        component: () => import("@/views/Maintenance/equipment.vue"),
        hidden: false,
        meta: {
          title: "维修列表",
          icon: "equipment"
        }
      }
    ]
  },
  //费用管理
  {
    path: "/EM",
    name: "ExpenseManagement",
    hidden: false,
    component: () => import("@/layout/layout.vue"),
    meta: {
      title: "费用管理",
      icon: "ExpenseManagement"
    },
    children: [
      //学生信息
      {
        path: "expense",
        name: "expense",
        hidden: false,
        component: () => import("@/views/Expense/expense.vue"),
        meta: {
          title: "水电费信息",
          icon: "expense"
        }
      }
    ]
  },
  //学生信息管理
  {
    path: "/SI",
    name: "studentInfo",
    hidden: false,
    component: () => import("@/layout/layout.vue"),
    meta: {
      title: "学生管理",
      icon: "student_m"
    },
    children: [
      //学生信息
      {
        path: "student-crud",
        name: "student",
        hidden: false,
        component: () => import("@/views/Student/student.vue"),
        meta: {
          title: "学生信息",
          icon: "studentInfo"
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
  //404
  {
    path: "/:pathMath(.*)*",
    name: "404",
    hidden: true,
    component: () => import("@/views/404/notFound.vue")
  }
]
