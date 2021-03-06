import { FC, memo, useCallback, useEffect, useState } from "react";
import { Modal } from "../Modal";
import SuperInputText from "../../../../Components/TestComponents/components/c1-SuperInputText/SuperInputText";
import { useDispatch, useSelector } from "react-redux";
import s from "./ModalContainer.module.scss";
import { setModalTypeAC } from "../../../../store/reducers/modal-reducer";
import { RootReducerType } from "../../../../store/store";

import { useParams } from "react-router-dom";
import { CardType } from "../../../../dal/cards/types";

import { PackType } from "../../../../dal/packs/types";
import { LearnPackModal } from "../LearnPackModal/LearnPackModal";
import { getCard } from "../../../../utils/handles";
import { EMPTY_STRING } from "../../../../constants";
import {
  addCardTC,
  deleteCardTC,
  updateCardTC,
} from "../../../../store/thunks/cards";
import { modalActionType, modalEntityType } from "../../../../enum/Modals";
import {
  addPackTC,
  deletePackTC,
  updatePackTC,
} from "../../../../store/thunks/packs";
import { DeleteModal } from "../DeleteModal/DeleteModal";

type ModalContainerPropsType = {
  pack?: PackType;
};

export const ModalContainer: FC<ModalContainerPropsType> = memo(({ pack }) => {
  const dispatch = useDispatch();

  const params = useParams<"id">();
  const cardsPack_id = params.id;

  const id = useSelector<RootReducerType, string>((state) => state.modals.id);
  const cards = useSelector<RootReducerType, Array<CardType>>(
    (state) => state.cards.cards
  );
  const modalAction = useSelector<RootReducerType, modalActionType>(
    (state) => state.modals.modalAction
  );
  const modalEntity = useSelector<RootReducerType, modalEntityType>(
    (state) => state.modals.modalEntity
  );

  const card = cards.find((card) => card._id === id);

  const { Card, Pack, Empty_Entity } = modalEntityType;
  const { Delete, Add, Update, Learn, Empty_Action } = modalActionType;
  const questionInitialValue = card ? card.question : EMPTY_STRING;
  const answerInitialValue = card ? card.answer : EMPTY_STRING;
  const nameInitialValue = pack ? pack.name : EMPTY_STRING;

  const [name, setName] = useState<string>(nameInitialValue);
  const [question, setQuestion] = useState<string>(questionInitialValue);
  const [answer, setAnswer] = useState<string>(answerInitialValue);
  const [activeCardIndex, setActiveCardIndex] = useState<number>(0);
  const [isActivePrevBtn, setIsActivePrevBtn] = useState<boolean>(true);
  const [prevCards, setIsPrevCards] = useState<CardType[]>([]);
  const [activeCard, setActiveCard] = useState(cards[0]);

  let questionForLearn = activeCard ? activeCard.question : EMPTY_STRING;
  let answerForLearn = activeCard ? activeCard.answer : EMPTY_STRING;
  let activeCardId = activeCard ? activeCard._id : EMPTY_STRING;

  const limitLength = prevCards.length - 1;
  const conditionForExecution =
    prevCards.length > 0 && activeCardIndex < limitLength;

  useEffect(() => {
    if (activeCardIndex === 0) {
      setIsActivePrevBtn(false);
    }
  }, [activeCardIndex]);

  const onCloseModalButtonClick = useCallback(() => {
    dispatch(setModalTypeAC(Empty_Action, Empty_Entity));
  }, [dispatch, Empty_Entity, Empty_Action]);

  const onSavePackButtonClick = useCallback(() => {
    dispatch(addPackTC(name));
    onCloseModalButtonClick();
  }, [dispatch, name, onCloseModalButtonClick]);

  const onSaveCardButtonClick = useCallback(() => {
    dispatch(addCardTC(id, question, answer));
    onCloseModalButtonClick();
  }, [dispatch, id, question, answer, onCloseModalButtonClick]);

  const onDeletePackButtonClick = useCallback(() => {
    dispatch(deletePackTC(id));
    onCloseModalButtonClick();
  }, [dispatch, id, onCloseModalButtonClick]);

  const onDeleteCardButtonClick = useCallback(() => {
    if (cardsPack_id) {
      dispatch(deleteCardTC(cardsPack_id, id));
    }
    onCloseModalButtonClick();
  }, [dispatch, cardsPack_id, id, onCloseModalButtonClick]);

  const onUpdatePackClick = useCallback(() => {
    dispatch(updatePackTC(id, name));
    onCloseModalButtonClick();
  }, [dispatch, id, name, onCloseModalButtonClick]);

  const onUpdateCardClick = useCallback(() => {
    if (cardsPack_id) {
      dispatch(updateCardTC(cardsPack_id, { _id: id, question, answer }));
    }
    onCloseModalButtonClick();
  }, [dispatch, cardsPack_id, id, question, answer, onCloseModalButtonClick]);

  const onNextCardButtonClick = useCallback(() => {
    if (!isActivePrevBtn) {
      setIsActivePrevBtn(true);
    }
    let newCard = getCard(cards);
    setActiveCard(newCard);
    setIsPrevCards([newCard, ...prevCards]);
  }, [cards, isActivePrevBtn, prevCards]);

  const onPrevCardButtonClick = useCallback(() => {
    if (conditionForExecution) {
      setActiveCard(prevCards[activeCardIndex]);
      setActiveCardIndex(activeCardIndex + 1);
      return;
    }
    setIsActivePrevBtn(false);
  }, [activeCard, activeCardIndex, prevCards, conditionForExecution]);

  const modals = {
    [Add]: {
      title: `Add new ${modalEntity}`,
      btn: {
        title: "Save",
        callback:
          modalEntity === Card ? onSaveCardButtonClick : onSavePackButtonClick,
      },
    },

    [Delete]: {
      title: `Delete ${modalEntity}`,
      btn: {
        title: "Delete",
        callback:
          modalEntity === Pack
            ? onDeletePackButtonClick
            : onDeleteCardButtonClick,
      },
    },

    [Update]: {
      title: `Update ${modalEntity}`,
      btn: {
        title: "Update",
        callback: modalEntity === Pack ? onUpdatePackClick : onUpdateCardClick,
      },
    },

    [Learn]: {
      title: ` ${questionForLearn}`,
      btn: {
        title: "Prev",
        callback: onPrevCardButtonClick,
      },
    },
  };

  let modalBody;
  if (modalAction === Add) {
    modalBody = modals.add;
  }
  if (modalAction === Delete) {
    modalBody = modals.delete;
  }

  if (modalAction === Update) {
    modalBody = modals.update;
  }
  if (modalAction === Learn) {
    modalBody = modals.learn;
  }

  const conditionForUpdateAddCardModal =
    modalEntity === Card && modalAction !== Delete;
  const conditionActivateInputName =
    modalEntity === Pack && (modalAction === Add || modalAction === Update);

  return (
    <Modal
      modalBody={modalBody}
      onCloseModalButtonClick={onCloseModalButtonClick}
      onNextCardButtonClick={onNextCardButtonClick}
      modalAction={modalAction}
      isActivePrevBtn={isActivePrevBtn}
    >
      <DeleteModal modalAction={modalAction} modalEntity={modalEntity} />

      {conditionActivateInputName && (
        <SuperInputText
          className={s.input}
          value={name}
          onChangeText={setName}
          placeholder={"Title"}
        />
      )}

      {conditionForUpdateAddCardModal && (
        <>
          <SuperInputText
            className={s.input}
            value={question}
            onChangeText={setQuestion}
            placeholder={"Your question"}
          />
          <SuperInputText
            className={s.input}
            value={answer}
            onChangeText={setAnswer}
            placeholder={"Your answer"}
          />
        </>
      )}
      {modalAction === Learn && (
        <LearnPackModal
          answer={answerForLearn}
          activeCardId={activeCardId}
          onNextCardButtonClick={onNextCardButtonClick}
        />
      )}
    </Modal>
  );
});
