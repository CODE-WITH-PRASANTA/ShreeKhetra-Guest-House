
import React from "react";

// Breadcrumb
import Breadcrumb from "../../Components/Breadcrumb/Breadcrumb";

// Service Component
import ServiceFirst from "../../Components/ServiceFirst/ServiceFirst";

const Service = () => {
  return (
    <>
      {/* Service Breadcrumb */}
      <Breadcrumb
        title="Our Services"
        subtitle="Enjoy exceptional hospitality, modern facilities and premium services at SriKshetra Residency, Puri."
      />

      {/* Service Sections */}
      <ServiceFirst />
    </>
  );
};

export default Service;
