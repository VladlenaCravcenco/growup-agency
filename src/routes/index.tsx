import { type RequestHandler } from '@builder.io/qwik-city';

export const onGet: RequestHandler = async ({ redirect }) => {
  throw redirect(302, '/ru');
};

export default function Empty() {
  return null;
}