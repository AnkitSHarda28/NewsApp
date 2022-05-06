import React, { Component } from "react";
import NewsItem from "./NewsItem";
import PropTypes from "prop-types";

export class News extends Component {
  static defaultProps = {
    country: "it",
    category: "general",
  };
  static propTypes = {
    country: PropTypes.string,
    category: PropTypes.string,
  };
  articles = [
    {
      source: { id: "news24", name: "News24" },
      author: "AFP",
      title:
        "Faf du Plessis backs 'fantastic cricketer' Virat Kohli to turn around form slump",
      description:
        "Royal Challengers Bangalore skipper Faf du Plessis is confident Virat Kohli will overcome his IPL batting slump.",
      url: "https://www.news24.com/sport/Cricket/IPL/faf-du-plessis-backs-fantastic-cricketer-virat-kohli-to-turn-around-form-slump-20220427",
      urlToImage:
        "https://cdn.24.co.za/files/Cms/General/d/3299/c4d3fb556b4249d9ae7274fa46e08a28.jpg",
      publishedAt: "2022-04-27T14:18:01+00:00",
      content:
        "Royal Challengers Bangalore skipper Faf du Plessis is confident Virat Kohli will overcome his IPL batting slump.\r\nKohli took his Indian Premier League tally this season to just 128 runs from nine mat… [+2400 chars]",
    },
    {
      source: { id: "bbc-sport", name: "BBC Sport" },
      author: "BBC Sport",
      title: "Shane Warne memorial - watch & follow updates",
      description:
        "Watch live coverage and follow text updates and tributes from the state memorial for Australian cricket legend Shane Warne at the Melbourne Cricket Ground.",
      url: "http://www.bbc.co.uk/sport/live/cricket/60916236",
      urlToImage:
        "https:////m.files.bbci.co.uk/modules/bbc-morph-sport-seo-meta/1.22.0/images/bbc-sport-logo.png",
      publishedAt: "2022-03-30T08:22:26.498888Z",
      content:
        "Former England bowler and BBC cricket presenter Isa Guha, who became a colleague of Warne's in the commentary box: \"It has been a strange few weeks - a lot of shock and then we did our own tribute at… [+396 chars]",
    },
    {
      source: { id: "espn-cric-info", name: "ESPN Cric Info" },
      author: null,
      title:
        "PCB hands Umar Akmal three-year ban from all cricket | ESPNcricinfo.com",
      description:
        "Penalty after the batsman pleaded guilty to not reporting corrupt approaches | ESPNcricinfo.com",
      url: "http://www.espncricinfo.com/story/_/id/29103103/pcb-hands-umar-akmal-three-year-ban-all-cricket",
      urlToImage:
        "https://a4.espncdn.com/combiner/i?img=%2Fi%2Fcricket%2Fcricinfo%2F1099495_800x450.jpg",
      publishedAt: "2020-04-27T11:41:47Z",
      content:
        "Umar Akmal's troubled cricket career has hit its biggest roadblock yet, with the PCB handing him a ban from all representative cricket for three years after he pleaded guilty of failing to report det… [+1506 chars]",
    },
    {
      source: { id: "espn-cric-info", name: "ESPN Cric Info" },
      author: null,
      title:
        "What we learned from watching the 1992 World Cup final in full again | ESPNcricinfo.com",
      description:
        "Wides, lbw calls, swing - plenty of things were different in white-ball cricket back then | ESPNcricinfo.com",
      url: "http://www.espncricinfo.com/story/_/id/28970907/learned-watching-1992-world-cup-final-full-again",
      urlToImage:
        "https://a4.espncdn.com/combiner/i?img=%2Fi%2Fcricket%2Fcricinfo%2F1219926_1296x729.jpg",
      publishedAt: "2020-03-30T15:26:05Z",
      content:
        "Last week, we at ESPNcricinfo did something we have been thinking of doing for eight years now: pretend-live ball-by-ball commentary for a classic cricket match. We knew the result, yes, but we tried… [+6823 chars]",
    },
  ];
  constructor() {
    super();
    console.log("Hello i am a constructor from news component");
    this.state = {
      articles: this.articles,
      loading: false,
      page: 1,
    };
  }

  async componentDidMount() {
    console.log("component did mount run after render()");
    let url = `https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=03547ad1ac494add8cfccb6e29be39dd&page=1&pageSize=20`;
    let data = await fetch(url);
    let parsedData = await data.json();
    console.log(parsedData);
    this.setState({
      articles: parsedData.articles,
      totalArticles: parsedData.totalResults,
    });
  }

  handleNextClick = async () => {
    if (this.state.page + 1 > Math.ceil(this.state.totalResults / 20)) {
    } else {
      let url = `https://newsapi.org/v2/top-headlines?country=${
        this.props.country
      }&category=${
        this.props.category
      }&apiKey=03547ad1ac494add8cfccb6e29be39dd&page=${
        this.state.page + 1
      }&pageSize=20`;
      let data = await fetch(url);
      let parsedData = await data.json();
      console.log(parsedData);
      console.log("Next");
      this.setState({
        page: this.state.page + 1,
        articles: parsedData.articles,
      });
    }
  };

  handlePreviousClick = async () => {
    console.log("previous");
    let url = `https://newsapi.org/v2/top-headlines?country=${
      this.props.country
    }&category=${
      this.props.category
    }&apiKey=03547ad1ac494add8cfccb6e29be39dd&page=${
      this.state.page - 1
    }&pageSize=20`;
    let data = await fetch(url);
    let parsedData = await data.json();
    console.log(parsedData);
    this.setState({
      page: this.state.page - 1,
      articles: parsedData.articles,
    });
  };

  render() {
    console.log("render() runs before component did mount");
    return (
      <div className="container my-3">
        <h2>NewsMonkey top headlines</h2>
        <div className="row">
          {this.state.articles.map((element) => {
            return (
              <div className="col-md-4" key={element.url}>
                <NewsItem
                  title={element.title ? element.title.slice(0, 44) : ""}
                  description={
                    element.description ? element.description.slice(0, 88) : ""
                  }
                  imageUrl={element.urlToImage}
                  newsUrl={element.url}
                />
              </div>
            );
          })}
        </div>
        <div className="container d-flex justify-content-between">
          <button
            disabled={this.state.page <= 1}
            type="button"
            class="btn btn-outline-dark"
            onClick={this.handlePreviousClick}
          >
            Previous
          </button>
          <button
            type="button"
            class="btn btn-outline-dark"
            onClick={this.handleNextClick}
          >
            Next
          </button>
        </div>
      </div>
    );
  }
}

export default News;
