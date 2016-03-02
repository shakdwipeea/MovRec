import { bindActionCreators, Dispatch } from 'redux';
import { connect } from 'react-redux';
import * as React from 'react';

import MainSection from '../components/MainSection';
import { Video } from '../models/Video';

interface AppProps {
  videos: Video[],
  dispatch: Dispatch
}

class App extends React.Component<AppProps, any> {
  render () {
    const { videos, dispatch } = this.props;
    // todo add actions here
    const actions = bindActionCreators(null, dispatch);

    return (
      <div>
        <h1> Movie App </h1>
        <MainSection
          {...videos}
          {...actions}
         />
      </div>
    )
  }
}

const mapStateToProps = state => ({
  videos: state.videos
});

export default connect(mapStateToProps)(App);
