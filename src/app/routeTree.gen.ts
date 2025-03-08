/* eslint-disable */

// @ts-nocheck

// noinspection JSUnusedGlobalSymbols

// This file was automatically generated by TanStack Router.
// You should NOT make any changes in this file as it will be overwritten.
// Additionally, you should also exclude this file from your linter and/or formatter to prevent it from being checked or modified.

// Import Routes

import { Route as rootRoute } from './routes/__root'
import { Route as NotAuthenticatedImport } from './routes/_notAuthenticated'
import { Route as AuthenticatedImport } from './routes/_authenticated'
import { Route as NotAuthenticatedResetPasswordImport } from './routes/_notAuthenticated/reset-password'
import { Route as AuthenticatedVerifyEmailImport } from './routes/_authenticated/verify-email'
import { Route as AuthenticatedSkillsImport } from './routes/_authenticated/skills'
import { Route as AuthenticatedSettingsImport } from './routes/_authenticated/settings'
import { Route as AuthenticatedLanguagesImport } from './routes/_authenticated/languages'
import { Route as AuthenticatedUsersIndexImport } from './routes/_authenticated/users/index'
import { Route as AuthenticatedProjectsIndexImport } from './routes/_authenticated/projects/index'
import { Route as AuthenticatedCvsIndexImport } from './routes/_authenticated/cvs/index'
import { Route as NotAuthenticatedAuthRegisterImport } from './routes/_notAuthenticated/auth/register'
import { Route as NotAuthenticatedAuthLoginImport } from './routes/_notAuthenticated/auth/login'
import { Route as NotAuthenticatedAuthForgotPasswordImport } from './routes/_notAuthenticated/auth/forgot-password'
import { Route as AuthenticatedUsersUserIdImport } from './routes/_authenticated/users/$userId'

// Create/Update Routes

const NotAuthenticatedRoute = NotAuthenticatedImport.update({
  id: '/_notAuthenticated',
  getParentRoute: () => rootRoute,
} as any)

const AuthenticatedRoute = AuthenticatedImport.update({
  id: '/_authenticated',
  getParentRoute: () => rootRoute,
} as any)

const NotAuthenticatedResetPasswordRoute =
  NotAuthenticatedResetPasswordImport.update({
    id: '/reset-password',
    path: '/reset-password',
    getParentRoute: () => NotAuthenticatedRoute,
  } as any)

const AuthenticatedVerifyEmailRoute = AuthenticatedVerifyEmailImport.update({
  id: '/verify-email',
  path: '/verify-email',
  getParentRoute: () => AuthenticatedRoute,
} as any)

const AuthenticatedSkillsRoute = AuthenticatedSkillsImport.update({
  id: '/skills',
  path: '/skills',
  getParentRoute: () => AuthenticatedRoute,
} as any)

const AuthenticatedSettingsRoute = AuthenticatedSettingsImport.update({
  id: '/settings',
  path: '/settings',
  getParentRoute: () => AuthenticatedRoute,
} as any)

const AuthenticatedLanguagesRoute = AuthenticatedLanguagesImport.update({
  id: '/languages',
  path: '/languages',
  getParentRoute: () => AuthenticatedRoute,
} as any)

const AuthenticatedUsersIndexRoute = AuthenticatedUsersIndexImport.update({
  id: '/users/',
  path: '/users/',
  getParentRoute: () => AuthenticatedRoute,
} as any)

const AuthenticatedProjectsIndexRoute = AuthenticatedProjectsIndexImport.update(
  {
    id: '/projects/',
    path: '/projects/',
    getParentRoute: () => AuthenticatedRoute,
  } as any,
)

const AuthenticatedCvsIndexRoute = AuthenticatedCvsIndexImport.update({
  id: '/cvs/',
  path: '/cvs/',
  getParentRoute: () => AuthenticatedRoute,
} as any)

const NotAuthenticatedAuthRegisterRoute =
  NotAuthenticatedAuthRegisterImport.update({
    id: '/auth/register',
    path: '/auth/register',
    getParentRoute: () => NotAuthenticatedRoute,
  } as any)

const NotAuthenticatedAuthLoginRoute = NotAuthenticatedAuthLoginImport.update({
  id: '/auth/login',
  path: '/auth/login',
  getParentRoute: () => NotAuthenticatedRoute,
} as any)

const NotAuthenticatedAuthForgotPasswordRoute =
  NotAuthenticatedAuthForgotPasswordImport.update({
    id: '/auth/forgot-password',
    path: '/auth/forgot-password',
    getParentRoute: () => NotAuthenticatedRoute,
  } as any)

const AuthenticatedUsersUserIdRoute = AuthenticatedUsersUserIdImport.update({
  id: '/users/$userId',
  path: '/users/$userId',
  getParentRoute: () => AuthenticatedRoute,
} as any)

// Populate the FileRoutesByPath interface

declare module '@tanstack/react-router' {
  interface FileRoutesByPath {
    '/_authenticated': {
      id: '/_authenticated'
      path: ''
      fullPath: ''
      preLoaderRoute: typeof AuthenticatedImport
      parentRoute: typeof rootRoute
    }
    '/_notAuthenticated': {
      id: '/_notAuthenticated'
      path: ''
      fullPath: ''
      preLoaderRoute: typeof NotAuthenticatedImport
      parentRoute: typeof rootRoute
    }
    '/_authenticated/languages': {
      id: '/_authenticated/languages'
      path: '/languages'
      fullPath: '/languages'
      preLoaderRoute: typeof AuthenticatedLanguagesImport
      parentRoute: typeof AuthenticatedImport
    }
    '/_authenticated/settings': {
      id: '/_authenticated/settings'
      path: '/settings'
      fullPath: '/settings'
      preLoaderRoute: typeof AuthenticatedSettingsImport
      parentRoute: typeof AuthenticatedImport
    }
    '/_authenticated/skills': {
      id: '/_authenticated/skills'
      path: '/skills'
      fullPath: '/skills'
      preLoaderRoute: typeof AuthenticatedSkillsImport
      parentRoute: typeof AuthenticatedImport
    }
    '/_authenticated/verify-email': {
      id: '/_authenticated/verify-email'
      path: '/verify-email'
      fullPath: '/verify-email'
      preLoaderRoute: typeof AuthenticatedVerifyEmailImport
      parentRoute: typeof AuthenticatedImport
    }
    '/_notAuthenticated/reset-password': {
      id: '/_notAuthenticated/reset-password'
      path: '/reset-password'
      fullPath: '/reset-password'
      preLoaderRoute: typeof NotAuthenticatedResetPasswordImport
      parentRoute: typeof NotAuthenticatedImport
    }
    '/_authenticated/users/$userId': {
      id: '/_authenticated/users/$userId'
      path: '/users/$userId'
      fullPath: '/users/$userId'
      preLoaderRoute: typeof AuthenticatedUsersUserIdImport
      parentRoute: typeof AuthenticatedImport
    }
    '/_notAuthenticated/auth/forgot-password': {
      id: '/_notAuthenticated/auth/forgot-password'
      path: '/auth/forgot-password'
      fullPath: '/auth/forgot-password'
      preLoaderRoute: typeof NotAuthenticatedAuthForgotPasswordImport
      parentRoute: typeof NotAuthenticatedImport
    }
    '/_notAuthenticated/auth/login': {
      id: '/_notAuthenticated/auth/login'
      path: '/auth/login'
      fullPath: '/auth/login'
      preLoaderRoute: typeof NotAuthenticatedAuthLoginImport
      parentRoute: typeof NotAuthenticatedImport
    }
    '/_notAuthenticated/auth/register': {
      id: '/_notAuthenticated/auth/register'
      path: '/auth/register'
      fullPath: '/auth/register'
      preLoaderRoute: typeof NotAuthenticatedAuthRegisterImport
      parentRoute: typeof NotAuthenticatedImport
    }
    '/_authenticated/cvs/': {
      id: '/_authenticated/cvs/'
      path: '/cvs'
      fullPath: '/cvs'
      preLoaderRoute: typeof AuthenticatedCvsIndexImport
      parentRoute: typeof AuthenticatedImport
    }
    '/_authenticated/projects/': {
      id: '/_authenticated/projects/'
      path: '/projects'
      fullPath: '/projects'
      preLoaderRoute: typeof AuthenticatedProjectsIndexImport
      parentRoute: typeof AuthenticatedImport
    }
    '/_authenticated/users/': {
      id: '/_authenticated/users/'
      path: '/users'
      fullPath: '/users'
      preLoaderRoute: typeof AuthenticatedUsersIndexImport
      parentRoute: typeof AuthenticatedImport
    }
  }
}

// Create and export the route tree

interface AuthenticatedRouteChildren {
  AuthenticatedLanguagesRoute: typeof AuthenticatedLanguagesRoute
  AuthenticatedSettingsRoute: typeof AuthenticatedSettingsRoute
  AuthenticatedSkillsRoute: typeof AuthenticatedSkillsRoute
  AuthenticatedVerifyEmailRoute: typeof AuthenticatedVerifyEmailRoute
  AuthenticatedUsersUserIdRoute: typeof AuthenticatedUsersUserIdRoute
  AuthenticatedCvsIndexRoute: typeof AuthenticatedCvsIndexRoute
  AuthenticatedProjectsIndexRoute: typeof AuthenticatedProjectsIndexRoute
  AuthenticatedUsersIndexRoute: typeof AuthenticatedUsersIndexRoute
}

const AuthenticatedRouteChildren: AuthenticatedRouteChildren = {
  AuthenticatedLanguagesRoute: AuthenticatedLanguagesRoute,
  AuthenticatedSettingsRoute: AuthenticatedSettingsRoute,
  AuthenticatedSkillsRoute: AuthenticatedSkillsRoute,
  AuthenticatedVerifyEmailRoute: AuthenticatedVerifyEmailRoute,
  AuthenticatedUsersUserIdRoute: AuthenticatedUsersUserIdRoute,
  AuthenticatedCvsIndexRoute: AuthenticatedCvsIndexRoute,
  AuthenticatedProjectsIndexRoute: AuthenticatedProjectsIndexRoute,
  AuthenticatedUsersIndexRoute: AuthenticatedUsersIndexRoute,
}

const AuthenticatedRouteWithChildren = AuthenticatedRoute._addFileChildren(
  AuthenticatedRouteChildren,
)

interface NotAuthenticatedRouteChildren {
  NotAuthenticatedResetPasswordRoute: typeof NotAuthenticatedResetPasswordRoute
  NotAuthenticatedAuthForgotPasswordRoute: typeof NotAuthenticatedAuthForgotPasswordRoute
  NotAuthenticatedAuthLoginRoute: typeof NotAuthenticatedAuthLoginRoute
  NotAuthenticatedAuthRegisterRoute: typeof NotAuthenticatedAuthRegisterRoute
}

const NotAuthenticatedRouteChildren: NotAuthenticatedRouteChildren = {
  NotAuthenticatedResetPasswordRoute: NotAuthenticatedResetPasswordRoute,
  NotAuthenticatedAuthForgotPasswordRoute:
    NotAuthenticatedAuthForgotPasswordRoute,
  NotAuthenticatedAuthLoginRoute: NotAuthenticatedAuthLoginRoute,
  NotAuthenticatedAuthRegisterRoute: NotAuthenticatedAuthRegisterRoute,
}

const NotAuthenticatedRouteWithChildren =
  NotAuthenticatedRoute._addFileChildren(NotAuthenticatedRouteChildren)

export interface FileRoutesByFullPath {
  '': typeof NotAuthenticatedRouteWithChildren
  '/languages': typeof AuthenticatedLanguagesRoute
  '/settings': typeof AuthenticatedSettingsRoute
  '/skills': typeof AuthenticatedSkillsRoute
  '/verify-email': typeof AuthenticatedVerifyEmailRoute
  '/reset-password': typeof NotAuthenticatedResetPasswordRoute
  '/users/$userId': typeof AuthenticatedUsersUserIdRoute
  '/auth/forgot-password': typeof NotAuthenticatedAuthForgotPasswordRoute
  '/auth/login': typeof NotAuthenticatedAuthLoginRoute
  '/auth/register': typeof NotAuthenticatedAuthRegisterRoute
  '/cvs': typeof AuthenticatedCvsIndexRoute
  '/projects': typeof AuthenticatedProjectsIndexRoute
  '/users': typeof AuthenticatedUsersIndexRoute
}

export interface FileRoutesByTo {
  '': typeof NotAuthenticatedRouteWithChildren
  '/languages': typeof AuthenticatedLanguagesRoute
  '/settings': typeof AuthenticatedSettingsRoute
  '/skills': typeof AuthenticatedSkillsRoute
  '/verify-email': typeof AuthenticatedVerifyEmailRoute
  '/reset-password': typeof NotAuthenticatedResetPasswordRoute
  '/users/$userId': typeof AuthenticatedUsersUserIdRoute
  '/auth/forgot-password': typeof NotAuthenticatedAuthForgotPasswordRoute
  '/auth/login': typeof NotAuthenticatedAuthLoginRoute
  '/auth/register': typeof NotAuthenticatedAuthRegisterRoute
  '/cvs': typeof AuthenticatedCvsIndexRoute
  '/projects': typeof AuthenticatedProjectsIndexRoute
  '/users': typeof AuthenticatedUsersIndexRoute
}

export interface FileRoutesById {
  __root__: typeof rootRoute
  '/_authenticated': typeof AuthenticatedRouteWithChildren
  '/_notAuthenticated': typeof NotAuthenticatedRouteWithChildren
  '/_authenticated/languages': typeof AuthenticatedLanguagesRoute
  '/_authenticated/settings': typeof AuthenticatedSettingsRoute
  '/_authenticated/skills': typeof AuthenticatedSkillsRoute
  '/_authenticated/verify-email': typeof AuthenticatedVerifyEmailRoute
  '/_notAuthenticated/reset-password': typeof NotAuthenticatedResetPasswordRoute
  '/_authenticated/users/$userId': typeof AuthenticatedUsersUserIdRoute
  '/_notAuthenticated/auth/forgot-password': typeof NotAuthenticatedAuthForgotPasswordRoute
  '/_notAuthenticated/auth/login': typeof NotAuthenticatedAuthLoginRoute
  '/_notAuthenticated/auth/register': typeof NotAuthenticatedAuthRegisterRoute
  '/_authenticated/cvs/': typeof AuthenticatedCvsIndexRoute
  '/_authenticated/projects/': typeof AuthenticatedProjectsIndexRoute
  '/_authenticated/users/': typeof AuthenticatedUsersIndexRoute
}

export interface FileRouteTypes {
  fileRoutesByFullPath: FileRoutesByFullPath
  fullPaths:
    | ''
    | '/languages'
    | '/settings'
    | '/skills'
    | '/verify-email'
    | '/reset-password'
    | '/users/$userId'
    | '/auth/forgot-password'
    | '/auth/login'
    | '/auth/register'
    | '/cvs'
    | '/projects'
    | '/users'
  fileRoutesByTo: FileRoutesByTo
  to:
    | ''
    | '/languages'
    | '/settings'
    | '/skills'
    | '/verify-email'
    | '/reset-password'
    | '/users/$userId'
    | '/auth/forgot-password'
    | '/auth/login'
    | '/auth/register'
    | '/cvs'
    | '/projects'
    | '/users'
  id:
    | '__root__'
    | '/_authenticated'
    | '/_notAuthenticated'
    | '/_authenticated/languages'
    | '/_authenticated/settings'
    | '/_authenticated/skills'
    | '/_authenticated/verify-email'
    | '/_notAuthenticated/reset-password'
    | '/_authenticated/users/$userId'
    | '/_notAuthenticated/auth/forgot-password'
    | '/_notAuthenticated/auth/login'
    | '/_notAuthenticated/auth/register'
    | '/_authenticated/cvs/'
    | '/_authenticated/projects/'
    | '/_authenticated/users/'
  fileRoutesById: FileRoutesById
}

export interface RootRouteChildren {
  AuthenticatedRoute: typeof AuthenticatedRouteWithChildren
  NotAuthenticatedRoute: typeof NotAuthenticatedRouteWithChildren
}

const rootRouteChildren: RootRouteChildren = {
  AuthenticatedRoute: AuthenticatedRouteWithChildren,
  NotAuthenticatedRoute: NotAuthenticatedRouteWithChildren,
}

export const routeTree = rootRoute
  ._addFileChildren(rootRouteChildren)
  ._addFileTypes<FileRouteTypes>()

/* ROUTE_MANIFEST_START
{
  "routes": {
    "__root__": {
      "filePath": "__root.tsx",
      "children": [
        "/_authenticated",
        "/_notAuthenticated"
      ]
    },
    "/_authenticated": {
      "filePath": "_authenticated.tsx",
      "children": [
        "/_authenticated/languages",
        "/_authenticated/settings",
        "/_authenticated/skills",
        "/_authenticated/verify-email",
        "/_authenticated/users/$userId",
        "/_authenticated/cvs/",
        "/_authenticated/projects/",
        "/_authenticated/users/"
      ]
    },
    "/_notAuthenticated": {
      "filePath": "_notAuthenticated.tsx",
      "children": [
        "/_notAuthenticated/reset-password",
        "/_notAuthenticated/auth/forgot-password",
        "/_notAuthenticated/auth/login",
        "/_notAuthenticated/auth/register"
      ]
    },
    "/_authenticated/languages": {
      "filePath": "_authenticated/languages.tsx",
      "parent": "/_authenticated"
    },
    "/_authenticated/settings": {
      "filePath": "_authenticated/settings.tsx",
      "parent": "/_authenticated"
    },
    "/_authenticated/skills": {
      "filePath": "_authenticated/skills.tsx",
      "parent": "/_authenticated"
    },
    "/_authenticated/verify-email": {
      "filePath": "_authenticated/verify-email.tsx",
      "parent": "/_authenticated"
    },
    "/_notAuthenticated/reset-password": {
      "filePath": "_notAuthenticated/reset-password.tsx",
      "parent": "/_notAuthenticated"
    },
    "/_authenticated/users/$userId": {
      "filePath": "_authenticated/users/$userId.tsx",
      "parent": "/_authenticated"
    },
    "/_notAuthenticated/auth/forgot-password": {
      "filePath": "_notAuthenticated/auth/forgot-password.tsx",
      "parent": "/_notAuthenticated"
    },
    "/_notAuthenticated/auth/login": {
      "filePath": "_notAuthenticated/auth/login.tsx",
      "parent": "/_notAuthenticated"
    },
    "/_notAuthenticated/auth/register": {
      "filePath": "_notAuthenticated/auth/register.tsx",
      "parent": "/_notAuthenticated"
    },
    "/_authenticated/cvs/": {
      "filePath": "_authenticated/cvs/index.tsx",
      "parent": "/_authenticated"
    },
    "/_authenticated/projects/": {
      "filePath": "_authenticated/projects/index.tsx",
      "parent": "/_authenticated"
    },
    "/_authenticated/users/": {
      "filePath": "_authenticated/users/index.tsx",
      "parent": "/_authenticated"
    }
  }
}
ROUTE_MANIFEST_END */
