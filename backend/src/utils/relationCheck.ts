import { GraphQLResolveInfo } from "graphql";

export function hasRelation(info: GraphQLResolveInfo, relation: string) {
  const selections: any = info.fieldNodes[0].selectionSet?.selections;
  for (const selection of selections) {
    if (selection.kind === "Field" && selection.name.value === relation) {
      return true;
    }
  }
  return false;
}
