import React, { Component } from 'react';

// Для інлайн-стилів використовуйте такі стилі:
const tooltipContainerStyle = {
    position: 'relative',
    display: 'inline-block',
    cursor: 'pointer',
};

const tooltipTextStyle = {
    visibility: 'hidden',
    width: 'auto',
    backgroundColor: 'transparent',
    color: 'black',
    textAlign: 'center',
    borderRadius: '6px',
    // padding: '5px',
    fontFamily: 'Ink Free, sans-serif',
    fontSize: '1vw',
    position: 'absolute',
    zIndex: '1',
    bottom: '105%',
    left: '50%',
    transform: 'translateX(-50%)',
    opacity: '0',
    transition: 'opacity 1s',
};

const tooltipTextVisibleStyle = {
    ...tooltipTextStyle,
    visibility: 'visible',
    opacity: 1,
};

// Компонент Tooltip
class Tooltip extends Component {
    constructor(props) {
        super(props);
        this.state = {
            visible: false,
        };
        this.showTooltip = this.showTooltip.bind(this);
        this.hideTooltip = this.hideTooltip.bind(this);
    }

    showTooltip() {
        this.setState({ visible: true });
    }

    hideTooltip() {
        this.setState({ visible: false });
    }

    render() {
        const { text, children } = this.props;
        const { visible } = this.state;

        return (
            <div
                className="tooltip-container"
                style={tooltipContainerStyle}
                onMouseEnter={this.showTooltip}
                onMouseLeave={this.hideTooltip}
            >
                {children}
                <span
                    className="tooltip-text"
                    style={visible ? tooltipTextVisibleStyle : tooltipTextStyle}
                >
                    {text}
                </span>
            </div>
        );
    }
}



export default Tooltip;