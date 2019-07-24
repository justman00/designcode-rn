import React from "react";
import styled from "styled-components";

function ProjectsScreen(props) {
  return (
    <Container>
      <Text>Projects Screen</Text>
    </Container>
  );
}

ProjectsScreen.navigationOptions = {
  header: null
};

export default ProjectsScreen;

const Container = styled.View`
  flex: 1;
  justify-content: center;
  align-items: center;
`;

const Text = styled.Text``;
