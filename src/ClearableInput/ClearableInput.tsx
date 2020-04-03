import * as React from "react";
import { hot } from "react-hot-loader";
import css from "./clearableInput.module.scss";

type Input = HTMLInputElement;
type Props = Partial<React.InputHTMLAttributes<Input>>;

const makeHRM = hot(module);
export const ClearableInput = makeHRM((prop: Props) => {
    const { readOnly, disabled, onChange = () => {} } = prop;
    const inputRef = React.useRef<Input>();
    const [value, setValue] = React.useState("");
    const nativeChange = React.useCallback((e) => {
        console.log(e);
    }, []);

    React.useEffect(() => {
        const input = inputRef.current;
        input.addEventListener('change', nativeChange);
        return () => input.removeEventListener('change', nativeChange);
    })

    const selfChange = (e: React.ChangeEvent<Input>) => {
        setValue(e.target.value);
        onChange(e);
        console.log(e, e.nativeEvent);
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
                    input.value = "";                    
                    const inputEvent = new InputEvent('change', {                        
                        bubbles: true,
                        data: "",
                        inputType: "insertText"
                    });                    
                    input.dispatchEvent(inputEvent);                                        
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
