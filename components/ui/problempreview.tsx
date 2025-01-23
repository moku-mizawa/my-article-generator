import React from 'react';

interface ProblemPreviewProps {
  problem: string;
}

const ProblemPreview: React.FC<ProblemPreviewProps> = ({ problem }) => {
  return (
    <div>
      <h3>生成された問題</h3>
      <p>{problem}</p>
    </div>
  );
};

export default ProblemPreview;