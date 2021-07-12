import React from 'react';

import { LabelNavbar } from '../../shared/common';
import { aboutDivCol, aboutDivRow } from '../../shared/styles/PageStyles';

import './About.scss';

function About() {

    return (
        <>
            <LabelNavbar label={"ABOUT"} />

            <div className="row about-row" >
                <div className="col">
                    <h3 className="heading-about">About Us</h3>
                    <p className="heading-about">
                        Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec lectus massa, cursus vitae orci quis, placerat suscipit orci. Suspendisse potenti. Maecenas ipsum quam, elementum fringilla tristique id, imperdiet in augue. Curabitur ipsum erat, faucibus quis dignissim id, viverra dignissim dolor. Donec dictum lectus ac auctor congue. Ut nec tempor orci. Donec molestie cursus velit ac lacinia. Nunc id erat eu libero laoreet tempor. Duis molestie elementum magna, vel vehicula orci hendrerit et. Morbi in mollis augue. Nam ac blandit massa. In euismod nunc vitae justo molestie congue ac quis leo. Morbi congue cursus ullamcorper. Donec sit amet rhoncus lorem. Praesent ut ipsum ut nisi ullamcorper egestas quis sed odio.

                        Proin commodo viverra tortor nec maximus. Sed suscipit auctor nisi condimentum interdum. </p>

                    <p className="heading-about">Aliquam nec efficitur dolor. Integer egestas sapien id condimentum dapibus. Donec semper efficitur eros vitae dignissim. Nullam hendrerit lectus enim, nec tempor est maximus eu. Quisque condimentum feugiat ipsum et varius. Vestibulum vitae lorem nec metus tincidunt vestibulum ut sed nibh. Donec euismod risus nec arcu commodo suscipit. Sed eu mi tristique leo luctus consequat.
                    </p>
                    <br />
                    <br />
                </div>
                <div className="col img-col" >
                    <img alt="" src="\images\bikes.jpg" className="xl-about-img"></img>
                    <div className="row" style={aboutDivRow} >
                        <div className="col" style={aboutDivCol} >
                            <img alt="" src="\images\asian.jpg" className="s-about-img"></img>
                        </div>
                        <div className="col" style={aboutDivCol} >
                            <img alt="" src="\images\baby.jpg" className="s-about-img"></img>
                        </div>
                    </div>
                </div>

            </div>




        </>
    )

}

export default About;