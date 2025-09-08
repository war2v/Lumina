import { ReactNode } from "react"

interface ContainerProps {
    className?: string,
    children: ReactNode
}

export const Container = ({children, className}: ContainerProps) => {
    return (
        <div className={`${className}`}>
            {children}
        </div>
    )
}