import { FC, ReactNode, useEffect, useRef } from "react";

interface ModalActionI {
  hide: () => void;
  children: ReactNode;
}

export const ModalAction: FC<ModalActionI> = ({ hide, children }) => {
  return (
    <div className="modal-action">
      <div className="flex justify-between w-full">
        <button onClick={hide}>close</button>
        {children}
      </div>
    </div>
  );
};

interface ModalI {
  title: string;
  show: boolean;
  children: ReactNode;
}

const Modal: FC<ModalI> = ({ title, show, children }) => {
  return (
    <dialog className="modal" open={show}>
      <div className="modal-box">
        <h3 className="font-bold text-lg">
          {title} <hr />
        </h3>
        {children}
      </div>
    </dialog>
  );
};

export default Modal;
