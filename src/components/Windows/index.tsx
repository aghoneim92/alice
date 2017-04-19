/// <reference path="./index.d.ts" />

import { decorate } from './decorator'

import { Windows as WindowsComponent } from './Windows'

System.import('./index.scss')

export const Windows = decorate(WindowsComponent)
