import React from "react";
import RoomsFilter from "./RoomsFilter";
import RoomList from "./RoomList";
import { useGlobalcontext } from "../Context";
import Loading from "./Loading";

const RoomsContainer = () => {
  const { rooms, loading, sortedRooms } = useGlobalcontext();
  if (loading) {
    return <Loading />;
  }
  return (
    <div>
      <RoomsFilter rooms={rooms} />
      <RoomList rooms={sortedRooms} />
    </div>
  );
};

export default RoomsContainer;
