import React from 'react';
const RoleBasedWrapper = ({ roleHierarchy,currentRole, children }) => {
    const currentRoleIndex = roleHierarchy.indexOf(currentRole);
    return React.Children.toArray(children).filter(child => {
      const childRoleIndex = roleHierarchy.indexOf(child.type.name);
      return childRoleIndex >= currentRoleIndex;
    });
  };
  export default RoleBasedWrapper;