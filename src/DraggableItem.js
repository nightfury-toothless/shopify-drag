// @flow
import React, { PureComponent, type Node } from 'react';
import classNames from 'classnames';
import PropTypes from 'prop-types';

type Props = {
  as: string, // what to render the container as
  className?: string, // classname for the container
  id?: string, // id for the container
  style?: { [string]: string | number }, //inline styling
  children?: Node,
};

class DraggableItem extends PureComponent<Props> {
  static contextTypes = {
    contextWrapper: PropTypes.object,
  };

  static defaultProps = {
    as: 'div',
  };

  // subscribe to context updates
  componentDidMount() {
    this.context.contextWrapper.subscribe(() => this.forceUpdate());
  }

  render() {
    const { as: ElementType, className, id, style, children } = this.props;

    return (
      <ElementType
        id={id}
        className={classNames([
          className,
          this.context.contextWrapper.draggable,
        ])}
        style={style}
      >
        {children}
      </ElementType>
    );
  }
}

export default DraggableItem;