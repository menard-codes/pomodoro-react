import Button from "@components/Utils/Button";

import "./Modal.styles.scss";

interface ModalProps {
  exitModal: () => void;
  children: string | JSX.Element | JSX.Element[] | (string | JSX.Element)[];
}

export default function Modal({ exitModal, children }: ModalProps) {
  return (
    <div className="modal-container" onClick={exitModal}>
      <div className="modal" onClick={(e) => e.stopPropagation()}>
        {/* TODO: Change this to icon */}
        <Button onClick={exitModal} className="close-btn">
          X
        </Button>
        {children}
      </div>
    </div>
  );
}
