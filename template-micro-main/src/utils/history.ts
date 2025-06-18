import { Link, history } from 'ice';
import { AppLink, appHistory, isInIcestark } from '@ice/stark-app';

export const pageHistory = isInIcestark() ? appHistory : history;
export const PageLink = isInIcestark() ? AppLink : Link;
