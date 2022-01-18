import React, {memo} from 'react';
import s from './UniversalTable.module.scss'
import {TableRow} from "./TableRow/TableRow";


type TablePropsType = {
    component: 'packs' | 'cards'
    rows: Array<{
        name?: string
        cardsCount?: number
        updated: string
        created?: string
        user_id?: string
        _id: string
        question?: string
        answer?: string
        grade?: number
    }>

    headers: {
        name?: string
        cardsCount?: string
        updated: string
        created?: string
        actions?: string
        question?: string
        answer?: string
        grade?: string

    }
    onSetSortingClick: (headerName: string) => void
    onDeleteButtonClick?: (id: string) => void
    onUpdateButtonClick?: (id: string) => void
    onLearnPackClick?: (packId: string) => void
}

export const UniversalTable = memo(({
                                        rows, headers, onSetSortingClick, component,
                                        onDeleteButtonClick, onUpdateButtonClick, onLearnPackClick
                                    }: TablePropsType) => {
        console.log('table')


        const titles = Object.entries(headers)

        return (
            <table className={s.table}>
                <thead>
                <tr>
                    {titles.map(([key, value], i) => {
                            const onTitleClick = () => {
                                onSetSortingClick(key)
                            }
                            return (
                                <th key={i} onClick={onTitleClick} className={s.tableHeader}>
                                    {value}</th>)
                        }
                    )}
                </tr>
                </thead>
                <tbody>

                {rows.map((row) => {
                    return (<TableRow key={row._id} item={row} component={component}
                                      onDeleteButtonClick={onDeleteButtonClick}
                                      onUpdateButtonClick={onUpdateButtonClick} onLearnPackClick={onLearnPackClick}/>)
                })}
                </tbody>
            </table>
        )
    }
)


