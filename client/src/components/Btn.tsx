import { CopyOutlined, DeleteOutlined, EditOutlined } from '@ant-design/icons'
import { Button } from 'antd'
import React from 'react'

const BtnType = {
    copy: CopyOutlined,
    edit: EditOutlined,
    delete: DeleteOutlined
}

interface IProps {
    type: 'copy' | 'edit' | 'delete'
    onClick?: (event: React.MouseEvent<HTMLElement, MouseEvent>) => void
}

export default function Btn({ type, onClick }: IProps) {
    return (
        <Button
            className="btn"
            type="text"
            icon={React.createElement(BtnType[type], { style: { fontSize: 25 } })}
            onClick={onClick}
        />
    )
}
