import React, { useState } from 'react';
import { Form, FormControl, Dropdown } from 'react-bootstrap';

const SearchBar = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCity, setSelectedCity] = useState('');
  const [selectedSpecialty, setSelectedSpecialty] = useState('');

  const handleInputChange = (event) => {
    setSearchTerm(event.target.value);
  };

  const handleSpecialtyChange = (event) => {
    setSelectedSpecialty(event.target.value);
  };

  const handleCityChange = (event) => {
    setSelectedCity(event.target.value);
  };

  return (
    <Form>
      <FormControl
        type="text"
        placeholder="Search by specialty or hospital..."
        value={selectedSpecialty}
        onChange={handleSpecialtyChange}
      />
      <Dropdown>
        <Dropdown.Toggle variant="outline-secondary" id="city-dropdown">
          {selectedCity || 'Select city...'}
        </Dropdown.Toggle>

        <Dropdown.Menu>
          <Dropdown.Item eventKey="city1" onSelect={handleCityChange}>
            City 1
          </Dropdown.Item>
          <Dropdown.Item eventKey="city2" onSelect={handleCityChange}>
            City 2
          </Dropdown.Item>
          <Dropdown.Item eventKey="city3" onSelect={handleCityChange}>
            City 3
          </Dropdown.Item>
        </Dropdown.Menu>
      </Dropdown>
      <FormControl
        type="text"
        placeholder="Search by name..."
        value={searchTerm}
        onChange={handleInputChange}
      />
    </Form>
  );
};

export default SearchBar;