import React from 'react';
import { connect } from 'react-redux';

import { mapStateToProps } from '../../../shared/utils';
import * as actions from '../../../shared/redux/actions';

class Iframe extends React.Component {
  componentWillReceiveProps(nextProps) {
    const { templateData } = nextProps;
    const { type } = templateData;
    if (type === 'success'
      && this.iframe.contentWindow
      && this.iframe.contentWindow.postMessage) {
      // 与 iframe 通信；
      this.iframe.contentWindow.postMessage(templateData, '*');
    }
  }

  getData = () => {
    const { dispatch, templateData } = this.props;
    if (templateData.type === 'success') {
      debugger;
      this.componentWillReceiveProps(this.props);
    } else {
      dispatch(actions.getUserData());
    }
  }

  render() {
    const { templateData, className, mediaStateSelect } = this.props;
    const { type, uid } = templateData;
    const location = window.location;
    const protocol = location.protocol;
    const isLocalMode = location.port;
    const port = isLocalMode ? ':7113' : '';
    const mainPath = isLocalMode ? '' : '/templates';
    let iframeSrc = `${protocol}//${location.hostname}${port}${mainPath}`;
    if (type === 'success') {
      // 通过路由刷新 iframe 里 props;
      iframeSrc = `${protocol}//${location.hostname}${port}${mainPath}/#uid=${uid}`;
    }
    return (
      <iframe
        src={iframeSrc}
        title="template"
        onLoad={this.getData}
        id="myIframe"
        style={this.props.style}
        ref={(c) => {
          this.iframe = c;
        }}
        className={`${className}${mediaStateSelect === 'Mobile' ? ' mobile' : ''}`}
      />
    );
  }
}

export default connect(mapStateToProps)(Iframe);
