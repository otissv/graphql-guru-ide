import React, { PureComponent } from 'react';
import JSONTree from 'react-json-tree';
import styled from 'styled-components';

const TreeContainer = styled.div`margin: 20px;`;

class Tree extends PureComponent {
  componentDidMount () {
    const tree = document.querySelector('.tree ul');
    tree.style.backgroundColor = 'rgb(0,0,0)';
  }

  render () {
    const theme = {
      scheme: 'summerfruit',
      author: 'christopher corley (http://cscorley.github.io/)',
      base00: '#151515',
      base01: '#202020',
      base02: '#303030',
      base03: '#FF0086',
      base04: '#B0B0B0',
      base05: '#D0D0D0',
      base06: '#E0E0E0',
      base07: '#FFFFFF',
      base08: '#FF0086',
      base09: '#B0B0B0',
      base0A: '#ABA800',
      base0B: '#151515',
      base0C: '#1faaaa',
      base0D: '#3fA980',
      base0E: '#AD00A1',
      base0F: '#cc6633'
    };

    return (
      <TreeContainer className="tree">
        <JSONTree
          getItemString={(type, data, itemType, itemString) =>
            <span>
              {(data.name && data.name.value) ||
                data.name ||
                data.kind ||
                data.module ||
                itemString}
            </span>}
          data={this.props.data}
          theme={theme}
        />
      </TreeContainer>
    );
  }
}

export default Tree;
