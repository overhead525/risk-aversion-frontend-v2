import React from "react";

interface RiskRewardProps {
  flowStepUpdateFn: React.Dispatch<any>;
  setupFormUpdateFn: (obj: { [key: string]: string | number }) => void;
}

const RiskReward: React.FC<RiskRewardProps> = () => {
  return (
    <div>
      <h1>Risk and Reward</h1>
    </div>
  );
};

export default RiskReward;
