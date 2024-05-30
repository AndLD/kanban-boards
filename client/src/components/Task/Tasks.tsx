import React from 'react'

interface IProps {
    children: React.ReactNode[]
}

export default function Tasks({ children }: IProps) {
    return (
        <div
            style={{
                minHeight: '65vh',
                maxHeight: '65vh',
                width: '20vw',
                background: 'lightgray',
                overflowY: 'scroll'
            }}
        >
            <div
                style={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    flexDirection: 'column',
                    marginBottom: 20
                }}
            >
                {...children}
            </div>
        </div>
    )
}
