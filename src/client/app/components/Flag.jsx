
// @flow
import React from 'react';
import injectSheet from 'react-jss'
import Color from 'tinycolor2';
import classNames from 'classnames';
import Tooltip from '@material-ui/core/Tooltip';

type Props = {
  classes: Object,
  icon: String,
  custom: boolean,
  hex: String,
  styles: Object,
  extendable: boolean,
  title: String,
  placement: String,
  reset: boolean,
  onClick: Function,
  onConfirm: Function,
  onCancel: Function
}

type State = {
  extended: boolean,
  tooltipOpen: boolean
}

class Flag extends React.Component<Props, State> {
  initialState = {
    extended: false,
    tooltipOpen: false
  }

  state = this.initialState;

  handleClick = () => {
    if (this.props.extendable) {
      this.handleTooltipClose();
      this.setState({ extended: true });
    }
    this.props.onClick();
  }

  handleCancel = () => {
    if (this.props.extendable) {
      this.setState({ extended: false });
    }
    this.props.onCancel();
  }

  handleConfirm = () => {
    if (this.props.extendable) {
      this.setState({ extended: false });
    }
    this.props.onConfirm();
  }

  handleTooltipOpen= () => {
    if (!this.props.extendable || !this.state.extended) {
      this.setState({ tooltipOpen: true });
    }
  }

  handleTooltipClose= () => {
    if (!this.props.extendable || !this.state.extended) {
      this.setState({ tooltipOpen: false });
    }
  }

  componentDidUpdate(prevProps) {
    if (this.props.reset && !prevProps.reset) {
      // Reset state.
      this.setState(this.initialState)
    }
  }

  render() {
    const { classes: c, custom, icon, styles, onConfirm, onCancel, extendable, title, placement } = this.props;
    const { extended, tooltipOpen } = this.state;

    const extendedButtons = extended && (
      <div className={c.extendedButtons}>
        <div className={classNames(c.halfBtn, c.confirm)} onClick={this.handleConfirm}>
          <i className={classNames(c.icon, "material-icons")}>check_circle</i>
        </div>
        <div className={classNames(c.halfBtn, c.cancel)} onClick={this.handleCancel}>
          <i className={classNames(c.icon, "material-icons")}>cancel</i>
        </div>
      </div>
    )
    const regButton = !extended && (
      <div className={c.regBtnWrapper} onClick={this.handleClick}>
        {custom ? <img src={icon} className={c.icon} /> :
        <i className="material-icons" onClick={this.handleClick}>{icon}</i>}
      </div>);

    return (
      <Tooltip
        title={title}
        placement={placement}
        open={tooltipOpen}
      >
        <div
          className={classNames(c.container, extended && c.extended)}
          style={styles}
          onMouseEnter={this.handleTooltipOpen}
          onMouseLeave={this.handleTooltipClose}
        >
          {extendable && extendedButtons}
          {regButton}
        </div>
      </Tooltip>
    )
  }
}

const styles = (theme) => ({
  container: {
    width: '50px',
    height: '50px',
    borderRadius: '0 4px 4px 0',
    backgroundColor: props => props.hex,
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    color: 'white',
    cursor: 'pointer',
    transition: 'all .15s ease-in-out',
    '&:hover': {
      backgroundColor: props => Color(props.hex).darken(20).toString(),
      width: '55px'
    }
  },
  regBtnWrapper: {
    width: '100%',
    height: '100%',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center'
  },
  extended: {
    width: '100px',
    '&:hover': {
      backgroundColor: props => props.hex,
      width: '100px'
    }
  },
  extendedButtons: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-around',
    width: '100%',
    height: '100%'
  },
  halfBtn: {
    height: '100%',
    flexGrow: '1',
    cursor: 'pointer',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    transition: 'background-color .15s ease-in-out'
  },
  confirm: {
    backgroundColor: theme.colorPrimary,
    '&:hover': {
      backgroundColor: props => Color(theme.colorPrimaryx).darken(20).toString()
    }
  },
  cancel: {
    backgroundColor: theme.colorNeutral,
    '&:hover': {
      backgroundColor: props => Color(theme.colorNeutral).darken(20).toString()
    }
  },
  icon: {
    width: '25px',
    height: '25px'
  }
});

export default injectSheet(styles)(Flag);


