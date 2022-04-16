import React, { useCallback } from "react";
import { useContext } from "react";
import items from "./data";
import { useState, useEffect } from "react";

export const RoomContext = React.createContext();

const RoomProvider = ({ children }) => {
  const [rooms, setRooms] = useState([]);
  const [sortedRooms, setSortedRooms] = useState([]);
  const [featuredRooms, setFeaturedRooms] = useState([]);
  const [loading, setLoading] = useState(true);
  const [type, setType] = useState("all");
  const [capacity, setCapacity] = useState(1);
  const [price, setPrice] = useState(600);
  const [minPrice, setMinPrice] = useState(0);
  const [maxPrice, setMaxPrice] = useState(0);
  const [breakfast, setBreakfast] = useState(false);
  const [pets, setPets] = useState(false);
  const [minSize, setMinSize] = useState(0);
  const [maxSize, setMaxSize] = useState(0);

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

  const handleChange = (e) => {
    if (e.target.name === "type") {
      const value = e.target.value;
      setType(value);
    } else if (e.target.name === "capacity") {
      const value = e.target.value;
      setCapacity(value);
    } else if (e.target.type === "range") {
      const value = e.target.value;
      setPrice(value);
    } else if (e.target.name === "minSize") {
      const value = e.target.value;
      setMinSize(value);
    } else if (e.target.name === "maxSize") {
      const value = e.target.value;
      setMaxSize(value);
    } else if (e.target.name === "pets") {
      setPets(!pets);
    } else if (e.target.name === "breakfast") {
      setBreakfast(!breakfast);
    }
  };

  //transform capacity value to number
  let cap = parseInt(capacity);
  // let inputPrice = parseInt(price);

  const filterRooms = useCallback(() => {
    let tempRooms = [...rooms];

    //filter by type
    if (type !== "all") {
      tempRooms = tempRooms.filter((room) => room.type === type);
    }

    //filter by capacity
    if (cap !== 1) {
      tempRooms = tempRooms.filter((room) => room.capacity >= cap);
    }

    //filter by price

    tempRooms = tempRooms.filter((room) => room.price <= price);

    //filter by size
    tempRooms = tempRooms.filter(
      (room) => room.size >= minSize && room.size <= maxSize
    );

    //filter by breakfast
    if (breakfast) {
      tempRooms = tempRooms.filter((room) => room.breakfast === true);
    }
    //filter by pets
    if (pets) {
      tempRooms = tempRooms.filter((room) => room.pets === true);
    }

    setSortedRooms(tempRooms);
  }, [
    type,
    rooms,
    setSortedRooms,
    cap,
    price,
    maxSize,
    minSize,
    breakfast,
    pets,
  ]);

  useEffect(() => {
    filterRooms();
  }, [filterRooms]);

  useEffect(() => {
    let rooms = formatData(items);
    let featuredRooms = rooms.filter((room) => room.featured === true);
    setRooms(rooms);
    setFeaturedRooms(featuredRooms);
    setSortedRooms(rooms);
    setLoading(false);
    let getMaxPrice = Math.max(...rooms.map((item) => item.price));
    setMaxPrice(getMaxPrice);
    let getMaxSize = Math.max(...rooms.map((item) => item.size));
    setMaxSize(getMaxSize);
    setPrice(maxPrice);
  }, [maxPrice]);

  return (
    <RoomContext.Provider
      value={{
        rooms,
        sortedRooms,
        featuredRooms,
        loading,
        getRoom,
        maxPrice,
        maxSize,
        minPrice,
        minSize,
        price,
        capacity,
        type,
        breakfast,
        pets,
        handleChange,
      }}
    >
      {children}
    </RoomContext.Provider>
  );
};

export const useGlobalcontext = () => {
  return useContext(RoomContext);
};

export default RoomProvider;
