export const asyncRoutes = [
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
        path: "dorm-bed/:floor/:name/:capacity",//
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
      },
      {
        path: "student-violate",
        name: "violate",
        component: () => import("@/views/Student/violate.vue"),
        meta: {
          title: "学生违纪",
          icon: "violate"
        }
      }
    ]
  },
  // 通告
  {
    path: "/Notice",
    name: "notice",
    hidden: false,
    meta: {
      title: "公告",
      icon: ""
    },
    component: () => import("@/layout/layout.vue"),

    children: [
      {
        path: "Message",
        name: "message",
        component: () => import("@/views/Notice/notice.vue"),
        hidden: false,
        meta: {
          title: "通告消息",
          icon: "notice"
        }
      }
    ]
  },
  //维修
  {
    path: "/Maintenance",
    name: "Maintenance",
    hidden: false,
    meta: {
      title: "维修管理",
      icon: "repair"
    },
    component: () => import("@/layout/layout.vue"),

    children: [
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

  // 个人信息
  {
    path: "/PersonInfo",
    name: "person",
    hidden: false,
    component: () => import("@/layout/layout.vue"),
    meta: {
      title: "设置",
      icon: ""
    },
    children: [
      {
        path: "setting",
        name: "userInfo",
        hidden: false,
        component: () => import("@/views/Person/setting.vue"),
        meta: {
          title: "个人信息",
          icon: "setting"
        }
      }
    ]
  }
]
