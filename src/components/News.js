import React, { Component } from 'react'
import NewsItem from './NewsItem'
import Spinner from './Spinner';
import InfiniteScroll from "react-infinite-scroll-component";

export class News extends Component {
    
    constructor(props){
        super(props);
        this.state={
             articles : [],
             loading : true,
             page:1,
             totalResults:0
        }
        document.title = `${this.capitalizeFirstLetter(this.props.category)} -News24`;
    }
    capitalizeFirstLetter=(string)=> {
        return string.charAt(0).toUpperCase() + string.slice(1);
    }
     fetchMoreData = async() => {
        this.setState({
            page: this.state.page+1
        });
        let url = `https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=fb5e1f6056004534bdbd9bb6c3121706&page=${this.state.page}&pageSize=${this.props.pageSize}`;
        let data = await fetch(url);
        let parsedData  = await data.json();
        this.setState({articles: this.state.articles.concat(parsedData.articles),totalResults: parsedData.totalResults});
      };
    async componentDidMount(){
        let url = `https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=fb5e1f6056004534bdbd9bb6c3121706&page=1&pageSize=${this.props.pageSize}`;
        this.setState({loading:true});
        let data = await fetch(url);
        let parsedData  = await data.json();
        this.setState({loading:false});
        this.setState({articles: parsedData.articles,totalResults: parsedData.totalResults});
    }
    handleNextClick = async ()=>{
        if(!(this.state.page == Math.ceil(this.state.totalResults/this.props.pageSize))){
            let url = `https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=fb5e1f6056004534bdbd9bb6c3121706&page=${this.state.page+1}&pageSize=${this.props.pageSize}`;
            this.setState({loading:true});
            let data = await fetch(url);
            let parsedData  = await data.json();
            this.setState({loading:false});
            this.setState({page: this.state.page+1,
                articles: parsedData.articles
            });
        }
    }
    handlePrevClick = async ()=>{
        let url = `https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=fb5e1f6056004534bdbd9bb6c3121706&page=${this.state.page-1}&pageSize=${this.props.pageSize}`;
        this.setState({loading:true});
        let data = await fetch(url); 
        let parsedData  = await data.json();
        this.setState({page: this.state.page-1,
            articles: parsedData.articles,
            loading:false
        });
    }
    render() {
        return (
            <>
                <h2 className='text-center' style={{margin:"30px 0px"}}>News24 Top Headlines</h2>
                {this.state.loading&& <Spinner/>}
                <InfiniteScroll
                dataLength={this.state.articles.length}
                next={this.fetchMoreData}
                hasMore={this.state.articles.length!==this.state.totalResults}
                loader={<Spinner/>}>
                <div className="container my-3">
                    <div className="row">
                        {this.state.articles.map((e)=>{
                            return( <div className="col-md-4">
                                <NewsItem title={e.title?e.title.slice(0,45):""} description={e.description?e.description.slice(0,88):" "} imageUrl={e.urlToImage} newsUrl={e.url} author={e.author} date={e.publishedAt}/>
                            </div>)
                        })}
                    </div>
                </div>
               
                </InfiniteScroll>
                {/* <div className="container d-flex justify-content-between">
                    <button disabled = {this.state.page<=1}type="button" className="btn btn-dark" onClick={this.handlePrevClick}>Previous</button>
                    <button disabled = {this.state.page == Math.ceil(this.state.totalResults/this.props.pageSize)}type="button" className="btn btn-dark" onClick={this.handleNextClick}>Next</button>
                </div> */}
            </>
        )
    }
}

export default News
