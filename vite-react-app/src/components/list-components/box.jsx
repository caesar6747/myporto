const Box = (props) => {
    const image_url = props.image_url ?? "https://place.dog/200/200"
    const content_title = props.content_title ?? "this is content title"
    const content_describe = props.content_describe ?? "lorem ipsum dolor sit amet jamet lahh kalian sdjkfa sakdjbfas sakdbfka skdjubfkas skdhfvka skadhvfsa ksadfsdfa dsfaa dsafa asdfa vas jsahdf sakdhvf "

    return(
        <div className="box">
            <div className="for-content">
                <div className="image-box-container">
                    <img src={image_url}/>
                </div>
                <div className="content-box-container">
                    <h3>{content_title}</h3>
                    <p>{content_describe}</p>
                </div>
            </div>
            <div className="for-animation"></div>
        </div>
    )
}

export default Box