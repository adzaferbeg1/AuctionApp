import React from 'react';


const LabelNavbar = ({label}) => {
  return (
    <>
    <nav class="navbar navbar-light bg-light">
    <span class="navbar-brand mb-0 h1" id="about-brand">{label}</span>
  </nav>
    </>
);
}

export default LabelNavbar;