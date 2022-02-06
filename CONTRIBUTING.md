# Kidneed Contribution Guide

1. First fork the project
2. clone the project in your local environment
3. apply your changes based on defined tasks for your team
4. create a pull request against the main branch in the main repo

you can use the following video for more information about contributing to an open-source project:
[How to Fork and Clone a GitHub Repository](https://app.egghead.io/lessons/javascript-how-to-fork-and-clone-a-github-repository?pl=how-to-contribute-to-an-open-source-project-on-github)

for creating a pull request, watch this:
[How to create a Pull Request on GitHub](https://app.egghead.io/lessons/javascript-how-to-create-a-pull-request-on-github?pl=how-to-contribute-to-an-open-source-project-on-github)

## COMMITS

To commit your changes, please follow the conventional commits rules if it is possible for you (there is no restriction on it, but we will be happier if you follow the below guide):
[Conventional Commits Guideline](https://www.conventionalcommits.org/en/v1.0.0/)

## LIST OF LIBRARIES

The following libraries have been installed and configured on the project, and then you can take advantage of them. But consider that you are not allowed to change the default config of these libraries.

- TAILWINDCSS
- ANTD
- MUI
- RECOIL
- XSTATE
- LODASH
- RAMDA
- REACT QUERY
- REACT HOOK FORM
- REACT ICONS
- STRAPI SDK JS

## CORE

We developed some parts of the app earlier for your convenience, and we think it should be enough to start contributing to the projects.

The `src/core` directory includes all our developed parts of the app. You need to know that there are six local packages that you can use in your development.

- @kidneed/containers
- @kidneed/hooks
- @kidneed/context
- @kidneed/utils
- @kidneed/types
- @kidneed/services

## Containers

Our core containers include some component helpers to render the shared area of our app.

- access denied:
  this component will render if a user wants to access a page that is not allowed (read guard section for more information)

- loading:
  this component will render in full-page when a user logins to the app, and we are bootstrapping the app for the first time (it means when a user reload our app)

- protected:
  this component will handle the user permission to view the pages

- reload:
  this component lets the user reload the page when something unpredictable happens

- context:
  our context contains just one service that handles the user state. We're using `Xstate` for this part. You don't need to know anything about it or use context for any area of your development, but if you are familiar with `xstate`, you can use it in whatever way you want.

- hooks:
  we just developed some hooks for you to handle the state of the app. before we introduce them, we need to explain the logic of our state:

### The below list contains the state of the app:

- the app is in the `init` state
- app initialization has finished, and the user is a `guest`.
- we found that the user is `loggedIn` in our system. if use is `loggedIn`, we have more state in it:
- we're bootstrapping the user info. then we are in `{loggedIn: "init"}` state
- there is something wrong with bootstrapping, then we are in `{loggedIn: "error"}` state
- everything was ok and the user logged in to our system for the first time, then we needed to register more information about their child (or children), then we are in `{loggedIn: "register"}` state
- user registered his/her children and we are in `{loggedIn: "children"}` state
- if there is only one child, then the state will change automatically to the `{loggedIn: "child"}` state
- if a parent wants to reach the parent dashboard, we will go to the `{loggedIn: "parent"}` state

Knowing these states at any time in anywhere of the application allows us to decide what we need to do in these states. for example, consider user load our app and will redirect to the child dashboard. If we were in `{loggedIn: "child"}` dashboard, then we would retrieve our child info and show the necessary information. But if we are in `{loggedIn: "children"}` state, we need to ask the user about the child selection.

We have provided some hooks for you to achieve this goal.

First, we talk about `useStatus`.

With this hook, you can know the current state of the app. Don't worry; you don't need to compare each state. We provided some more straightforward APIs for you. Look at the below example:

```typescript
import { useStatus } from "@kidneed/hooks";

const isGuest = useStatus("guest");
// if we are in "guest" state isGuest will be true,
// otherwise it will be false
```

Suppose you need to check more than one state at a time. Just pass the states as an array, and you will get an array of booleans in response.

```typescript
import { useStatus } from "@kidneed/hooks";

const [isGuest, isLoggedIn, isChildSelected] = useStatus([
  "guest",
  "loggedIn",
  { loggedIn: "child" },
]);

// consider you can use "loggedIn" for matching any loggedIn state
// but if you need a more specific state, pass the exact state
```

Don't worry about the states and the syntax. We typed all our core functionality, and typescript will help you autocomplete what you need.

Sometimes we need specific actions to transition our state to another one. We provided another hook for you, named `useApp`, to achieve this goal.

There are just three transitions we defined. First when you want to login into our app, second when you want to log out, and the third when you want to select a specific user's child. But importantly, you need some context when you are in particular states. We can do all of these things with just one hook.

```typescript
import { useApp } from "@kidneed/hooks";
import { Models } from "@kidneed/types";

export default function SomePage() {
  const { login, logout, selectChild, ctx } = useApp();

  // to login specific user:
  let user: Models.User;
  login(user);

  // to logout
  logout();

  // to select a child
  let child: Models.Child;
  selectChild(child);

  // also you have access to certain contexts when you are in a specific state

  const { user, children, child } = ctx;
  // some of this context are "null" in specific states.
  // for example if you are in "guest" state all of the properties in context will be null
}
```

- types
  in this module, you have access to all our predefined types.
  These types include:

  - models

  use it if you need to know the shape of our backend models

  - guard
    use it when you want to define a new guard to protect the pages

- services

Our services include the two most important services you need to work with them to communicate to our backend app.

- strapi

  for more information, take a look at [Strapi SDK JS](https://strapi-sdk-js.netlify.app/)

- API
  predefined routes API

## Layouts

You can use layout for repeated patterns in your app. We also need to use it to shape our dashboard pages. we implemented two dashboard layouts for our parent and child section, and you can use them if you need them ()

for using layouts on your page, follow this guide:
[nextjs layouts](https://nextjs.org/docs/basic-features/layouts)

## Route Guard

Every app needs to protect its content in some way. Our solution for this need was to design a guard API.

On every page of the application, you can define a property named `guard` on your component:

```typescript
function Login() {}

Login.guard = loginGuard;
```

We know you need to access some state and router to do your job best. We design a guard API for you. Just follow the example to learn more about that:

```typescript
import { Guard } from "@kidneed/types";

const loginGuard: Guard = (matcher, ctx, router) => {
  // first we need to check if user is guest
  // if user was a guest then we let user pass
  if (matcher("guest")) {
    return true;
  }

  // if user wasn't guest it means use already logged in in out system
  // then we need to redirect user to the dashboard
  // and send "false" to prevent app from rendering the login page
  router.push("/child/dashboard");
  return false;

  // also consider you have access to the ctx object in order
  // to get a more difficult specific decision
};
```

## Restrictions

the following text will clarify the changes you are allowed to contribute to the project based on your defined tasks

- you are not allowed to change any config of the project

  It means you cannot change any file outside of the `src` directory.

- you are not allowed to add a new content type to the project. Please consider using the' payload' field if you need more fields to keep something more.

- each task relates to one specific file in the `src/pages` directory. Please don't change other files in `src/pages` unrelated to your task. For adding new functionality or reusable code, please create a directory with your team's name in `src` and add what you want under that directory. for example, if your team's name is `earth`, create a directory named `earth` under `src` and then you can divide your structure like `components`, `utils`, etc. under it.

- you are not allowed to install any library.
