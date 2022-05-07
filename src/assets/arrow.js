import * as React from 'react';
import Svg, {Path} from 'react-native-svg';

const DropdownArrow = props => (
  <Svg
    viewBox="0 0 20 25"
    width={20}
    height={15}
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    {...props}>
    <Path
      transform="scale(1.07857 .9147) rotate(45 -1.67 .692)"
      stroke="#9B9B9B"
      d="M0-.5h16.596"
    />
    <Path d="M12.343 11.734 25 1" stroke="#9B9B9B" />
  </Svg>
);

export default DropdownArrow;
