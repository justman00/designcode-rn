import React from "react";
import styled from "styled-components";
import { useDispatch } from "react-redux";

function Avatar() {
  const dispatch = useDispatch();

  const updateName = React.useCallback(
    name => dispatch({ type: "UPDATE_NAME", payload: name }),
    []
  );

  const [photo, setPhoto] = React.useState("");

  React.useEffect(() => {
    fetch("https://uinames.com/api/?ext&gender=male&region=germany")
      .then(res => res.json())
      .then(res => {
        setPhoto(res.photo);
        updateName(res.name);
      })
      .catch(err => console.error(err));
  }, []);

  return (
    <Image
      source={photo ? { uri: photo } : require("../assets/avatar-default.jpg")}
    />
  );
}

export default Avatar;

const Image = styled.Image`
  width: 44px;
  height: 44px;
  border-radius: 22px;
  margin-left: 20px;
`;
