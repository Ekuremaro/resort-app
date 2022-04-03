import React from "react";
import { useContext } from "react";
import items from "./data";
import { useState, useEffect } from "react";

export const RoomContext = React.createContext();

const RoomProvider = ({ children }) => {
  const [rooms, setRooms] = useState([]);
  const [sortedRooms, setSortedRooms] = useState([]);
  const [featuredRooms, setFeaturedRooms] = useState([]);
  const [loading, setLoading] = useState(true);

  const formatData = (items) => {
    let tempItems = items.map((item) => {
      let id = item.sys.id;
      let images = item.fields.images.map((image) => image.fields.file.url);

      let room = { ...item.fields, images, id };
      return room;
    });
    return tempItems;
  };

  const getRoom = (slug) => {
    let room = rooms.find((room) => room.slug === slug);
    return room;
  };

  useEffect(() => {
    let rooms = formatData(items);
    let featuredRooms = rooms.filter((room) => room.featured === true);
    setRooms(rooms);
    setFeaturedRooms(featuredRooms);
    setSortedRooms(rooms);
    setLoading(false);
  }, []);

  return (
    <RoomContext.Provider
      value={{ rooms, sortedRooms, featuredRooms, loading, getRoom }}
    >
      {children}
    </RoomContext.Provider>
  );
};

export const useGlobalcontext = () => {
  return useContext(RoomContext);
};

export default RoomProvider;
