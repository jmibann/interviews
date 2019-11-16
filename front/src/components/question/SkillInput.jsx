import React, { useState } from 'react';
import Select from 'react-select';

const SkillInput = ({ options, setQuestionSkills, initialSelected = null }) => {

  const [selectedOption, setSelectedOption] = useState(initialSelected);

  const handleChange = selectedOption => {
    setQuestionSkills(selectedOption ? selectedOption.map(option => option.id) : []);
    setSelectedOption(selectedOption);
  };

  return (
    <div>
      <Select
        isMulti
        name="colors"
        classNamePrefix="select"
        placeholder={'Select skills'}
        className="basic-multi-select"
        options={options}
        value={selectedOption}
        onChange={handleChange}
        getOptionLabel={option => `${option.skill}`}
        getOptionValue={option => `${option.id}`}
      />
    </div>
  );
}

export default SkillInput;