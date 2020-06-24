import React from "react";
import Link from "next/link";

class Header extends React.Component {
  constructor(props: Readonly<{}>) {
    super(props);
  }
  render() {
    return (
      <div>
        <p>this is the home</p>
      </div>
    );
  }
}
export default Header;