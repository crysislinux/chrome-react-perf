import React from 'react';
import QuickControl from './QuickControl';

class AutoItems extends React.Component {
  static propTypes = {
    onChange: React.PropTypes.func.isRequired,
    items: React.PropTypes.object.isRequired,
  };

  constructor(props) {
    super(props);
    this.handleCheckChange = this.handleCheckChange.bind(this);
  }

  handleCheckChange() {
    const items = {};

    for (const ref in this.refs) {
      if (this.refs.hasOwnProperty(ref)) {
        items[ref] = this.refs[ref].checked;
      }
    }

    this.props.onChange(items);
  }

  render() {
    return (
      <div>
        <label>
          <input type="checkbox" ref="wasted"
            onChange={this.handleCheckChange}
            checked={this.props.items.wasted}
          />
          wasted
        </label>
        <label>
          <input type="checkbox" ref="dom"
            onChange={this.handleCheckChange}
            checked={this.props.items.dom}
          />
          dom
        </label>
        <label>
          <input type="checkbox" ref="inclusive"
            onChange={this.handleCheckChange}
            checked={this.props.items.inclusive}
          />
          inclusive
        </label>
        <label>
          <input type="checkbox" ref="exclusive"
            onChange={this.handleCheckChange}
            checked={this.props.items.exclusive}
          />
          exclusive
        </label>
      </div>
    );
  }
}

const propTypes = {
  onShowItemsChange: React.PropTypes.func.isRequired,
  showItems: React.PropTypes.object.isRequired,
};

export default function ResultControl({
  onShowItemsChange,
  showItems,
}) {
  return (
    <QuickControl>
      <AutoItems onChange={onShowItemsChange} items={showItems} />
    </QuickControl>
  );
}

ResultControl.propTypes = propTypes;
