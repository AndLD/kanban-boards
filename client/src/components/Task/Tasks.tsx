import React from 'react'

interface IProps {
    children: React.ReactNode[]
}

export default function Tasks({ children }: IProps) {
    return (
        <div className="tasks-scrollable">
            <div className="tasks">{...children}</div>
        </div>
    )
}
