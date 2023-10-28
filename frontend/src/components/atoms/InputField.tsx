import { Dispatch, SetStateAction } from 'react'

/**
 * @typedef {Object} InputFieldProps
 *
 * @property {string} id - The unique identifier of the input element.
 *                         Used to associate the label with the input.
 * @property {string} type - The type of input element to display
 *                           (e.g., 'text', 'password', etc.)
 * @property {string} title - The display name for the input field,
 *                            used as label text and placeholder.
 * @property {(string | number | undefined)} value - The current value of
 *                                                   the input element.
 * @property {Dispatch<SetStateAction<string>>} onChange - The function
 *                            to be called when the value of the input changes.
 * @property {boolean} required - Boolean indicating whether the input
 *                                is a required field in a form.
 * @property {string} [className] - Optional property for providing
 *                                  additional CSS classes.
 */
export type InputFieldProps = {
    id: string
    type: string
    title: string
    value: string | number | undefined
    onChange: Dispatch<SetStateAction<string>>
    required: boolean
    className?: string
}

/**
 * `InputField` Component.
 *
 * This component renders an input field with a corresponding label.
 * It accepts and displays a value, and calls a provided function when
 * the value changes (typically to update state). The input can be
 * configured to be of different types (like 'text', 'password', etc.),
 * can be marked as required, and can be styled with additional CSS classes.
 *
 * @param {InputFieldProps} props - Properties to configure the component.
 */
const InputField = (props: InputFieldProps) => {
    return (
        <main className={props.className}>
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
        </main>
    )
}

export default InputField
