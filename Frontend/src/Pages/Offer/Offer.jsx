
import React from "react";

// Breadcrumb
import Breadcrumb from "../../Components/Breadcrumb/Breadcrumb";

// Offer Component
import Offers from "../../Components/Offers/Offers";

const Offer = () => {
  return (
    <>
      {/* Offer Breadcrumb */}
      <Breadcrumb
        title="Special Offers"
        subtitle="Discover exclusive deals and special offers for a memorable stay at SriKshetra Residency, Puri."
      />

      {/* Offer Sections */}
      <Offers />
    </>
  );
};

export default Offer;
