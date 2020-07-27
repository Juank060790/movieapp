import React, { useState, useEffect } from 'react'
import 'bootstrap/dist/css/bootstrap.min.css';
import { Button, Card, Modal } from "react-bootstrap";
import 'mdbreact/dist/css/mdb.css';
import { MDBMask, MDBView, MDBCol } from "mdbreact";


export default function MovieCards(props) {
    // console.log('MoviveCard.props:', props)
    let item = props.movie
    let MovieImage = "https://image.tmdb.org/t/p/w220_and_h330_face/" + item.poster_path
    let [show, setShow] = useState(false);
    // eslint-disable-next-line
    let [youtubeLink, setYoutubeLink] = useState(null)
    let [urlSrc, setUrlSrc] = useState(null)
    let fullUrl = `https://image.tmdb.org/t/p/original/${props.image}`
    const apikey = process.env.REACT_APP_APIKEY


    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

   useEffect(() => {
        callApiGetVideo()
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

    const callApiGetVideo = async () => {
        let url = `https://api.themoviedb.org/3/movie/${props.movie.id}?api_key=${apikey}&language=en-US&append_to_response=videos`
        let response = await fetch(url)
        let data = await response.json()
        console.log("data video link", data)
        setUrlSrc(fullUrl)
        if (data.videos.results.length > 0) {
            setYoutubeLink(`https://www.youtube.com/embed/${data.videos.results[0].key}`)
            setUrlSrc(`https://www.youtube.com/embed/${data.videos.results[0].key}`)
        }
     
    }
    

    return (


        <div className="movieListCard ">
            <MDBCol>
                <MDBView hover zoom>
                    <Card className="info-title-moviecard" style={{ width: '18rem' }}>
                        <Card.Img className="img-fluid " variant="top" src={MovieImage} />
                        <MDBMask className="text-center" overlay="black-strong">
                            <div className="inside-cards">
                                <Card.Title>{item.original_title}</Card.Title>
                                <Card.Title>{item.title}</Card.Title>
                                <Card.Text>{item.overview}
                                        {item.release_date}
                                </Card.Text>
                                <Button onClick={handleShow}><i className="fas fa-play"></i> Trailer </Button>
                               
                            </div>
                            
                        </MDBMask>
                    </Card>
                </MDBView>
                
            </MDBCol>
            <Modal size="lg" show={show} onHide={handleClose}>
                    <Modal.Header closeButton>
                        <Modal.Title className="modal-title">{props.title}</Modal.Title>
                    </Modal.Header>
                    <div className="row">
                        <div className="col-sm-12 video-area">
                            
                            <iframe width="800" height="600" src={urlSrc}
                                frameborder="0"
                                allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture"
                                allowfullscreen>Trailer</iframe>
                        </div>
                    </div>
                </Modal>

        </div>

    )
}

