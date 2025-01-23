import React from 'react';

interface ExportButtonProps {
  problem: string;
  solution: string;
}

const ExportButton: React.FC<ExportButtonProps> = ({ problem, solution }) => {
  const handleExport = () => {
    const problemBlob = new Blob([problem], { type: 'text/plain' });
    const solutionBlob = new Blob([solution], { type: 'text/plain' });
    const problemUrl = URL.createObjectURL(problemBlob);
    const solutionUrl = URL.createObjectURL(solutionBlob);
    const problemLink = document.createElement('a');
    problemLink.href = problemUrl;
    problemLink.download = 'problem.tex';
    problemLink.click();
    const solutionLink = document.createElement('a');
    solutionLink.href = solutionUrl;
    solutionLink.download = 'solution.tex';
    solutionLink.click();
    URL.revokeObjectURL(problemUrl);
    URL.revokeObjectURL(solutionUrl);
  };

  return (
    <button onClick={handleExport}>LaTeX形式でエクスポート</button>
  );
};

export default ExportButton;