import './header.css'

const header = () => {
    return(
        <div className='header-container'>
            <div className='header-background'></div>
            <div className="menu-container">
                <div className='pure-menu pure-menu-horizontal'>
                    <ul className='pure-menu-list'>
                        <li className='pure-menu-item'><a className='pure-menu-link' href='/test'>Home</a></li>
                        <li className='pure-menu-item'><a className='pure-menu-link' href='/'>Kosong</a></li>
                        <li className='pure-menu-item'><a className='pure-menu-link' href='/'>About</a></li>
                    </ul>
                </div>
            </div>
    </div>
    )
}

export default header