import React,{Fragment,useState,useEffect} from 'react';
import Breadcrumb from '../../layout/breadcrumb'
import Lightbox from "react-image-lightbox";
import {Container,Row,Col,Card,CardHeader,CardBody,Media} from 'reactstrap'
import axios from 'axios'
import {IMAGE_GALLERY} from "../../constant";

const ImageGallery = () => {
    
        const [images,setImage] = useState([]) 
        const [smallImages,setsmallImages] = useState([])
        
        const initilindex = {index:0,isOpen:false}
        const[photoIndex,setPhotoIndex] = useState(initilindex)
        const onMovePrev = () => {
           const prev = (photoIndex.index + images.length - 1) % images.length
           setPhotoIndex({...photoIndex,index:prev})
        }
        const  onMoveNext = () => {
            const next = (photoIndex.index + 1) % images.length
            setPhotoIndex({...photoIndex,index:next})
        }

        useEffect(() => {

            axios.get(`${process.env.PUBLIC_URL}/api/image-light.json`).then((response) => {
                setImage(response.data.src);
            })

            axios.get(`${process.env.PUBLIC_URL}/api/image-big-light.json`).then((response) => {
                setsmallImages(response.data.src);
            })

        },[])
        
        return(
            <Fragment>
                <Breadcrumb parent="Gallery" title="Gallery Grid"/>
                <Container fluid={true}>
                    <Row>
                        {smallImages.length > 0 ? 
                        <Col sm="12">
                            <Card>
                                <CardHeader>
                                    <h5>{IMAGE_GALLERY}</h5>
                                </CardHeader>
                                <CardBody className="my-gallery row">
                                    <figure className="col-xl-3 col-sm-6">
                                        <Media
                                            src={require(`../../assets/images/${smallImages[0]}`)}
                                            alt="Gallery"
                                            className="img-thumbnail"
                                            onClick={() =>
                                                setPhotoIndex({ ...photoIndex,index:0, isOpen:true})
                                            }
                                        />
                                    </figure>
                                    <figure className="col-xl-3 col-sm-6">
                                        <Media
                                            src={require(`../../assets/images/${smallImages[2]}`)}
                                            alt="Gallery"
                                            className="img-thumbnail"
                                            onClick={() =>
                                                setPhotoIndex({ ...photoIndex,index:2, isOpen:true})
                                            }
                                        />
                                    </figure>
                                    <figure className="col-xl-3 col-sm-6">
                                        <Media
                                            src={require(`../../assets/images/${smallImages[1]}`)}
                                            alt="Gallery"
                                            className="img-thumbnail"
                                            onClick={() =>
                                                setPhotoIndex({ ...photoIndex,index:1, isOpen:true})
                                            }
                                        />
                                    </figure>
                                    <figure className="col-xl-3 col-sm-6">
                                        <Media
                                            src={require(`../../assets/images/${smallImages[3]}`)}
                                            alt="Gallery"
                                            className="img-thumbnail"
                                            onClick={() =>
                                                setPhotoIndex({ ...photoIndex,index:3, isOpen:true})
                                            }
                                        />
                                    </figure>
                                    <figure className="col-xl-3 col-sm-6">
                                        <Media
                                            src={require(`../../assets/images/${smallImages[8]}`)}
                                            alt="Gallery"
                                            className="img-thumbnail"
                                            onClick={() =>
                                                setPhotoIndex({ ...photoIndex,index:8, isOpen:true})
                                            }
                                        />
                                    </figure>
                                    <figure className="col-xl-3 col-sm-6">
                                        <Media
                                            src={require(`../../assets/images/${smallImages[5]}`)}
                                            alt="Gallery"
                                            className="img-thumbnail"
                                            onClick={() =>
                                                setPhotoIndex({ ...photoIndex,index:5, isOpen:true})
                                            }
                                        />
                                    </figure>
                                    <figure className="col-xl-3 col-sm-6">
                                        <Media
                                            src={require(`../../assets/images/${smallImages[4]}`)}
                                            alt="Gallery"
                                            className="img-thumbnail"
                                            onClick={() =>
                                                setPhotoIndex({ ...photoIndex,index:4, isOpen:true})
                                            }
                                        />
                                    </figure>
                                    <figure className="col-xl-3 col-sm-6">
                                        <Media
                                            src={require(`../../assets/images/${smallImages[9]}`)}
                                            alt="Gallery"
                                            className="img-thumbnail"
                                            onClick={() =>
                                                setPhotoIndex({ ...photoIndex,index:9, isOpen:true})
                                            }
                                        />
                                    </figure>
                                    <figure className="col-xl-3 col-sm-6">
                                        <Media
                                            src={require(`../../assets/images/${smallImages[6]}`)}
                                            alt="Gallery"
                                            className="img-thumbnail"   
                                            onClick={() =>
                                                setPhotoIndex({ ...photoIndex,index:6, isOpen:true})
                                            }
                                        />
                                    </figure>
                                    <figure className="col-xl-3 col-sm-6">
                                        <Media
                                            src={require(`../../assets/images/${smallImages[7]}`)}
                                            alt="Gallery"
                                            className="img-thumbnail"
                                            onClick={() =>
                                                setPhotoIndex({ ...photoIndex,index:7, isOpen:true})
                                            }
                                        />
                                    </figure>
                                    <figure className="col-xl-3 col-sm-6">
                                        <Media
                                            src={require(`../../assets/images/${smallImages[11]}`)}
                                            alt="Gallery"
                                            className="img-thumbnail"
                                            onClick={() =>
                                                setPhotoIndex({ ...photoIndex,index:11, isOpen:true})
                                            }
                                        />
                                    </figure>
                                    <figure className="col-xl-3 col-sm-6">
                                        <Media
                                            src={require(`../../assets/images/${smallImages[10]}`)}
                                            alt="Gallery"
                                            className="img-thumbnail"
                                            onClick={() =>
                                                setPhotoIndex({ ...photoIndex,index:10, isOpen:true})
                                            }
                                        />
                                    </figure>
                                </CardBody>
                            </Card>
                        </Col>
                        :""}
                    </Row>
                </Container>
                {photoIndex.isOpen && (
                    <Lightbox
                        mainSrc={require(`../../assets/images/${images[photoIndex.index]}`)}
                        nextSrc={require(`../../assets/images/${images[(photoIndex.index + 1) % images.length]}`)}
                        prevSrc={require(`../../assets/images/${images[(photoIndex.index + images.length - 1) % images.length]}`)}
                        imageTitle={photoIndex.index + 1 + "/" + images.length}
                        onCloseRequest={() => setPhotoIndex({ ...photoIndex,isOpen:false})}
                        onMovePrevRequest={onMovePrev}
                        onMoveNextRequest={onMoveNext}
                    />
                )}
            </Fragment>
        );
    }


export default ImageGallery;