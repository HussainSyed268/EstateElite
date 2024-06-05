import { useState } from 'react';

export const useSelection = (initialItems = []) => {
  const [selected, setSelected] = useState(new Set());

  const selectAll = () => {
    setSelected(new Set(initialItems.map(item => item.id)));
  };

  const deselectAll = () => {
    setSelected(new Set());
  };

  const selectOne = (id) => {
    setSelected(prevSelected => new Set(prevSelected).add(id));
  };

  const deselectOne = (id) => {
    setSelected(prevSelected => {
      const newSelected = new Set(prevSelected);
      newSelected.delete(id);
      return newSelected;
    });
  };

  return {
    selected,
    selectAll,
    deselectAll,
    selectOne,
    deselectOne
  };
};
