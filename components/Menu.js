import React from "react";
import styled from "styled-components";
import { Animated, TouchableOpacity, Dimensions } from "react-native";
import { Icon } from "expo";
import { useSelector, useDispatch } from "react-redux";

import MenuItem from "./MenuItem";

const initialState = {
  top: new Animated.Value(900)
};

const screenHeight = Dimensions.get("window").height;

function Menu() {
  const action = useSelector(state => state.action);
  const dispatch = useDispatch();
  const closeMenu = React.useCallback(() => dispatch({ type: "CLOSE_MENU" }), [
    dispatch
  ]);
  const [state, setState] = React.useState(initialState);

  React.useEffect(() => {
    toggleMenu();
  }, [action]);

  const toggleMenu = React.useCallback(() => {
    if (action === "openMenu") {
      Animated.spring(state.top, {
        toValue: 54
      }).start();
    } else if (action === "closeMenu") {
      Animated.spring(state.top, {
        toValue: screenHeight
      }).start();
    }
  }, [action]);

  return (
    <AnimatedContainer style={{ top: state.top }}>
      <Cover>
        <Image source={require("../assets/background2.jpg")} />
        <Title>Vlad</Title>
        <Subtitle>Designer at Design+Code</Subtitle>
      </Cover>
      <TouchableOpacity
        onPress={closeMenu}
        style={{
          position: "absolute",
          top: 120,
          left: "50%",
          marginLeft: -22,
          zIndex: 1
        }}
      >
        <CloseView>
          <Icon.Ionicons name="ios-close" size={44} color="#546bfb" />
        </CloseView>
      </TouchableOpacity>
      <Content>
        {items.map(item => (
          <MenuItem {...item} key={item.title} />
        ))}
      </Content>
    </AnimatedContainer>
  );
}

export default Menu;

const Image = styled.Image`
  position: absolute;
  width: 100%;
  height: 100%;
`;

const Title = styled.Text`
  color: white;
  font-size: 24px;
  font-weight: 600;
`;

const Subtitle = styled.Text`
  color: rgba(255, 255, 255, 0.5);
  font-size: 13px;
  margin-top: 8px;
`;

const CloseView = styled.View`
  width: 44px;
  height: 44px;
  border-radius: 22px;
  background: white;
  justify-content: center;
  align-items: center;
  box-shadow: 0 5px 10px rgba(0, 0, 0, 0.15);
`;

const Container = styled.View`
  position: absolute;
  background: white;
  width: 100%;
  height: 100%;
  z-index: 100;
  border-radius: 10px;
  overflow: hidden;
`;

const AnimatedContainer = Animated.createAnimatedComponent(Container);

const Cover = styled.View`
  height: 142px;
  background: black;
  justify-content: center;
  align-items: center;
`;

const Content = styled.View`
  padding: 50px;
  height: ${screenHeight};
  background: #f0f3f5;
`;

const items = [
  {
    icon: "ios-settings",
    title: "Account",
    text: "settings"
  },
  {
    icon: "ios-card",
    title: "Billing",
    text: "payments"
  },
  {
    icon: "ios-compass",
    title: "Learn React",
    text: "start course"
  },
  {
    icon: "ios-exit",
    title: "Log out",
    text: "see you soon!"
  }
];
