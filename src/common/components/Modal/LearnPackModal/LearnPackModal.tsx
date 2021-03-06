import {FC, memo, useCallback, useState} from "react";
import s from './LearnPackModal.module.scss'
import SuperButton from "../../../../Components/TestComponents/components/c2-SuperButton/SuperButton";
import {useDispatch} from "react-redux";
import {updateCardRatingTC} from "../../../../store/thunks/cards";

type LearnPackModalT = {
    answer: string
    activeCardId: string
    onNextCardButtonClick: () => void
}

export const LearnPackModal: FC<LearnPackModalT> = memo(({answer, activeCardId, onNextCardButtonClick}) => {
    const dispatch = useDispatch()

    const [isAnswerShow, setIsAnswerShow] = useState<boolean>(false)

    const BtnTitle = {
        Hide: 'Hide',
        Show: 'Show'
    }
    const BtnShowTitle = isAnswerShow ? BtnTitle.Hide : BtnTitle.Show

    const onToggleShowAnswerClick = useCallback(() => {
        setIsAnswerShow(!isAnswerShow)
    }, [isAnswerShow])

    const onRateButtonClick = useCallback((grade: number) => {
        dispatch(updateCardRatingTC(grade, activeCardId))
        onNextCardButtonClick()
    }, [dispatch, activeCardId, onNextCardButtonClick])

    const markButtons = [
        {name: 'I know', callback: () => onRateButtonClick(5),},
        {name: 'I know part of the answer', callback: () => onRateButtonClick(4),},
        {name: `Maybe I know`, callback: () => onRateButtonClick(3),},
        {name: 'I\'m not sure', callback: () => onRateButtonClick(2),},
        {name: `I don't know`, callback: () => onRateButtonClick(1),},
    ]

    return (
        <div className={s.learnPackModalWrapper}>
            <div className={s.answerBlock}>
                Answer
                <SuperButton onClick={onToggleShowAnswerClick} className={s.btn}>{BtnShowTitle}</SuperButton>
                {isAnswerShow && <span className={s.answer}>{answer}</span>}
            </div>

            <div className={s.buttonsBlock}>
                {markButtons.map(({name, callback}, i) => {
                    return <SuperButton key={i} onClick={callback}>{name}</SuperButton>
                })}
            </div>
        </div>
    )
})