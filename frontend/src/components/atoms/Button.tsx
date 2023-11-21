/**
 * @typedef {Object} ButtonProps
 *
 * @property {string} title - Text to display inside the button.
 * @property {'button' | 'submit' | 'reset'} type - Specifies the type of button.
 * @property {string} [className] - Additional CSS classes to apply to the button.
 * @property {() => void} [onClick] - Callback function to execute when the button is clicked.
 */
export type ButtonProps = {
    title: string
    type: 'button' | 'submit' | 'reset'
    className?: string
    onClick?: () => void
    id?: string
}

/**
 * `Button` component.
 *
 * A reusable button component that features a hardcoded gradient background (linear-gradient from #C8D5B9 to #68B0AB).
 * It allows customization through props and supports additional styles via the `className` prop, which are appended to the default styles.
 * The component also supports `onClick` event handling, and the `type` of the button (e.g., 'submit' for forms) can be specified.
 *
 * @param {ButtonProps} props - Properties to configure the button.
 * @returns {JSX.Element} A styled button element with the specified properties and behavior.
 */
const Button = (props: ButtonProps) => {
    return (
        <button
            id={props.id}
            onClick={props.onClick}
            type={props.type}
            className={
                'flex w-full justify-center rounded-md px-3 py-1.5 text-sm font-semibold leading-8 text-white shadow-[0_4px_9px_-4px_#8FC0A9] ' +
                props.className
            }
            style={{
                background:
                    'linear-gradient(to right, #C8D5B9, #8FC0A9, #68B0AB)'
            }}>
            {props.title}
        </button>
    )
}

export default Button
