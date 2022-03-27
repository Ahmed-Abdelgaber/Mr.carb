import classes from './Modal.module.css';
import { Fragment } from 'react';
import ReactDom from 'react-dom';

const BackDrop = (props) => {
    return <div className={classes.backdrop} onClick={props.onBlur}></div>;
};

const ModalOverlay = (props) => {
    return (
        <div className={classes.modal}>
            <div className={classes.content}>{props.children}</div>
        </div>
    );
};

const overlaysDiv = document.getElementById('overlays');

const Modal = (props) => {
    return (
        <Fragment>
            {ReactDom.createPortal(
                <BackDrop onBlur={props.onBlur} />,
                overlaysDiv
            )}
            {ReactDom.createPortal(
                <ModalOverlay>{props.children}</ModalOverlay>,
                overlaysDiv
            )}
        </Fragment>
    );
};

export default Modal;
