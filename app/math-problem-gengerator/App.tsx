'use client';

import React, { useState } from 'react';
import TemplateForm from '@/components/ui/templateform';
import VariableInputForm from '@/components/ui/variableinputform';
import ProblemPreview from '@/components/ui/problempreview';
import SolutionPreview from '@/components/ui/solutionpreview';
import ExportButton from '@/components/ui/exportbutton';
import '@/app/globals.css';
const App: React.FC = () => {
  const [template, setTemplate] = useState('');
  const [solutionTemplate, setSolutionTemplate] = useState('');
  const [variables, setVariables] = useState<Record<string, string>>({});
  const [problem, setProblem] = useState('');
  const [solution, setSolution] = useState('');

  const generateProblemAndSolution = () => {
    let generatedProblem = template;
    let generatedSolution = solutionTemplate;
    Object.keys(variables).forEach(varName => {
      generatedProblem = generatedProblem.replace(new RegExp(`\\{${varName}\\}`, 'g'), variables[varName]);
      generatedSolution = generatedSolution.replace(new RegExp(`\\{${varName}\\}`, 'g'), variables[varName]);
    });
    setProblem(generatedProblem);
    setSolution(generatedSolution);
  };

  return (
    <div>
      <h1>高校数学問題生成アプリ</h1>
      <TemplateForm setTemplate={setTemplate} setSolutionTemplate={setSolutionTemplate} />
      {template && solutionTemplate && (
        <VariableInputForm
          template={template}
          solutionTemplate={solutionTemplate}
          setVariables={setVariables}
        />
      )}
      {problem && <ProblemPreview problem={problem} />}
      {solution && <SolutionPreview solution={solution} />}
      {problem && solution && <ExportButton problem={problem} solution={solution} />}
    </div>
  );
};

export default App;