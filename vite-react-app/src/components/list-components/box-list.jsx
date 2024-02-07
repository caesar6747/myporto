import './box-list.css'
import Box from './box'

const BoxList = (props) => {
    const title = props.title ?? "Title"
    const describe = "ini adalah konten tentang tanaman liar ehh tapi buan deng keknya gambar burung liat aja sendiri deh enaknyaa"
    return(
        <div className="box-list-container">
            <h2 id='sub-title'>{title}</h2>
            <div className="box-container">
                <Box image_url='https://wonderfulengineering.com/wp-content/uploads/2014/10/image-wallpaper-15-1024x768.jpg' content_title='Tumbuhan liar' content_describe={describe}/>
                <Box/>
                <Box/>
                <Box/>
                <Box/>
            </div>
        </div>
    )
}

export default BoxList