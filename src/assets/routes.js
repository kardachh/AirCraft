import * as React from 'react';
import Svg, {Path, Circle} from 'react-native-svg';

const RoutesIcon = props => (
  <Svg
    {...props}
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 42.389 42.389"
    style={{
      enableBackground: 'new 0 0 42.389 42.389',
    }}
    xmlSpace="preserve"
    width={24}
    height={24}>
    <Path
      fill={props.color}
      d="m42.096 9.487-8.389-8.389a1.03 1.03 0 0 0-1.414 0l-8.389 8.389a.999.999 0 1 0 1.414 1.414L32 4.219v28.475c0 3.86-3.141 7-7 7s-7-3.14-7-7v-24h-.059c-.5-4.493-4.316-8-8.941-8s-8.441 3.507-8.941 8H0v31h2v-30c0-3.86 3.141-7 7-7s7 3.14 7 7v24h.059c.5 4.493 4.316 8 8.941 8s8.441-3.507 8.941-8H34V4.219l6.682 6.682a.997.997 0 0 0 1.414 0 1 1 0 0 0 0-1.414z"
    />
  </Svg>
);

export default RoutesIcon;
