import * as React from 'react';

import MovieItem from './MovieItem';

import { Video } from '../models/Video';

interface MainSectionProps {
  videos: Video[],
  actions: any
}

class MainSection extends React.Component<MainSectionProps, any> {
  render() {
    const { videos, actions } = this.props;

    return (
      <section className="main">
        <div>
          <ul>
            {videos.map(video =>
                <MovieItem
                  {...video}
                />
            )}
          </ul>
        </div>
      </section>
    )
  }
}

export default MainSection;
