
import React from "react";

// Breadcrumb
import Breadcrumb from "../../Components/Breadcrumb/Breadcrumb";

// About Components
import AboutFirst from "../../Components/AboutFirst/AboutFirst";
import AboutSecond from "../../Components/AboutSecond/AboutSecond";
import AboutThird from "../../Components/AboutThird/AboutThird";
import AboutFourth from "../../Components/AboutFourth/AboutFourth";
import AboutFifth from "../../Components/AboutFifth/AboutFifth";
import AboutSixth from "../../Components/AboutSixth/AboutSixth";
import AboutSeven from "../../Components/AboutSeven/AboutSeven";
import AboutEight from "../../Components/AboutEight/AboutEight";
import AboutNineth from "../../Components/AboutNineth/AboutNineth";

const About = () => {
  return (
    <>
      {/* About Breadcrumb */}
      <Breadcrumb
        title="About Us"
        subtitle="Discover the beauty, comfort and hospitality of SriKshetra Residency, Puri."
      />

      {/* About Page Sections */}
      <AboutFirst />
      <AboutSecond />
      <AboutThird />
      <AboutFourth />
      <AboutFifth />
      <AboutSixth />
      <AboutSeven />
      <AboutEight />
      <AboutNineth />
    </>
  );
};

export default About;
