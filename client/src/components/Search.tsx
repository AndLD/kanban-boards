import { Button, Input } from 'antd'

export default function Search() {
    return (
        <div
            style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                gap: 20,
                height: '15vh'
            }}
        >
            <Input
                placeholder="Enter a board ID here..."
                style={{ paddingLeft: 20, fontSize: 20, height: 50 }}
                onChange={(event) => event.target.value}
            />
            <Button style={{ width: 150, fontSize: 20, height: 50 }}>
                Load
            </Button>
            <Button style={{ width: 150, fontSize: 20, height: 50 }}>
                New
            </Button>
        </div>
    )
}
