import {OnBeforeAppStart} from '../interface/on-before-app-start';

export function onBeforeAppStartFactory(service: OnBeforeAppStart): Promise<any> {
  return service.onLoadBeforeAppStart();
}
