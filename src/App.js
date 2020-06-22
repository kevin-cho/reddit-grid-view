import React from 'react';
import { BrowserRouter as Router } from 'react-router';
import axios from 'axios';
import _ from 'lodash';
import Gallery from 'react-grid-gallery';
import './App.css';

export default class App extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      posts: []
    };
  }
  
  componentDidMount = async () => {
    const res = await axios.get('https://www.reddit.com/r/pics.json');
    const posts = _.get(res, 'data.data.children');

    this.setState({
      posts
    });
  }

  render() {
    const { posts } = this.state;
    const galleryImages = posts.reduce((result, post) => {
      const { url, thumbnail_width: thumbnailWidth, thumbnail_height: thumbnailHeight } = post.data;

      if (url && thumbnailWidth && thumbnailHeight) {
        result.push({
          src: url,
          thumbnail: url,
          thumbnailWidth,
          thumbnailHeight
        });
      }
      return result;
    }, []);

    return (
      <Router>
        <div className="App">
          <Gallery images={galleryImages} enableImageSelection={false} rowHeight={300} />
        </div>
      </Router>
    );
  }
}
