import * as React from 'react';

import { Video } from '../models/Video';

class MovieItem extends React.Component<Video, any> {
  render () {
    return (
      <div onclick="play({{json this}})">
         <br />
        <h2>name:{this.props.name}</h2>
        <h3>Title: {this.props.title}</h3>
        <h3>Season: {this.props.season}</h3>
        <h3>Episode:{this.props.episode} </h3>
        <p>path: {this.props.path}</p><br/>
        <p>Rating: {this.props.rating}</p>
        <hr />
      </div>
    )
  }
}

export default MovieItem;
