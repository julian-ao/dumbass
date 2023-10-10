import { Dispatch, SetStateAction } from 'react'

export type InputFieldProps = {
    id: string
    type: string
    title: string
    value: string | number | undefined
    onChange: Dispatch<SetStateAction<string>>
    required: boolean
    className?: string
}

const InputField = (props: InputFieldProps) => {
    return (
        <div className={props.className}>
            <label
                htmlFor={props.id}
                className='block text-sm font-medium leading-6 text-blueGray'>
                {props.title}
            </label>
            <input
                id={props.id}
                name={props.title.toLowerCase()}
                type={props.type}
                placeholder={props.title}
                value={props.value}
                onChange={(e) => props.onChange(e.target.value)}
                required={props.required}
                className='block w-full h-12 rounded-md border-0 py-1.5 px-2 text-blueGray shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-300 focus:ring-2 focus:ring-inset focus:ring-red focus:outline-none sm:text-sm sm:leading-6 mt-2'
            />
        </div>
    )
}

export default InputField
