import Header from '../components/Layout/Header/Header'
import Footer from '../components/Layout/Footer/Footer'
import { Route, Routes } from 'react-router-dom';
import Posts from '../pages/Posts/Posts';
import Photo from '../pages/Photo/Photo'
import Todos from '../pages/Todos/Todos'
import Favourites from '../pages/Favourites/Favourites';
const Routers = () => {
    return (
        <Routes>
            <Route path='/' element={<Posts />} />
            <Route path='/photos' element={<Photo />} />
            <Route path='/todos' element={<Todos />} />
            <Route path='/favourites' element={<Favourites />} />
        </Routes>
    )
}
export default Routers;