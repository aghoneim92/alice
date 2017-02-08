/// <reference path='../index.d.ts'/>
import * as React from 'react';
import { Boot } from 'browsix';

export interface OSProps {
}

export class OS extends React.Component<OSProps, undefined> {

  kernel: {
    system: Function;
  } | null = null;

  ps1 = '$ ';

  componentDidMount() {
    Boot(
      'LocalStorage',
      [null, 'fs', true],
      // ['index.json', 'fs', true],
      (err: any, kernel: any) => {
        if (err) {
          console.error(err)
        }
        this.kernel = kernel
      },
      { readOnly: false },
    )
  }

  render() {
    return (
      <h1>Hello</h1>
    );
  }
}
