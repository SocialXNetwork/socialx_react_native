import * as React from 'react';
import {connect, ConnectedComponentClass} from 'react-redux';
import {createSelector} from 'reselect';
import {IApplicationState} from '../../../store';

export type getTextSignature = (value: string, ...args: any[]) => string;
