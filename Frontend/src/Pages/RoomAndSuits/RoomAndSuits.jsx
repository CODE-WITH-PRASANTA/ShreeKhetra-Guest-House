
import React from "react";

// Breadcrumb
import Breadcrumb from "../../Components/Breadcrumb/Breadcrumb";

// Room Components
import RoomandSuitsSecond from "../../Components/RoomandSuitsSecond/RoomandSuitsSecond";
import RoomandSuitsThird from "../../Components/RoomandSuitsThird/RoomandSuitsThird";
import RoomandSuitsFourth from "../../Components/RoomandSuitsFourth/RoomandSuitsFourth";

const RoomAndSuits = () => {
  return (
    <>
      {/* Room Breadcrumb */}
      <Breadcrumb
        title="Rooms & Suites"
        subtitle="Discover elegant rooms, modern comfort and a relaxing stay at SriKshetra Residency, Puri."
      />

      {/* Room Sections */}
      <RoomandSuitsSecond />
      <RoomandSuitsThird />
      <RoomandSuitsFourth />
    </>
  );
};

export default RoomAndSuits;
