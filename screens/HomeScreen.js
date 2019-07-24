import React from "react";
import {
  ScrollView,
  SafeAreaView,
  TouchableOpacity,
  Animated,
  Easing,
  StatusBar
} from "react-native";
import styled from "styled-components";
import { Icon } from "expo";
import { useDispatch, useSelector } from "react-redux";

import Avatar from "../components/Avatar";
import Card from "../components/Card";
import Logo from "../components/Logo";
import Course from "../components/Course";
import Menu from "../components/Menu";

const initialAnimation = new Animated.Value(1);
const initialOpacity = new Animated.Value(1);

export default function HomeScreen(props) {
  const [scale, setScale] = React.useState(initialAnimation);
  const [opacity, setOpacity] = React.useState(initialOpacity);
  const action = useSelector(state => state.action);
  const name = useSelector(state => state.name);
  const dispatch = useDispatch();

  const openMenu = React.useCallback(() => dispatch({ type: "OPEN_MENU" }), []);

  React.useEffect(() => {
    StatusBar.setBarStyle("dark-content", true);
    toggleMenu();
  }, [action]);

  const toggleMenu = () => {
    if (action === "openMenu") {
      Animated.timing(scale, {
        toValue: 0.9,
        duration: 300,
        easing: Easing.in()
      }).start();

      Animated.spring(opacity, {
        toValue: 0.5
      }).start();

      StatusBar.setBarStyle("light-content", true);
    }

    if (action === "closeMenu") {
      Animated.timing(scale, {
        toValue: 1,
        duration: 300,
        easing: Easing.in()
      }).start();

      Animated.spring(opacity, {
        toValue: 1
      }).start();

      StatusBar.setBarStyle("dark-content", true);
    }
  };

  return (
    <RootView>
      <Menu />

      <AnimatedContainer style={{ transform: [{ scale }], opacity }}>
        <SafeAreaView>
          <ScrollView>
            <TitleBar>
              <TouchableOpacity
                onPress={openMenu}
                style={{ position: "absolute" }}
              >
                <Avatar />
              </TouchableOpacity>
              <Title>Welcome back,</Title>
              <Name>{name}</Name>
              <Icon.Ionicons
                name="ios-notifications"
                size={32}
                color="#4775f2"
                style={{ position: "absolute", right: 20, top: 5 }}
              />
            </TitleBar>
            <ScrollView
              horizontal
              style={{
                flexDirection: "row",
                padding: 20,
                paddingLeft: 12,
                paddingTop: 30
              }}
              showsHorizontalScrollIndicator={false}
            >
              {logos.map(logo => (
                <Logo {...logo} key={logo.text} />
              ))}
            </ScrollView>
            <Subtitle>Continue Learning</Subtitle>
            <ScrollView
              horizontal
              style={{ paddingBottom: 30 }}
              showsHorizontalScrollIndicator={false}
            >
              {cards.map(card => (
                <TouchableOpacity
                  key={card.title}
                  onPress={() => {
                    props.navigation.push("Section", {
                      section: card
                    });
                  }}
                >
                  <Card {...card} />
                </TouchableOpacity>
              ))}
            </ScrollView>
            <Subtitle>Popular Courses</Subtitle>
            {courses.map(course => (
              <Course {...course} key={course.title} />
            ))}
          </ScrollView>
        </SafeAreaView>
      </AnimatedContainer>
    </RootView>
  );
}

HomeScreen.navigationOptions = {
  header: null
};

const RootView = styled.View`
  background: black;
  flex: 1;
`;

const Container = styled.View`
  flex: 1;
  background-color: #f0f3f5;
  border-top-left-radius: 10px;
  border-top-right-radius: 10px;
  overflow: hidden;
`;

const AnimatedContainer = Animated.createAnimatedComponent(Container);

const Title = styled.Text`
  font-size: 16px;
  color: #b8bece;
  font-weight: 500;
`;
const Name = styled.Text`
  font-size: 20px;
  color: #3c4560;
  font-weight: bold;
`;

const TitleBar = styled.View`
  width: 100%;
  margin-top: 50px;
  padding-left: 80px;
`;

const Subtitle = styled.Text`
  color: #b8bece;
  font-weight: 600;
  font-size: 15px;
  margin-left: 20px;
  margin-top: 20px;
  text-transform: uppercase;
`;

const logos = [
  {
    image: require("../assets/logo-framerx.png"),
    text: "Framer X"
  },
  {
    image: require("../assets/logo-figma.png"),
    text: "Figma"
  },
  {
    image: require("../assets/logo-studio.png"),
    text: "Studio"
  },
  {
    image: require("../assets/logo-react.png"),
    text: "React"
  },
  {
    image: require("../assets/logo-swift.png"),
    text: "Swift"
  },
  {
    image: require("../assets/logo-sketch.png"),
    text: "Sketch"
  }
];

const cards = [
  {
    title: "React Native for Designers",
    image: require("../assets/background11.jpg"),
    logo: require("../assets/logo-react.png"),
    caption: "React Native",
    subtitle: "1 of 12 sections"
  },
  {
    title: "Styled Components",
    image: require("../assets/background12.jpg"),
    logo: require("../assets/logo-react.png"),
    caption: "React Native",
    subtitle: "2 of 12 sections"
  },
  {
    title: "Props and Icons",
    image: require("../assets/background13.jpg"),
    logo: require("../assets/logo-react.png"),
    caption: "React Native",
    subtitle: "3 of 12 sections"
  },
  {
    title: "Static Data and Loop",
    image: require("../assets/background14.jpg"),
    logo: require("../assets/logo-react.png"),
    caption: "React Native",
    subtitle: "4 of 12 sections"
  }
];

const courses = [
  {
    title: "Prototype in InVision Studio",
    subtitle: "10 sections",
    image: require("../assets/background13.jpg"),
    logo: require("../assets/logo-studio.png"),
    author: "Meng To",
    avatar: require("../assets/avatar.jpg"),
    caption: "Design an interactive prototype using Auto-Animate"
  },
  {
    title: "React for Designers",
    subtitle: "12 sections",
    image: require("../assets/background11.jpg"),
    logo: require("../assets/logo-react.png"),
    author: "Meng To",
    avatar: require("../assets/avatar.jpg"),
    caption: "Learn to design and code a React site"
  },
  {
    title: "Design and Code with Framer X",
    subtitle: "10 sections",
    image: require("../assets/background14.jpg"),
    logo: require("../assets/logo-framerx.png"),
    author: "Meng To",
    avatar: require("../assets/avatar.jpg"),
    caption: "Create powerful design and code components for your app"
  },
  {
    title: "Design System in Figma",
    subtitle: "10 sections",
    image: require("../assets/background6.jpg"),
    logo: require("../assets/logo-figma.png"),
    author: "Meng To",
    avatar: require("../assets/avatar.jpg"),
    caption:
      "Complete guide to designing a site using a collaborative design tool"
  }
];
