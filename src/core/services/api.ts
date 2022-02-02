import { strapi } from "./strapi";
import { Models } from "@kidneed/types";
import { flatStrapiResponse, forceCast } from "@kidneed/utils";

export const me = async (): Promise<Models.User> => {
  const user = await strapi.fetchUser();

  return forceCast<Models.User>(user);
};

export const actingAs = async (id: number): Promise<Models.User> => {
  const { jwt, user } = await strapi.request<{
    jwt: string;
    user: Models.User;
  }>("post", "/auth/jwt", {
    data: { id },
  });

  strapi.setToken(jwt);

  return user;
};

export const children = async (
  user: Models.User
): Promise<Array<Models.Child>> => {
  const { data } = await strapi.find<Array<Models.Child>>("children", {
    filters: {
      user: {
        id: {
          $eq: user.id,
        },
      },
    },
  });

  return data.map(flatStrapiResponse);
};
