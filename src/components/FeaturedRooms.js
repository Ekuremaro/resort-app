import React from "react";
import Loading from "./Loading";
import { useGlobalcontext } from "../Context";
import Room from "./Room";
import Title from "./Title";

const FeaturedRooms = () => {
  const { featuredRooms, loading } = useGlobalcontext();
  const rooms = featuredRooms.map((room) => {
    return <Room key={room.id} room={room} />;
  });
  return (
    <section className="featured-rooms">
      <Title title="featured rooms" />
      <div className="featured-rooms-center">
        {loading ? <Loading /> : rooms}
      </div>
    </section>
  );
};

export default FeaturedRooms;
