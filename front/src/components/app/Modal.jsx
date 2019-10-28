import React, { Component } from "react";
import ReactDom from "react-dom";
import PropTypes from "prop-types";
// styled
import StyledModal from "./Modal.css";
const modalRoot = document.getElementById("modal-root");
class Modal extends Component {

  static defaultProps = {
    id: "",
    modalClass: "",
    modalSize: "md"
  };

  static propTypes = {
    id: PropTypes.string.isRequired,
    onClose: PropTypes.func.isRequired,
    isOpen: PropTypes.bool.isRequired,
    modalClass: PropTypes.string,
    modalSize: PropTypes.string
  };

  state = { fadeType: null };

  background = React.createRef();

  componentDidMount() {
    window.addEventListener("keydown", this.onEscKeyDown, false);
    setTimeout(() => this.setState({ fadeType: "in" }), 0);
  }

  componentDidUpdate(prevProps, prevState) {
    if (!this.props.isOpen && prevProps.isOpen) {
      this.setState({ fadeType: "out" });
    }
  }

  componentWillUnmount() {
    window.removeEventListener("keydown", this.onEscKeyDown, false);
  }

  transitionEnd = e => {
    if (e.propertyName !== "opacity" || this.state.fadeType === "in") return;
    if (this.state.fadeType === "out") {
      this.props.onClose();
    }
  };

  onEscKeyDown = e => {
    if (e.key !== "Escape") return;
    this.props.onClose();
    this.setState({ fadeType: "out" });
  };

  handleClick = e => {
    e.preventDefault();
    this.props.onClose();
    this.setState({ fadeType: "out" });
  };

  render() {
    return ReactDom.createPortal(
      <StyledModal id={this.props.id} className={`wrapper ${this.props.modalClass}`} role="dialog" modalSize={this.props.size} onTransitionEnd={this.transitionEnd} fadeType={this.state.fadeType}>
        <div className="box-dialog">
          <div className="box-header">
            <h4 className="box-title">{`${this.props.title}`}</h4>
            <button onClick={this.handleClick} className="close"> × </button>
          </div>
          <div className="box-content">{this.props.children}</div>
        </div>
        <div className={`background`} onMouseDown={this.handleClick} ref={this.background} />
      </StyledModal>,
      modalRoot
    );
  }
}
export default Modal;