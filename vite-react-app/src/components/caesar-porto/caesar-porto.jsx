//import Header from '../header/header.jsx'
import './caesar-porto.css'
import BoxList from '../list-components/box-list'

const caesarPorto = () => {
    return(
        <div className='caesar-porto-page'>
            <div className='porto-banner'>
                <h1 className='welcome-word' id='name-word'>Hi I'm Caesar Nuari</h1>
                <p className='welcome-word' id='identity-word'>I'm a web developer</p>
                <p className='welcome-word' id='welcome-page-word'>Welcome to my portofolio web pages</p>
            </div>
            <BoxList/>
            <BoxList/>
        </div>
    )
}

export default caesarPorto