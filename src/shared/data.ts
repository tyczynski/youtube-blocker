import { Modifier, Mode, Theme } from '@src/shared/types';

export const modes = <Mode[]>['text', 'regex'];
export const modifiers = <Modifier[]>['global', 'caseInsensitive'];
export const themes = <Theme[]>['dark', 'light'];
export const defaultTheme = <Theme>'light';
