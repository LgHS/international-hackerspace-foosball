import React from 'react';
import Faker from 'faker';
import { includes } from 'lodash';

const randomPlayer = () => {
  return {
    name: Faker.name.findName()
  }
}

const fakeList = () => {
  let list = [];

  for (let i = 0; i < 15; i++) {
    list.push(randomPlayer());
  }

  return list;
}

const list = fakeList();

export default class TeamList extends React.Component {
  constructor(props) {
    super(props);

    //tmp
    this.list = list;
  }

  isPlayerSelected(player) {
    return includes(this.props.selected, player);
  }

  render() {
    const listItems = this.list.map(player => {
      const className = this.isPlayerSelected(player) ? 'active' : '';

      return (<li key={player.name}
          onClick={() => this.props.onPlayerClick(player)}
          className={className}>
        {player.name}
      </li>
      )
    });

    return (
      <div className="team-list">
        <ul className="team-list__container">
          {listItems}
        </ul>
      </div>
    )
  }
}