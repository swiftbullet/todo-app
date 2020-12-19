import { DefaultTheme } from 'styled-components';

const styles: DefaultTheme = {
  resetButton: `
    padding: 0;
    border: none;
    background: none;
    color: #000;
    cursor: pointer;
  `,
  resetInput: `
    padding: 0;
    width: 100%;
    border: none;
    background: none;
    cursor: pointer;
  `,
  addButton: `
    display: flex;
    align-items: center;
    padding: 0;
    width: 40px;
    height: 40px;
    border: none;
    font-size: 15px;
    background: #ff7256;
    color: #fff;
    cursor: pointer;
  `
};

export default styles;