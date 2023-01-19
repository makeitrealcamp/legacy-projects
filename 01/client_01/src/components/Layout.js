import React from "react";
import Header from "./Header";
import Footer from "./Footer";

import '../assets/styles/components/Layout.scss';

class Layout extends React.Component {
  render() {
    return (
      <>
        <Header />
        <div className="LayoutContainer">
          {this.props.children}
        </div>
        <Footer />
      </>
    );
  }
}

export default Layout;
