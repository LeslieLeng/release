
import Home from './components/Home'
import DanTi from './components/DanTi'
import DieCeng from './components/DieCeng'
import HanJie from './components/HanJie'
import ReChengXiang from './components/ReChengXiang'
import Analyze from './components/Analyze'

// 单体测试数据
import Dantiday from './components/Danti/Dantiday'
import Dantimonth from './components/Danti/Dantimonth'
import Dantiyear from './components/Danti/Dantiyear'
import Dantiall from './components/Danti/Dantiall'
// 叠层测试数据
import Diecengday from './components/Dieceng/Diecengday'
import Diecengmonth from './components/Dieceng/Diecengmonth'
import Diecengyear from './components/Dieceng/Diecengyear'
import Diecengall from './components/Dieceng/Diecengall'
// 焊接测试数据
import Hanjieday from './components/Hanjie/Hanjieday'
import Hanjiemonth from './components/Hanjie/Hanjiemonth'
import Hanjieyear from './components/Hanjie/Hanjieyear'
import Hanjieall from './components/Hanjie/Hanjieall'
// 热成像测试数据
import Rechengxiangall from './components/Rechengxiang/Rechengxiangall'
import Unreviewed from './components/Rechengxiang/Unreviewed'
import Reviewed from './components/Rechengxiang/Reviewed'
//用户
import Login from './components/User/Login'

//用户管理
import Admin from './components/User/Admin'

export const routes = [
  {path: '/', redirect: {name: 'home'}},
  {path: '/home', name: 'home', component: Home},
  {path: '/login', name: 'login', component: Login},
  {path: '/admin', name: 'admin', component: Admin,
    beforeEnter: (to, from, next) => {
      if ((sessionStorage.getItem("userDuty")=='"产保副总师"')||(sessionStorage.getItem("userDuty") == '"保密员"')) {
        next()
      } else {
        alert('权限不足')
        next({path: '/login', name: 'login', component: Login})
      }
    },
  },
  {
    path: '/danti',
    redirect: {name: 'dantiday'},
    children: [
      {path: '/dantiday', name: 'dantiday', component: Dantiday},
      {path: '/dantimonth', name: 'dantimonth', component: Dantimonth},
      {path: '/dantiyear', name: 'dantiyear', component: Dantiyear},
      {path: '/dantiall', name: 'dantiall', component: Dantiall},
    ], component: DanTi
  },
  {
    path: '/dieceng',
    redirect: {name: 'diecengday'},
    children: [
      {path: '/diecengday', name: 'diecengday', component: Diecengday},
      {path: '/diecengmonth', name: 'diecengmonth', component: Diecengmonth},
      {path: '/diecengyear', name: 'diecengyear', component: Diecengyear},
      {path: '/diecengall', name: 'diecengall', component: Diecengall}
    ], component: DieCeng
  },
  {
    path: '/hanjie',
    redirect: {name: 'hanjieday'},
    children: [
      {path: '/hanjieday', name: 'hanjieday', component: Hanjieday},
      {path: '/hanjiemonth', name: 'hanjiemonth', component: Hanjiemonth},
      {path: '/hanjieyear', name: 'hanjieyear', component: Hanjieyear},
      {path: '/hanjieall', name: 'hanjieall', component: Hanjieall}
    ], component: HanJie
  },
  {
    path: '/rechengxiang',
    redirect: {name: 'rechengxiangall'},
    component: ReChengXiang,
    // beforeEnter: (to, from, next) => {
    //
    //   if (sessionStorage.getItem('userId')) {
    //       next()
    //   } else {
    //     alert('请登陆后查看')
    //     next({path: '/login', name: 'login', component: Login})
    //   }
    // },
    children: [
      {path: '/unreviewed', name: 'unreviewed', component: Unreviewed},
      {path: '/reviewed', name: 'reviewed', component: Reviewed},
      {path: '/rechengxiangall', name: 'rechengxiangall', component: Rechengxiangall},
    ],

  },
  {path: '/analyze', name: 'analyze', component: Analyze},
  {
    path: '**',   // 错误路由
    redirect: {name: 'home'}   //重定向
  },
]
