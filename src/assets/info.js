import * as React from 'react';
import Svg, {Path} from 'react-native-svg';
/* SVGR has dropped some elements not supported by react-native-svg: title */

const InfoIcon = props => (
  <Svg
    width={25}
    height={25}
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    {...props}>
    <Path
      d="M11.25 18.75h2.5v-7.5h-2.5v7.5ZM12.5 0C5.6 0 0 5.6 0 12.5S5.6 25 12.5 25 25 19.4 25 12.5 19.4 0 12.5 0Zm0 22.5c-5.513 0-10-4.488-10-10 0-5.513 4.487-10 10-10 5.512 0 10 4.487 10 10 0 5.512-4.488 10-10 10ZM11.25 8.75h2.5v-2.5h-2.5v2.5Z"
      fill="#000"
      fillOpacity={0.87}
    />
  </Svg>
);

export default InfoIcon;
