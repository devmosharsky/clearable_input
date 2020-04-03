import React, {useDebugValue} from 'react';
import {render} from 'react-dom';

import css from './main.module.scss';
import {ClearableInput} from "./ClearableInput";
const Main: React.FunctionComponent<any> = () => {    
    return (
    <div className={css.main}>        
        <ClearableInput/>
    </div>
)}

const root = document.getElementById('root');
render(<Main/>, root);