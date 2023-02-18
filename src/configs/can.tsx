import {createContext} from 'react';
import {createContextualCan} from '@casl/react';
import {
  AbilityBuilder,
  AbilityClass,
  AnyAbility,
  PureAbility,
} from '@casl/ability';

export type PermissionAction = 'create' | 'read' | 'update' | 'delete';
export type PermissionObjectType = any;
export type AppAbility = PureAbility<[PermissionAction, PermissionObjectType]>;
const AppAbility = PureAbility as AbilityClass<AppAbility>;

export const caslAbility = () => {
  const {can, rules} = new AbilityBuilder(AppAbility);
  // initial rules here
  // can(['read', 'create'], 'Todo');
  return new AppAbility(rules, {
    detectSubjectType: object => object!.type,
  });
};

export const AbilityContext = createContext<AnyAbility | null>(null);
export const Can = createContextualCan<any>(AbilityContext.Consumer);
