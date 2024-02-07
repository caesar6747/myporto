import {BrowserRouter, Routes, Route} from 'react-router-dom'
import PortoPagesDefault from './components/portoPagesDefault'
import HomePage from './components/home-page'
import Header from './components/header/header'
import Caesar from './components/caesar-porto/caesar-porto'
import EditTemplate from './pages/EditPortoPages/editPortoPages'

const router = () => {
    return(
        <BrowserRouter>
            <Routes>
                <Route path='/' element={<h1>This is Root path</h1>}/>
                <Route path='/home' element={<HomePage/>}/>
                <Route path='/test' element={<Header/>}/>
                <Route path='/default-porto' element={<PortoPagesDefault/>}/>
                <Route path='/caesar' element={<div><Header/><Caesar/></div>}/>
                <Route path='/template-editor' element={<EditTemplate/>}/>
                <Route path='*' element={<h1>404 Not Found</h1>}/>
            </Routes>
        </BrowserRouter>
    )   
}

export default router