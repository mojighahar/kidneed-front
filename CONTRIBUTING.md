# Kidneed Contribution Guide

1. First fork the project
2. clone the project in your local environment
3. apply your changes based on defined tasks for your team
4. create pull request against main branch in main repo

you can use the following video for more information about contributing to open source project:
[How to Fork and Clone a GitHub Repository](https://app.egghead.io/lessons/javascript-how-to-fork-and-clone-a-github-repository?pl=how-to-contribute-to-an-open-source-project-on-github)

for creating pull request watch this:
[How to create a Pull Request on GitHub](https://app.egghead.io/lessons/javascript-how-to-create-a-pull-request-on-github?pl=how-to-contribute-to-an-open-source-project-on-github)

## COMMITS

In order to commit your changes please follow the conventional commits rules if it is possible for you (there is no restriction on it, but we will be happier if you follow the below guide):
[Conventional Commits Guideline](https://www.conventionalcommits.org/en/v1.0.0/)

## LIST OF LIBRARIES

the following libraries have installed and configured on the project and then you can take advantage of it. but consider that you are not allowed to change the default config of these libraries.

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

for your convenience and be able to contribute to the projects in one day in parallel we developed some part of the app earlier.

the `src/core` directory include all our developed part of the app. what you need to know is that there are 6 package that you can use in your development.

- @kidneed/containers
- @kidneed/hooks
- @kidneed/context
- @kidneed/utils
- @kidneed/types
- @kidneed/services

## Containers

our core containers include some component helper to render the shared area of our app.

- access denied:
  this component will render if user wants to access a page that is not allowed (read guard section for more information)

- loading:
  this component will render in full page when user logins to app, and we are bootstraping the app for first time (it means when user reload our app)

- protected:
  this component will handle the user permission to view the pages

- reload:
  this component let user to reload the page when something unpredictable happens

- context:
  our context contain just one service that handle the user state. we're using xstate for this part. you don't need to know anything about it or using context for any area of your development, but if you are familiar with `xstate` you can use the context in whatever way you want.

- hooks:
  we just developed some hooks for you to handle the state of the app. before we introduce these hooks we need to explain the logic of our state:

### The below list contains the state of the user when he loads our app:

- app is in `init` state
- app initialization finished and user is `guest`
- we found that user is `loggedIn` in our system. if use is `loggedIn` we have more state in it:
- we're bootstrapping the user info. then we are in `{loggedIn: "init"}` state
- there are some thing wrong in bootstrapping then we are in `{loggedIn: "error"}` state
- everything was ok and user logged in in our system for first time, then we need to register more information about his/her child (or children), then we are in `{loggedIn: "register"}` state
- user registered his/her children and we are in `{loggedIn: "children"}` state
- if there is only one child then the state will change automatically to the `{loggedIn: "child"}` state
- if parent wants to reach the parent dashboard we will go to the `{loggedIn: "parent"}` state

with knowing these state at anytime in anywhere of the application we are able to decide what we need to the in these states. for example consider user load our app and will redirect to the child dashboard. if we were in `{loggedIn: "child"}` dashboard then we wil retrieve our child info and show the necessary information. but if are in `{loggedIn: "children"}` state we need to ask the user about the child selection.

we have provided some hooks for you to achieve this goal.

first we talk about `useStatus`.

with this hook you are able to know the current state of the app. don't worry, you don't need to compare each state, we provided some easier api for you. look at below example:

```typescript
import { useStatus } from "@kidneed/hooks";

const isGuest = useStatus("guest");
// if we are in "guest" state isGuest will be true,
// otherwise it will be false
```

if you need to check more than one state at a time there is no worry. just pass the states as array and you will get an array of booleans in response.

```typescript
import { useStatus } from "@kidneed/hooks";

const [isGuest, isLoggedIn, isChildSelected] = useStatus([
  "guest",
  "loggedIn",
  { loggedIn: "child" },
]);

// consider you can use "loggedIn" for matching any loggedIn state
// but if you need more specific state just pass the exact state
```

don't worry about the states and the syntax. we typed all entire our core functionality, and typescript will help you to autocomplete what you really need.

sometimes we need specific actions to transient our state to another one. for achieve this goal we provided another hook for your named `useApp`

there are just 3 transition we defined. when you want to login to our app, when you want to logout, our you want to select users child. but importantly you need some context when you are in specific states. we are able to do all of these things with just one hook.

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

  // also you have access to certain context when you are in specific state

  const { user, children, child } = ctx;
  // some of this context are "null" in specific states.
  // for example if you are in "guest" state all of the properties in context will be null
}
```

- types
  in this module you have access to all our predefined types.
  these types includes:

  - models

  use it if you need to know the shape of our backend models

  - guard
    use it when you want to define new guard for protect the pages

- services

our services include 2 most important service that you need to work with them to communicate to our backend app.

- strapi

  for more information take a look at [Strapi SDK JS](https://strapi-sdk-js.netlify.app/)

- api
  predefined routes api

## Layouts

you can use layout for repeated pattern in your app. we need also need to use it to shape our dashboard pages. we implemented two dashboard layout for our parent and child section and you can use them if you need them ()

for using layouts in your page just follow this guide:
[nextjs layouts](https://nextjs.org/docs/basic-features/layouts)

## Route Guard

every app needs to protect it's content in some way. our solution for this need was design a guard api.

in every page of the application you can define a property named `guard` on your component:

```typescript
function Login() {}

Login.guard = loginGuard;
```

we know you need to access some state and router to do your job best. because of that we design a guard api for you. just follow the example to know more about that:

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
  // to get more difficult specific decision
};
```

## Restrictions

the following text will clarify the changes you are allowed in order to contribute to the project based on your defined tasks

- you are not allowed to change any config of the project

  It means you are not allowed to change any file outside of the `src` directory

- you are not allowed to adding new content-type to the project. if you need more fields to keep something more please consider using `payload` field.

- each task relate to one specific file in the `src/pages` directory. please don't change other files in `src/pages` that is not relate to your task. for adding new functionality or reusable code please create a directory with your team's name in `src` and add what you want under that directory. for example if your team's name is `earth` just create a directory named `earth` under `src` and then you can divide your structure like `components`, `utils`, etc under it.

- your are not allowed to install any library.
