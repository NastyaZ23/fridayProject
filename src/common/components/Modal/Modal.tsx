import {FC, memo, ReactElement} from "react";
import s from './Modal.module.scss'
import SuperButton from "../../../Components/TestComponents/components/c2-SuperButton/SuperButton";
import {Nullable} from "../../../types/Nullable";

import {modalActionType} from "../../../enum/Modals";


export type ModalPropsType = {
    modalBody?: {
        title: string
        btn: {
            title: string
            callback: () => void
        }
    }
    onCloseModalButtonClick: () => void
    isActivePrevBtn: boolean
    modalAction: modalActionType
    onNextCardButtonClick: () => void
}

export const Modal: FC<ModalPropsType> = memo((
    {
        children,
        modalBody,
        onCloseModalButtonClick,
        modalAction,
        onNextCardButtonClick,
        isActivePrevBtn
    }
): Nullable<ReactElement> => {

    const {Learn} = modalActionType
    const conditionForDisabledPrevBtn = modalAction === Learn? !isActivePrevBtn : false

    if (modalBody) {
        return (
            <div className={s.modalWrapper}>
                <div className={s.modalBlock}>
                    <h2 className={s.title}>
                        {modalBody.title}
                    </h2>
                    {children}

                    <div className={s.buttons}>
                        <SuperButton onClick={modalBody.btn.callback} className={s.btn}
                                     disabled={conditionForDisabledPrevBtn}>
                            {modalBody.btn.title}</SuperButton>
                        {modalAction === Learn &&
                        <SuperButton onClick={onNextCardButtonClick}>
                            Next</SuperButton>}
                        <SuperButton onClick={onCloseModalButtonClick} className={s.btn}>Cancel</SuperButton>
                    </div>

                </div>
            </div>
        )
    }
    return null
})