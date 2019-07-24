import React from "react";
import styled from "styled-components";

function CoursesScreen(props) {
  return (
    <Container>
      <Text>Courses Screen</Text>
    </Container>
  );
}

CoursesScreen.navigationOptions = {
  header: null
};

export default CoursesScreen;

const Container = styled.View`
  flex: 1;
  justify-content: center;
  align-items: center;
`;

const Text = styled.Text``;
