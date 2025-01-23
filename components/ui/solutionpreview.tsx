import React from 'react';

interface SolutionPreviewProps {
  solution: string;
}

const SolutionPreview: React.FC<SolutionPreviewProps> = ({ solution }) => {
  return (
    <div>
      <h3>生成された解答</h3>
      <p>{solution}</p>
    </div>
  );
};

export default SolutionPreview;