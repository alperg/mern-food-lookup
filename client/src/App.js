import React, { useState } from "react";
import { Grid, Container, Menu, Image } from 'semantic-ui-react';
import SelectedFoods from "./components/SelectedFoods/";
import FoodSearch from "./components/FoodSearch/";
import logo from "./assets/images/logo.png";

const fixedMenuStyle = {
  backgroundColor: '#ececec',
  border: '1px solid #ddd',
  boxShadow: '0px 3px 5px rgba(0, 0, 0, 0.2)'
};

function App() {
  const [ selectedFoods, setSelectedFoods ] = useState([]);

  const removeFoodItem = itemIndex => {
    const filteredFoods = selectedFoods.filter(
      (item, idx) => itemIndex !== idx
    );
    setSelectedFoods(filteredFoods);
  };

  const addFood = food => {
    const newFoods = selectedFoods.concat(food);
    setSelectedFoods(newFoods);
  };

  return (
    <div style={{ padding: '1.2em' }}>
      
      <Menu borderless fixed="top" style={fixedMenuStyle}>
        <Container fluid>
          <Menu.Item>
            <Image size="mini" src={logo} />
          </Menu.Item>
          <Menu.Item header style={{ fontSize: 22 }}>Food Lookup Demo</Menu.Item>
        </Container>
      </Menu>

      <Container fluid style={{ marginTop: '4.6em' }}>
        <Grid divided="vertically">
          <Grid.Row columns="2">
            <Grid.Column>
              <FoodSearch onFoodClick={addFood} />
            </Grid.Column>
            <Grid.Column>
              <SelectedFoods foods={selectedFoods} onFoodClick={removeFoodItem} />
            </Grid.Column>
          </Grid.Row>
        </Grid>
      </Container>
    </div>
  );
  
}

export default App;
