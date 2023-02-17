import { Home } from './components/Home';
import { Create } from './components/Trip/Create';
import { Trips } from './components/Trip/Trips';
import { Update } from './components/Trip/Update';

const AppRoutes = [
    {
        index: true,
        element: <Home />
    },
    {
        path: '/trips',
        element: <Trips />
    },
    {
        path: '/create',
        element: <Create />
    },
    {
        path: '/update/:id',
        element: <Update />
    }
];

export default AppRoutes;
