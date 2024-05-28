import { ReactNode } from 'react'

export default function BoardColumn(props: { title: string; children?: ReactNode | ReactNode[] }) {
    return (
        <div>
            <div
                style={{
                    fontWeight: 'bold',
                    textAlign: 'center',
                    fontSize: 30,
                    padding: '15px 0'
                }}
            >
                {props.title}
            </div>
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
                        gap: 20,
                        flexDirection: 'column',
                        padding: '20px 0'
                    }}
                >
                    {props.children}
                </div>
            </div>
        </div>
    )
}
