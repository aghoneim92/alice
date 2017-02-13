/// <reference path="../../types/index.d.ts" />
import React, { ReactNode, StatelessComponent } from 'react'
import { createContainer } from 'react-transmit'

export interface WindowProps {
  readonly window: ImMap;
}

export const cssPrefix = 'os_window'

export type IWindowComponent = (props: WindowProps) =>
  ReactNode;

interface TitleProps { title: string; }

export const WindowTitle: StatelessComponent<TitleProps> = ({
  title,
}) => (
  <span>{title}</span>
)

export const WindowComponent: IWindowComponent = ({
  window,
}) => {
  const title: string = window.get('title')

  return (
    <div className={cssPrefix} >
        <WindowTitle title={title} />
    </div>
  )
}

interface IContainerConfig {
  fragments: {}
}

const containerConfig: IContainerConfig = {
  fragments: {},
}

export const Window = createContainer(WindowComponent, containerConfig)
