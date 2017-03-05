/**
 * Created by Administrator on 2017/01/05 0005.
 */
import App from '../container/App'
import Home from '../container/home'
import BoxList from '../container/boxList'
import DetailList from '../container/boxList/detailList'
import Detail from '../container/boxList/detail'
import InputInfo from '../container/inputInfo'
import WantToCollect from '../container/pay/want'
import Pay from '../container/pay'
import Success from '../container/pay/success'


export const routeConfig = [
    {
        path: '/',
        component: App,
        indexRoute: { component: Home },
        childRoutes: [
            { path: 'home', component: Home },
            { path: 'list', component: BoxList },
            { path: 'detailList', component: DetailList },
            { path: 'detail', component: Detail },
            { path: 'inputInfo', component: InputInfo },
            { path: 'want', component: WantToCollect },
            { path: 'pay', component: Pay },
            { path: 'success', component: Success}
        ]
    }
]