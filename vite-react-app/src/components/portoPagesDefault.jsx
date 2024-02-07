import './portoPagesDefault.css'
import picture from '../assets/profile-picture.jpg'

const portoPageDefault = () => {
    return (
        <div>
            <div className="profile-container">
                <div className="profile-background"></div>
                <img src={picture} className="profile-picture"/>
                <h3 className='name'>Karen Jubaidah</h3>
            </div>
        </div>
    )
}

export default portoPageDefault;

