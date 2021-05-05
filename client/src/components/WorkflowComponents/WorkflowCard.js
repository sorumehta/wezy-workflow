import React from 'react';

const WorkflowCard = ({id, name, isActive}) => {
    return (
      <div>
          <h3>{id}, {name}, {isActive}</h3>
      </div>
    );
};

export default WorkflowCard;