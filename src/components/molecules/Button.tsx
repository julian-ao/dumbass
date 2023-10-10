export type ButtonProps = {
    title: string
    type: 'button' | 'submit' | 'reset'
    className?: string
    onClick?: () => void
}

const Button = (props: ButtonProps) => {
    return (
        <button
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
