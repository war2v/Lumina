import { ReactNode } from "react"

interface ContainerProps {
    className?: string,
    children: ReactNode
}

export const Container = ({children, className}: ContainerProps) => {
    return (
        <div className={`max-w-7xl mx-auto p-6 space-y-6 ${className}`}>
            {children}
        </div>
    )
}