'use client';

// import { sendForm } from './action';
import clsx from 'clsx';
import { useMemo, useState } from 'react';

interface FormProps extends React.ComponentProps<'form'> {
  children: React.ReactNode;
  label?: string;
}

export function Form({ children, label, ...rest }: FormProps) {
  return (
    <form
      {...rest}
      // action={sendForm}
    >
      {label && <h1 className='text-2xl font-medium'>{label}</h1>}
      {children}
    </form>
  );
}

export function Input({ className, ref, ...rest }: React.ComponentProps<'input'>) {
  return (
    <input
      ref={ref}
      className={`${className} w-full rounded-xl bg-[var(--tertiary-100)] py-16 px-12 `}
      {...rest}
    />
  );
}

type TextInputTypes = 'email' | 'tel' | 'text' | 'date' | 'number';

interface TextInputProps extends Omit<React.ComponentProps<'input'>, 'type' | 'className'> {
  icon?: React.ReactNode;
  type: TextInputTypes;
}

export function TextInput({ icon, type, ...rest }: TextInputProps) {
  return (
    <>
      <div className='peer mt-3 flex h-12 w-full gap-4 rounded-xl bg-secondary px-5'>
        {icon && (
          <div className='pointer-events-none flex items-center justify-center text-secondary-accent'>
            {icon}
          </div>
        )}
        <Input className='peer' type={type} {...rest} />
      </div>
    </>
  );
}

interface SelectOptions {
  label: string;
  value: string;
}

interface SelectProps extends React.ComponentProps<'input'> {
  legend?: string;
  options: SelectOptions[];
  vertical?: boolean;
  defaultSelect?: string;
}

export function RadioSelect({
  legend,
  name,
  options,
  vertical,
  defaultSelect,
  onChange,
  ...rest
}: SelectProps) {
  const [selected, setSelected] = useState(defaultSelect || options[0].value);

  return (
    <fieldset className='[&:not(:first-child)]:mt-6'>
      {legend && <legend className='mb-3'>{legend}</legend>}
      <div className={clsx('flex flex-wrap gap-x-9 gap-y-4', vertical ? 'flex-col' : 'flex-row')}>
        {options.map((value, index) => {
          const id = `${name}-${value.value}`;
          return (
            <div className='flex items-center' key={index}>
              <label className='mr-4 text-secondary-accent' htmlFor={id}>
                {value.label}
              </label>
              <input
                className='cursor-pointer appearance-none !rounded-full !bg-secondary transition-all
                  duration-100 checked:border-[0.4rem] checked:border-secondary
                  checked:!bg-tertiary hover:border-[0.4rem] hover:border-secondary hover:bg-white'
                type='radio'
                id={id}
                name={name}
                value={value.value}
                checked={selected === value.value}
                onChange={(e) => {
                  setSelected(e.target.value);
                  onChange?.(e);
                }}
                {...rest}
              />
            </div>
          );
        })}
      </div>
    </fieldset>
  );
}

export function Checkmark() {
  return (
    <svg
      className='pointer-events-none z-10 hidden text-white peer-checked:block'
      width='14'
      height='14'
      viewBox='0 0 16 16'
      fill='none'
      xmlns='http://www.w3.org/2000/svg'
    >
      <g clipPath='url(#clip0_123_468)'>
        <path
          fillRule='evenodd'
          clipRule='evenodd'
          d='M15.3913 2.09996C14.5938 1.28496 13.3013 1.28496 12.5038 2.09996L5.28425 9.46L3.47978 7.61998C2.68228 6.80998 1.38927 6.80998 0.592266 7.61998C-0.205234 8.43498 -0.205234 9.75499 0.592266 10.565L3.84077 13.88C4.63827 14.695 5.93075 14.695 6.72825 13.88L15.3913 5.04497C16.1888 4.22997 16.1888 2.90996 15.3913 2.09996Z'
          fill='white'
        />
      </g>
      <defs>
        <clipPath id='clip0_123_468'>
          <rect width='16' height='16' fill='white' />
        </clipPath>
      </defs>
    </svg>
  );
}

export function MultiSelect({ legend, name, options, vertical }: SelectProps) {
  return (
    <fieldset className='[&:not(:first-child)]:mt-6'>
      <legend className='mb-3'>{legend}</legend>
      <div className={clsx('flex flex-wrap gap-4 2xl:gap-8', vertical ? 'flex-col' : 'flex-row')}>
        {options.map((value, index) => {
          const id = `${name}-${value.value}`;
          return (
            <div className='flex items-center' key={index}>
              <div className='relative mr-4 flex h-6 w-6 items-center justify-center'>
                <Input
                  className='peer absolute z-0 h-full w-full cursor-pointer appearance-none !rounded-md
                    !bg-secondary transition-all duration-100 checked:!bg-tertiary
                    [&:not(:checked)]:hover:!bg-tertiary'
                  // [&:not(:checked)]:hover:border-[0.4rem]'
                  type='checkbox'
                  id={id}
                  name={name}
                  value={value.value}
                />
                <Checkmark />
              </div>
              <label className='text-secondary-accent' htmlFor={id}>
                {value.label}
              </label>
            </div>
          );
        })}
      </div>
    </fieldset>
  );
}

interface TextAreaProps extends React.ComponentProps<'textarea'> {
  label?: string;
}

export function TextArea({ label, ...rest }: TextAreaProps) {
  return (
    <div className='mt-3'>
      {label && <label>{label}</label>}
      <textarea
        className='min-h-[180px] w-full resize-none rounded-xl bg-secondary px-5 py-4
          placeholder-secondary-accent outline-none focus-within:border-2
          focus-within:border-tertiary'
        {...rest}
      ></textarea>
    </div>
  );
}
