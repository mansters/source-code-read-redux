import React from 'react'

export interface ITodoProps {
  onClick: (event: React.MouseEvent<HTMLLIElement, MouseEvent>) => void;
  completed: boolean;
  text: string;
}

const Todo: React.FC<ITodoProps> = ({ onClick, completed, text }) => (
  <li
    onClick={onClick}
    style={{
      textDecoration: completed ? 'line-through' : 'none'
    }}
  >
    {text}
  </li>
)

export default Todo