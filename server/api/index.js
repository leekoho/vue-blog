/**
 * Created by leekoho on 2017/4/25.
 */
import compose from 'koa-compose';
import Router from 'koa-router';
import convert from 'koa-convert';
import importDir from 'import-dir';
import config from '../config';
const routes = importDir('./router');

export default function api() {
  const router = new Router({
    prefix: config.app.baseApi
  });
  Object.keys(routes).forEach(name => {
    return routes[name](router)
  });
  return convert.compose([
    router.routes(),
    router.allowedMethods(),
  ]);
}

