import React, { Component } from 'react';
import './TrackList.css';
import Track from '../Track/Track';

class TrackList extends Component {
  render() {
  // Mapping the track info
    if (this.props.tracks) {
      return (
        <div className="TrackList">
          {this.props.tracks.map( track => {
            return <Track
              track={track}
              key={track.id}
              onAdd={this.props.onAdd}
              onRemove={this.props.onRemove}
              isRemoval={this.props.isRemoval}
              />
          })}
        </div>
      )
    } else {
        return null
      }
  }
}

export default TrackList;
