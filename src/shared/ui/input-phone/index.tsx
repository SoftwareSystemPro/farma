import React, { ChangeEventHandler, FC } from 'react';
import InputMask from 'react-input-mask';

import { Input } from '@mantine/core';

export interface IInputProps {
  value?: string | number;
  onChange?: React.ChangeEventHandler<HTMLInputElement>;
  onBlur?: React.FocusEventHandler<HTMLInputElement>;
  placeholder?: string;
  variant?: 'default' | 'error' | 'success' | 'no-action' | 'search';
  className?: string;
  leftIcon?: boolean;
  type?: React.HTMLInputTypeAttribute;
  name?: string;
  id?: string;
  maxLength?: number;
  disabled?: boolean;
  onSearchClearClick?: () => void;
  onFocus?: React.FocusEventHandler<HTMLInputElement>;
  error?: string;
  style?: React.CSSProperties;
}

interface Props extends IInputProps {
  value?: string | number;
  onChange?: ChangeEventHandler;
}

export const InputPhone: FC<Props> = ({
                                        onBlur,
                                        value,
                                        onChange,
                                        id,
                                        name,
                                        variant,
                                        className,
                                        placeholder,
                                        error,
                                      }) => {

  const handleInputProps = (inputProps: IInputProps) => {
    return (
      <Input
        {...inputProps}
        error={error}
        id={id}
        name={name}
        variant={variant}
        className={className}
        placeholder={placeholder}
      />

    );
  };
  return (
    <InputMask
      onBlur={onBlur}
      mask={'+(\\9\\9\\8) 99 999-99-99'}
      value={value}
      onChange={onChange}
    >
      {/*eslint-disable-next-line @typescript-eslint/ban-ts-comment*/}
      {/*@ts-ignore*/}
      {(inputProps: IInputProps) => handleInputProps(inputProps)}
    </InputMask>
  );
};
