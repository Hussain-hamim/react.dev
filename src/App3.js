import { useContext, useState } from "react";
import { places } from "./data.js";
import { getImageUrl } from "./utils.js";
import { ImageContext } from "./Context.js";

export default function App() {
  const [isLarge, setIsLarge] = useState(false);
  const imageSize = isLarge ? 150 : 100;

  return (
    <>
      <label>
        <input
          type="checkbox"
          checked={isLarge}
          onChange={(e) => {
            setIsLarge(e.target.checked);
          }}
        />
        Use large images
      </label>
      <hr />

      {/* // provide context */}
      <ImageContext.Provider value={imageSize}>
        <List />
      </ImageContext.Provider>
    </>
  );
}

function List() {
  const listItems = places.map((place) => (
    <li key={place.id}>
      <Place place={place} />
    </li>
  ));
  return <ul>{listItems}</ul>;
}

function Place({ place }) {
  return (
    <>
      <PlaceImage place={place} />
      <p>
        <b>{place.name}</b>
        {": " + place.description}
      </p>
    </>
  );
}

function PlaceImage({ place }) {
  // use context
  const imageSize = useContext(ImageContext);

  return (
    <img
      style={{ borderRadius: "20px", borderStyle: "dashed" }}
      src={getImageUrl(place)}
      alt={place.name}
      width={imageSize}
      height={imageSize}
    />
  );
}
