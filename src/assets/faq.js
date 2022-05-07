import * as React from 'react';
import Svg, {Path} from 'react-native-svg';

const FAQ = props => (
  <Svg
    viewBox="0 0 28 28"
    width={25}
    height={25}
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    {...props}>
    <Path
      d="M14 8c-1.66 0-3 1.34-3 3 0 .55-.45 1-1 1s-1-.45-1-1c0-2.76 2.24-5 5-5s5 2.24 5 5c0 1.5-.97 2.65-1.83 3.48-.38.36-.79.71-1.16 1.02l-.2.17c-.31.27-.59.51-.81.73-.04.52-.47.93-1 .93-.55 0-1-.44-1-1V16c0-.24.09-.48.25-.66.37-.42.83-.82 1.26-1.19l.21-.18h.01c.37-.32.72-.62 1.05-.94C16.6 12.25 17 11.61 17 11c0-1.66-1.34-3-3-3ZM15 20c0 .55-.45 1-1 1s-1-.45-1-1 .45-1 1-1 1 .45 1 1Z"
      fill={props.color}
    />
    <Path
      fillRule="evenodd"
      clipRule="evenodd"
      d="M14 0C6.27 0 0 6.23 0 13.93 0 21.62 6.21 28 13.96 28c3.88 0 7.73-.04 11.61-.08l1.4-.01c.32 0 .63-.16.81-.43.19-.27.23-.61.12-.91l-1.96-5.36A13.79 13.79 0 0 0 28 13.93C28 6.23 21.73 0 14 0ZM2 13.93C2 7.35 7.37 2 14 2s12 5.35 12 11.93c0 2.44-.74 4.71-2 6.6-.18.27-.22.6-.11.9l1.64 4.49c-3.87.04-7.7.08-11.57.08C7.34 26 2 20.54 2 13.93Z"
      fill={props.color}
    />
  </Svg>
);

export default FAQ;
