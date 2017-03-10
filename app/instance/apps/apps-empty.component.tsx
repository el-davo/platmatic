import * as React from 'react';
import InfoIcon from 'material-ui/svg-icons/action/info-outline';
import {green700} from 'material-ui/styles/colors';

const styles = {
  container: {
    margin: 20
  },
  icon: {
    height: 70,
    width: 70
  }
};

export const AppsEmptyComponent = () => (
  <div style={styles.container}>
    <InfoIcon style={styles.icon} color={green700}/>
    <br />
    <br />
    <label>It looks like there are no apps in this space :(</label>
  </div>
);
