/* eslint-disable */
import * as types from './graphql';
import { TypedDocumentNode as DocumentNode } from '@graphql-typed-document-node/core';

/**
 * Map of all GraphQL operations in the project.
 *
 * This map has several performance disadvantages:
 * 1. It is not tree-shakeable, so it will include all operations in the project.
 * 2. It is not minifiable, so the string of a GraphQL query will be multiple times inside the bundle.
 * 3. It does not support dead code elimination, so it will add unused operations.
 *
 * Therefore it is highly recommended to use the babel or swc plugin for production.
 * Learn more about it here: https://the-guild.dev/graphql/codegen/plugins/presets/preset-client#reducing-bundle-size
 */
const documents = {
    "\n  query Ads {\n    ads {\n      id\n      picture\n      title\n      price\n      description\n      owner\n      location\n      createdAt\n      category {\n        id\n        name\n      }\n    }\n  }\n": types.AdsDocument,
    "\n  query Ad($adId: ID!) {\n    ad(id: $adId) {\n      id\n      title\n      description\n      price\n      picture\n      owner\n      location\n      createdAt\n      tags {\n        id\n        name\n      }\n      category {\n        id\n        name\n      }\n    }\n  }\n": types.AdDocument,
    "\n  mutation CreateAd($data: AdCreateInput!) {\n    createAd(data: $data) {\n      id\n    }\n  }\n": types.CreateAdDocument,
    "\n  mutation UpdateAdd($data: AdUpdateInput!, $adId: ID!) {\n    updateAdd(data: $data, id: $adId) {\n      id\n      title\n    }\n  }\n": types.UpdateAddDocument,
    "\n  mutation DeleteAd($adId: ID!) {\n    deleteAd(id: $adId) {\n      id\n    }\n  }\n": types.DeleteAdDocument,
    "\n  query Categories {\n    categories {\n      id\n      name\n    }\n  }\n": types.CategoriesDocument,
    "\n  query Category($categoryId: ID!) {\n    category(id: $categoryId) {\n      id\n      name\n      ads {\n        title\n        price\n        picture\n        owner\n        location\n        id\n        description\n        createdAt\n        category{\n        id\n        name\n        }\n      }\n    }\n  }\n": types.CategoryDocument,
    "\n  mutation CreateCategory($data: CreateCategoryInput!) {\n    createCategory(data: $data) {\n      name\n      id\n    }\n  }\n": types.CreateCategoryDocument,
    "\n  query Tags {\n    tags {\n      id\n      name\n    }\n  }\n": types.TagsDocument,
    "\n  mutation AddTag($data: CreateTagInput!) {\n    createTag(data: $data) {\n      name\n      id\n    }\n  }\n": types.AddTagDocument,
};

/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 *
 *
 * @example
 * ```ts
 * const query = gql(`query GetUser($id: ID!) { user(id: $id) { name } }`);
 * ```
 *
 * The query argument is unknown!
 * Please regenerate the types.
 */
export function gql(source: string): unknown;

/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(source: "\n  query Ads {\n    ads {\n      id\n      picture\n      title\n      price\n      description\n      owner\n      location\n      createdAt\n      category {\n        id\n        name\n      }\n    }\n  }\n"): (typeof documents)["\n  query Ads {\n    ads {\n      id\n      picture\n      title\n      price\n      description\n      owner\n      location\n      createdAt\n      category {\n        id\n        name\n      }\n    }\n  }\n"];
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(source: "\n  query Ad($adId: ID!) {\n    ad(id: $adId) {\n      id\n      title\n      description\n      price\n      picture\n      owner\n      location\n      createdAt\n      tags {\n        id\n        name\n      }\n      category {\n        id\n        name\n      }\n    }\n  }\n"): (typeof documents)["\n  query Ad($adId: ID!) {\n    ad(id: $adId) {\n      id\n      title\n      description\n      price\n      picture\n      owner\n      location\n      createdAt\n      tags {\n        id\n        name\n      }\n      category {\n        id\n        name\n      }\n    }\n  }\n"];
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(source: "\n  mutation CreateAd($data: AdCreateInput!) {\n    createAd(data: $data) {\n      id\n    }\n  }\n"): (typeof documents)["\n  mutation CreateAd($data: AdCreateInput!) {\n    createAd(data: $data) {\n      id\n    }\n  }\n"];
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(source: "\n  mutation UpdateAdd($data: AdUpdateInput!, $adId: ID!) {\n    updateAdd(data: $data, id: $adId) {\n      id\n      title\n    }\n  }\n"): (typeof documents)["\n  mutation UpdateAdd($data: AdUpdateInput!, $adId: ID!) {\n    updateAdd(data: $data, id: $adId) {\n      id\n      title\n    }\n  }\n"];
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(source: "\n  mutation DeleteAd($adId: ID!) {\n    deleteAd(id: $adId) {\n      id\n    }\n  }\n"): (typeof documents)["\n  mutation DeleteAd($adId: ID!) {\n    deleteAd(id: $adId) {\n      id\n    }\n  }\n"];
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(source: "\n  query Categories {\n    categories {\n      id\n      name\n    }\n  }\n"): (typeof documents)["\n  query Categories {\n    categories {\n      id\n      name\n    }\n  }\n"];
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(source: "\n  query Category($categoryId: ID!) {\n    category(id: $categoryId) {\n      id\n      name\n      ads {\n        title\n        price\n        picture\n        owner\n        location\n        id\n        description\n        createdAt\n        category{\n        id\n        name\n        }\n      }\n    }\n  }\n"): (typeof documents)["\n  query Category($categoryId: ID!) {\n    category(id: $categoryId) {\n      id\n      name\n      ads {\n        title\n        price\n        picture\n        owner\n        location\n        id\n        description\n        createdAt\n        category{\n        id\n        name\n        }\n      }\n    }\n  }\n"];
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(source: "\n  mutation CreateCategory($data: CreateCategoryInput!) {\n    createCategory(data: $data) {\n      name\n      id\n    }\n  }\n"): (typeof documents)["\n  mutation CreateCategory($data: CreateCategoryInput!) {\n    createCategory(data: $data) {\n      name\n      id\n    }\n  }\n"];
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(source: "\n  query Tags {\n    tags {\n      id\n      name\n    }\n  }\n"): (typeof documents)["\n  query Tags {\n    tags {\n      id\n      name\n    }\n  }\n"];
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(source: "\n  mutation AddTag($data: CreateTagInput!) {\n    createTag(data: $data) {\n      name\n      id\n    }\n  }\n"): (typeof documents)["\n  mutation AddTag($data: CreateTagInput!) {\n    createTag(data: $data) {\n      name\n      id\n    }\n  }\n"];

export function gql(source: string) {
  return (documents as any)[source] ?? {};
}

export type DocumentType<TDocumentNode extends DocumentNode<any, any>> = TDocumentNode extends DocumentNode<  infer TType,  any>  ? TType  : never;