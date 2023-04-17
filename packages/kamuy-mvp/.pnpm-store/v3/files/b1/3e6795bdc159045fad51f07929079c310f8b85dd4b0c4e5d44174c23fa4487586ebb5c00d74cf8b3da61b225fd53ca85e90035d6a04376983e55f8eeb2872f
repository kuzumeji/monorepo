import { S as SvelteRenderer, a as SvelteStoryResult } from './types-ee5cbd7c.js';
import * as lib_types_dist from 'lib/types/dist';
import * as svelte from 'svelte';
import { SvelteComponentTyped, ComponentType, ComponentProps } from 'svelte';
import { Args, ComponentAnnotations, AnnotatedStoryFn, ArgsStoryFn, ArgsFromMeta, StoryAnnotations, StrictArgs, DecoratorFunction, LoaderFunction, StoryContext as StoryContext$1, ProjectAnnotations } from '@storybook/types';
export { ArgTypes, Args, Parameters, StrictArgs } from '@storybook/types';
import { Simplify, SetOptional } from 'type-fest';

declare const forceReRender: () => void;
declare const raw: ((...args: any[]) => never) | (() => lib_types_dist.BoundStory<SvelteRenderer<svelte.SvelteComponentTyped<any, any, any>>>[] | undefined);
declare const storiesOf: (kind: string, m: any) => lib_types_dist.Addon_StoryApi<SvelteStoryResult<any, any>>;
declare const configure: (...args: any[]) => any;

/**
 * Metadata to configure the stories for a component.
 *
 * @see [Default export](https://storybook.js.org/docs/formats/component-story-format/#default-export)
 */
type Meta<CmpOrArgs = Args> = CmpOrArgs extends SvelteComponentTyped<infer Props> ? ComponentAnnotations<SvelteRenderer<CmpOrArgs>, Props> : ComponentAnnotations<SvelteRenderer, CmpOrArgs>;
/**
 * Story function that represents a CSFv2 component example.
 *
 * @see [Named Story exports](https://storybook.js.org/docs/formats/component-story-format/#named-story-exports)
 */
type StoryFn<TCmpOrArgs = Args> = TCmpOrArgs extends SvelteComponentTyped<infer Props> ? AnnotatedStoryFn<SvelteRenderer, Props> : AnnotatedStoryFn<SvelteRenderer, TCmpOrArgs>;
/**
 * Story function that represents a CSFv3 component example.
 *
 * @see [Named Story exports](https://storybook.js.org/docs/formats/component-story-format/#named-story-exports)
 */
type StoryObj<MetaOrCmpOrArgs = Args> = MetaOrCmpOrArgs extends {
    render?: ArgsStoryFn<SvelteRenderer, any>;
    component?: ComponentType<infer Component>;
    args?: infer DefaultArgs;
} ? Simplify<ComponentProps<Component> & ArgsFromMeta<SvelteRenderer, MetaOrCmpOrArgs>> extends infer TArgs ? StoryAnnotations<SvelteRenderer<Component>, TArgs, SetOptional<TArgs, Extract<keyof TArgs, keyof DefaultArgs>>> : never : MetaOrCmpOrArgs extends SvelteComponentTyped ? StoryAnnotations<SvelteRenderer<MetaOrCmpOrArgs>, ComponentProps<MetaOrCmpOrArgs>> : StoryAnnotations<SvelteRenderer, MetaOrCmpOrArgs>;

type Decorator<TArgs = StrictArgs> = DecoratorFunction<SvelteRenderer, TArgs>;
type Loader<TArgs = StrictArgs> = LoaderFunction<SvelteRenderer, TArgs>;
type StoryContext<TArgs = StrictArgs> = StoryContext$1<SvelteRenderer, TArgs>;
type Preview = ProjectAnnotations<SvelteRenderer>;

export { Decorator, Loader, Meta, Preview, StoryContext, StoryFn, StoryObj, SvelteRenderer, configure, forceReRender, raw, storiesOf };
