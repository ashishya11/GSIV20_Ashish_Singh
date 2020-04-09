import React from 'react';
import './index.css';
import constant from '../../constant.json';
import home from '../../assets/home.png';

import Rating from 'react-rating';
import LinesEllipsis from 'react-lines-ellipsis';
import responsiveHOC from 'react-lines-ellipsis/lib/responsiveHOC';

const ResponsiveEllipsis = responsiveHOC()(LinesEllipsis);


class Home extends React.Component {
    constructor() {
        super();
        this.state = {
            searchKey: '',
            movieList: [],
            filteredMovieList: []
        }

        this.renderMovieCard = this.renderMovieCard.bind(this);
    }

    componentDidMount() {
        const url = `${constant.listingUrl}?api_key=${constant.apiKey}`
        fetch(url)
            .then((response) => {
                return response.json();
            })
            .then((res) => {
                this.setState({
                    movieList: res.results,
                    filteredMovieList: res.results
                })
            })
            .catch()
    }

    handleInputChange = (e) => {
        const key = e.target.name;
        const value = e.target.value;
        const { movieList } = this.state;
        const filteredMovieList = movieList.filter(function (movie) { return movie.original_title.toLowerCase().includes(value.trim().toLowerCase()); });
        this.setState({
            [key]: value,
            filteredMovieList: filteredMovieList
        })
    }

    renderMovieCard = (movie) => {

        return (
            <div key={movie.id} className="col-lg-3 col-md-3 col-sm-6 mt-3">
                <div className="card">
                    <img className="card-img-top avtarImg" src={`${constant.imagePath}${movie.poster_path}`} alt="" />
                    <div className="card-body">
                        <h5 className="card-title">{movie.original_title}</h5>
                        <div className="card-text">
                            <ResponsiveEllipsis
                                text={movie.overview}
                                maxLine="2"
                                ellipsis="..."
                                trimRight
                                basedOn="letters"
                            />
                            <div className="mt-2">
                                <Rating
                                    start="0"
                                    stop="10"
                                    step="2"
                                    initialRating={movie.vote_average}
                                    readonly={true}
                                />
                            </div>
                        </div>
                        <button onClick={() => this.handleViewDetail(movie)} className="btn btn-secondary mt-3">View Details</button>
                    </div>
                </div>
            </div>
        )
    }

    handleViewDetail(movie) {
        const movieDetail = JSON.stringify(movie);
        const movieDetails = sessionStorage.getItem('movieDetail');
        if (!movieDetails) {
            sessionStorage.setItem('movieDetail', movieDetail);
            window.location.href = '/movieDetail';
        } else {
            sessionStorage.removeItem('movieDetail');
            sessionStorage.setItem('movieDetail', movieDetail);
            window.location.href = '/movieDetail';
        }
    }

    handleHomeImgClick() {
        window.location.href = "/"
    }

    render() {
        const { filteredMovieList, searchKey } = this.state;
        return (
            <div className='container-fluid'>
                <div className='row'>
                    <div className='col-lg-12'>
                        <nav className="navbar navbar-expand-sm bg-light navbar-light justify-content-between">
                            <div className="form-inline">
                                <input
                                    className="form-control mr-sm-3"
                                    type="text"
                                    name="searchKey"
                                    placeholder="Search"
                                    value={searchKey}
                                    onChange={this.handleInputChange}
                                />
                            </div>
                            <div><img onClick={this.handleHomeImgClick} className="homeIcon" src={home} alt="" /></div>
                        </nav>
                    </div>
                </div>
                <div className="row">
                    {filteredMovieList && filteredMovieList.length && filteredMovieList.map((movie) => (this.renderMovieCard(movie)))}
                </div>
            </div>
        )
    }
}

export default Home;