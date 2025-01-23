import React, { useState } from 'react';

interface VariableInputFormProps {
  template: string;
  solutionTemplate: string;
  setVariables: (variables: Record<string, string>) => void;
}

const VariableInputForm: React.FC<VariableInputFormProps> = ({ template, solutionTemplate, setVariables }) => {
  const [inputs, setInputs] = useState<Record<string, string>>({});

  const handleChange = (varName: string, value: string) => {
    setInputs({ ...inputs, [varName]: value });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setVariables(inputs);
  };

  const vars = [...new Set([...(template.match(/\{([^}]+)\}/g) || []), ...(solutionTemplate.match(/\{([^}]+)\}/g) || [])])];

  return (
    <form onSubmit={handleSubmit}>
      {vars.map((varName, index) => {
        const cleanVarName = varName.replace(/[{}]/g, '');
        return (
          <div key={index}>
            <label>{cleanVarName}: </label>
            <input
              type="text"
              value={inputs[cleanVarName] || ''}
              onChange={(e) => handleChange(cleanVarName, e.target.value)}
            />
          </div>
        );
      })}
      <button type="submit">問題と解答を生成</button>
    </form>
  );
};

export default VariableInputForm;