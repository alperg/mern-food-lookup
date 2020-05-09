import React, { useState, useEffect } from "react";
import { Card, Icon, Table } from "semantic-ui-react";
import API from "../../utils/Api";
import useDebounce from "../../utils/debounceHook";

const MATCHING_ITEM_LIMIT = 25; 

function FoodSearch() {
  const [foods, setFoods] = useState([]);
  const [showRemoveIcon, setShowRemoveIcon] = useState(false);
  const [searchValue, setSearchValue] = useState("");

  const debouncedSearchTerm = useDebounce(searchValue, 500);

  useEffect(() => {
    if (!searchValue) {
      setFoods([]);
      setShowRemoveIcon(false);
      return;
    }

    setShowRemoveIcon(true);

    if (debouncedSearchTerm) {
      API.search(searchValue).then(result => {
        const foods = result.slice(0, MATCHING_ITEM_LIMIT)
        setFoods(foods);
      });
    }
  }, [debouncedSearchTerm]);

  const handleSearchChange = (e) => {
    setSearchValue(e.target.value);
  }

  const handleSearchCancel = () => {
    setFoods([]);
    setShowRemoveIcon(false);
    setSearchValue("");
  };

  const removeIconStyle = showRemoveIcon ? {} : { visibility: "hidden" };

  const foodRows = foods.map((food, idx) => (
    <Table.Row key={idx} onClick={() => this.props.onFoodClick(food)}>
      <Table.Cell>{food.description}</Table.Cell>
      <Table.Cell className="right aligned">{food.kcal}</Table.Cell>
      <Table.Cell className="right aligned">{food.protein_g}</Table.Cell>
      <Table.Cell className="right aligned">{Number(food.fat_g).toFixed(2)}</Table.Cell>
      <Table.Cell className="right aligned">{food.carbohydrate_g}</Table.Cell>
    </Table.Row>
  ));

  return (
    <>
      <div className="ui fluid search">
        <div className="ui icon input">
          <input
            className="prompt"
            type="text"
            placeholder="Search foods..."
            value={searchValue}
            onChange={handleSearchChange}
          />
          <i className="search icon" />
        </div>
        <i
          className="remove icon"
          onClick={handleSearchCancel}
          style={removeIconStyle}
        />
      </div>
      <Card fluid color='yellow' style={{ marginBottom: '2em' }}>
        <Card.Content header="Available Foods"></Card.Content>
        <Card.Content>
          <Table striped selectable fixed size="small" basic='very' style={{ marginBottom: '3em' }}>
            <Table.Header>
              <Table.Row>
                <Table.HeaderCell width="eight">Description</Table.HeaderCell>
                <Table.HeaderCell textAlign='right'>Kcal</Table.HeaderCell>
                <Table.HeaderCell textAlign='right'>Protein (g)</Table.HeaderCell>
                <Table.HeaderCell textAlign='right'>Fat (g)</Table.HeaderCell>
                <Table.HeaderCell textAlign='right'>Carbs (g)</Table.HeaderCell>
              </Table.Row>
            </Table.Header>
            <Table.Body>
              {foodRows}
            </Table.Body>
          </Table>
        </Card.Content>
        <Card.Content extra>
          {foodRows.length === 0 && <><Icon name='food' />No Food Returned</>}
          {foodRows.length === 1 && <><Icon name='food' />1 Food Returned</>}
          {foodRows.length > 1 && <><Icon name='food' />{foodRows.length} Foods Returned</>}
        </Card.Content>
      </Card>
    </>
  );
  
}

export default FoodSearch;
