import * as React from 'react';
import {Link} from 'react-router';
import Drawer from 'material-ui/Drawer';
import MenuItem from 'material-ui/MenuItem';
import List from 'material-ui/List/List';
import ListItem from 'material-ui/List/ListItem';
import {darkBlack, white} from 'material-ui/styles/colors';
import SearchContainer from '../instance/search/search.container';

let styles = {
  sidebar: {
    backgroundColor: darkBlack
  },
  icon: {
    marginLeft: 28
  },
  menu: {
    color: white
  }
};

export class SidebarComponent extends React.Component<any, any> {

  constructor(props, context) {
    super(props, context);
  }

  componentDidMount() {
    this.props.fetchEvents();
  }

  render() {
    return (
      <Drawer open={true} docked={true} width={150} containerStyle={styles.sidebar}>

        <List>
          <ListItem>
            <SearchContainer/>
          </ListItem>
        </List>

        <Link to="/">
          <MenuItem
            className={this.props.activePage === 'home' || this.props.activePage === 'organizations' || this.props.activePage === 'stats' ? 'active-page' : ''}
            style={styles.menu}>Organization</MenuItem>
        </Link>
        <Link to="/market">
          <MenuItem className={this.props.activePage === 'market' ? 'active-page' : ''}
                    style={styles.menu}>Market</MenuItem>
        </Link>
        <Link to="/stacks">
          <MenuItem className={this.props.activePage === 'stacks' ? 'active-page' : ''}
                    style={styles.menu}>Stacks</MenuItem>
        </Link>
        <Link to="/events">
          <MenuItem className={this.props.activePage === 'events' ? 'active-page' : ''}
                    style={styles.menu}>Events</MenuItem>
        </Link>
        <Link to="/create">
          <MenuItem className={this.props.activePage === 'create' ? 'active-page' : ''}
                    style={styles.menu}>Create App</MenuItem>
        </Link>
        <Link to="/settings">
          <MenuItem className={this.props.activePage === 'settings' ? 'active-page' : ''}
                    style={styles.menu}>Settings</MenuItem>
        </Link>
      </Drawer>
    )
  }
}
