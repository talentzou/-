export const routes = [
  //主页
  {
    path: "/",
    name: "home",
    component: () => import("@/layout/layout.vue"),
    meta:{
        title:'首页',
        icon:''
    }
    
  },
  //宿舍管理
  {
    path: "/DM",
    name: "dormitory-management",
    component: () => import("@/layout/layout.vue"),
    meta:{
        title:'宿舍管理',
        icon:''
    },
    children: [
      {
        path: "floorsInfo",
        name: "floors",
        component: () => import(""),
        meta:{
            title:'楼层信息',
            icon:''
        }
      },
      {
        path: "dorm-Info",
        name: "dorm",
        component: () => import(""),
        meta:{
            title:'宿舍信息',
            icon:''
        }
      },
      {
        path: "dorm-Rating",
        name: "rate",
        component: () => import(""),
        meta:{
            title:'宿舍评分',
            icon:''
        }
      },
      {
        path:'application-stay',
        name:'stay',
        component:()=>import(""),
        meta:{
            title:'留宿申请',
            icon:''
        }
      }
    ]
  },
 //维修
  {
    path:'/Maintenance',
    name:'Maintenance',
    component: () => import("@/layout/layout.vue"),
    meta:{
        title:'维修管理',
        icon:''
    },
    children:[
        {
            path:'network-repair',
            name:'network',
            component:()=>import(""),
            meta:{
                title:'网络维修',
                icon:''
            }
        },
        {
            path:'equipment-repair',
            name:'repair',
            component:()=>import(""),
            meta:{
                title:'设备维修',
                icon:''
            }
        }
    ]
  },
  //学生信息管理
  {
    path:'SI',
    name:'studentInfo',
    component:()=>import(''),
    meta:{
        title:'学生管理',
        icon:''
    },
    children:[
        {
            path:'student-crud',
            name:'student',
            component:()=>import(""),
            meta:{
                title:'学生信息',
                icon:''
            }
        }
    ]
  }
 
]
