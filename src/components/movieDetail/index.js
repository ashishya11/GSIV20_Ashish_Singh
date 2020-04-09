import React from 'react';
import './index.css';
import constant from '../../constant.json';
import home from '../../assets/home.png';
import Rating from 'react-rating';

class MovieDetail extends React.Component {
    constructor() {
        super();
        this.state = {
            movieDetail: {}
        }
    }

    componentDidMount() {
        const movieDetail = JSON.parse(sessionStorage.getItem('movieDetail'));
        this.setState({
            movieDetail
        })
    }

    handleHomeImgClick() {
        window.location.href = "/"
    }

    render() {
        const { movieDetail } = this.state;
        return (
            <div className='container-fluid'>
                <div className='row'>
                    <div className='col-lg-12'>
                        <nav className="navbar navbar-expand-sm bg-light navbar-light justify-content-between">
                            <div className="form-inline">
                                <h5>Movie Details</h5>
                            </div>
                            <div><img onClick={this.handleHomeImgClick} className="homeIcon" src={home} alt="" /></div>
                        </nav>
                    </div>
                </div>
                <div className="row">
                    <div className="col-lg-12 col-md-12 col-sm-12">
                        <div className="col-lg-12 col-md-12 col-sm-12" id="content_wrapper">
                            <div className="media  mt-3 mb-4">
                                <img id="imageDetailPage" className="align-self-start mr-3" src={`${constant.imagePath}${movieDetail.poster_path}`} alt="" />
                                <div className="media-body">
                                    <h5 className="mt-0">{movieDetail.title}</h5>
                                    <Rating
                                        start="0"
                                        stop="10"
                                        step="2"
                                        initialRating={movieDetail.vote_average}
                                        readonly={true}
                                    />
                                    <p><b>Year of release :</b> {movieDetail.release_date}</p>
                                    <p><b>Length (HH:MM) :</b> {''}</p>
                                    <p><b>Director :</b> {''}</p>
                                    <p><b>Vote Count :</b> {movieDetail.vote_count}</p>
                                    <p><b>Description :</b> {movieDetail.overview}</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

export default MovieDetail;