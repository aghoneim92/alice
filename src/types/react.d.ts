import { ReactElement } from 'react'

declare global {
    type ElementOrNull<P> = (ReactElement<P> | null)
}