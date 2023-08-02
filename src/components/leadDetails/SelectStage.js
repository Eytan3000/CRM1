import { FormControl, MenuItem, Select } from '@material-ui/core';
import React, { useContext, useEffect, useState } from 'react';
import { convertCamelCaseToSpaces } from '../../helpers/helpers';
import { loadStagesContext } from '../../contexts/DbFunctionsContext';
//--------------------------------------------------------------

export default function SelectStage({
  updateLead,
  currentStage,
  setEditKey,
  setEditClicked,
}) {
  const [value, setValue] = React.useState(currentStage);
  const loadStagesCtx = useContext(loadStagesContext);

  const [optionsArr, setOptionsArr] = useState([]);

  // useEffect(() => {
  //   (async () => {
  //     setOptionArr(stagesCtx.stageState);
  //     console.log('useEffect');
  //   })();
  // }, []);

  //load Stages
  useEffect(() => {
    (async () => {
      const arr = await loadStagesCtx();
      setOptionsArr(arr);
      // stagesPassUp(arr);
    })();
  }, []);

  const handleChange = (event) => {
    setValue(event.target.value);
    updateLead('stage', event.target.value);
    // setEditKey('');
    setEditClicked(false);
  };
  return (
    <FormControl sx={{ m: 1, minWidth: 120 }}>
      <Select
        value={value}
        onChange={handleChange}
        displayEmpty
        inputProps={{ 'aria-label': 'Without label' }}>
        {optionsArr.map((option) => {
          return (
            <MenuItem value={option.name} key={option.id}>
              {convertCamelCaseToSpaces(option.name)}
            </MenuItem>
          );
        })}
      </Select>
    </FormControl>
  );
}
