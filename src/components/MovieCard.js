import React from 'react'
import 'bootstrap/dist/css/bootstrap.min.css';
import { Button, Card } from "react-bootstrap";
import 'mdbreact/dist/css/mdb.css';
import { MDBMask, MDBView, MDBCol } from "mdbreact";


export default function MovieCards(props) {
    // console.log('MoviveCard.props:', props)
    let item = props.movie
    let MovieImage = "https://image.tmdb.org/t/p/w220_and_h330_face/" + item.poster_path
    
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
                                <Button variant="primary">Trailer</Button>
                                <Card.Text>{item.overview}
                                    <h4>{item.release_date}</h4>
                                </Card.Text>
                            </div>
                            
                        </MDBMask>
                    </Card>
                </MDBView>
            </MDBCol>


        </div>

    )
}

