import * as React from "react";
import { hot } from "react-hot-loader";
import css from "./clearableInput.module.scss";

type Input = HTMLInputElement;
type Props = Partial<React.InputHTMLAttributes<Input>>;

//const makeHRM = hot(module);
export const ClearableInput = ((prop: Props) => {
    const { value: propValue, readOnly, disabled, onChange = () => {} } = prop;
    const inputRef = React.useRef<Input>();
    const [value, setValue] = React.useState(propValue || "");   
    
    const selfChange = (e: React.ChangeEvent<Input>) => {
        setValue(e.target.value);
        onChange(e);        
    };

    return (
        <div className={css.clearableInput}>
            <input {...{ ...prop, onChange: selfChange }} ref={inputRef}></input>            
            <ClearButton
                visibility={!readOnly && !disabled && !!value}
                onClick={(event) => {
                    event.preventDefault();
                    event.stopPropagation();
                    const input = inputRef.current;
                    // react wtf                               
                    var nativeInputValueSetter = Object.getOwnPropertyDescriptor(window.HTMLInputElement.prototype, "value").set;
                    nativeInputValueSetter.call(input, '');                    
                    var ev2 = new Event('input', { bubbles: true});
                    input.dispatchEvent(ev2); 
                }}
            />
        </div>
    );
});

type ButtonProps = {
    visibility: boolean;
    onClick: (e: React.MouseEvent<HTMLButtonElement>) => void;
};

const ClearButton = ({ visibility, onClick }: ButtonProps) => {
    if (visibility) {
        return <button onClick={onClick}>x</button>;
    } else {
        return <></>;
    }
};
