import React, { useState } from 'react';

interface TemplateFormProps {
  setTemplate: (template: string) => void;
  setSolutionTemplate: (solutionTemplate: string) => void;
}

const TemplateForm: React.FC<TemplateFormProps> = ({ setTemplate, setSolutionTemplate }) => {
  const [problemInput, setProblemInput] = useState('');
  const [solutionInput, setSolutionInput] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setTemplate(problemInput);
    setSolutionTemplate(solutionInput);
  };

  return (
    <form onSubmit={handleSubmit}>
      <textarea
        value={problemInput}
        onChange={(e) => setProblemInput(e.target.value)}
        placeholder="問題テンプレートを入力してください。例: {a} + {b} = ?"
      />
      <textarea
        value={solutionInput}
        onChange={(e) => setSolutionInput(e.target.value)}
        placeholder="解答テンプレートを入力してください。例: {a} + {b} = {c}"
      />
      <button type="submit">テンプレートを設定</button>
    </form>
  );
};

export default TemplateForm;