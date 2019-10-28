import React, { useState } from 'react';
import Select from 'react-select';

const SkillInput = props => {

  const [selectedOption, setSelectedOption] = useState(null);

  const { options, setQuestionSkills } = { ...props };

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