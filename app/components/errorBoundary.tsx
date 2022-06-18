import React, { ErrorInfo } from 'react';

import YAHOO from 'app/shims/yahoo';

type Props = {
  children: React.ReactNode;
};

type State = {
  hasError: boolean;
};

class ErrorBoundary extends React.Component<Props, State> {
  public state: State = {
    hasError: false,
  };

  static getDerivedStateFromError() {
    return { hasError: true };
  }

  componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    console.error('Error info', errorInfo);
    YAHOO.lacuna.Game.QuickDialog(
      {
        width: '500px',
        text: [
          '<p>A client error has occurred. <br>Please report this on <a target="_blank" href="https://github.com/kantigen/ka-web/issues">the support forums</a>, and include the data below:</p>',
          '<textarea style="width: 100%; height: 300px;" id="internalErrorMessageText" readonly="readonly" onclick="this.select()">',
          error.toString(),
          '\n',
          error.stack,
          '</textarea>',
        ].join(''),
        buttons: [
          {
            text: 'Close',
            handler() {
              //@ts-expect-error
              this.hide();
            },
          },
        ],
      },
      null,
      null
    );
  }

  render() {
    if (this.state.hasError) {
      // Returning any kind of response after an error keeps the rest of the document alive.
      return <div />;
    }

    return this.props.children;
  }
}

export default ErrorBoundary;
