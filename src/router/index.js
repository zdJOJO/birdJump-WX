/**
 * Created by Administrator on 2017/01/05 0005.
 */
import App from '../container/App';
import Home from '../container/home';


export const routeConfig = [
    {
        path: '/',
        component: App,
        indexRoute: { component: Home },
        childRoutes: [
            { path: 'home', component: Home },
        ]
    }
]