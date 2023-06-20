import { FormControl, MenuItem, Select } from '@material-ui/core';
import React, { useEffect } from 'react';
import { convertCamelCaseToSpaces } from '../helpers/helpers';
export default function SelectStage({ optionsArr, updateLead, currentStage }) {
  const [value, setValue] = React.useState(currentStage);

  //   useEffect(() => {
  //     console.log(value);
  //   }, [value]);

  const handleChange = (event) => {
    setValue(event.target.value);
    updateLead('stage', event.target.value);
  };

  return (
    <FormControl sx={{ m: 1, minWidth: 120 }}>
      <Select
        value={value}
        onChange={handleChange}
        displayEmpty
        inputProps={{ 'aria-label': 'Without label' }}>
        <MenuItem value="">
          <em>None</em>
        </MenuItem>
        {optionsArr.map((option) => {
          return (
            <MenuItem value={option.name}>
              {convertCamelCaseToSpaces(option.name)}
            </MenuItem>
          );
        })}
      </Select>
    </FormControl>
  );
}
