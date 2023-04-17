import * as lib_docs_tools_dist from 'lib/docs-tools/dist';
import * as lib_types_dist from 'lib/types/dist';
import { RenderContext, ArgsStoryFn } from '@storybook/types';
import { S as SvelteRenderer } from './types-ee5cbd7c.js';
import 'svelte';

type Component = any;
declare function extractComponentDescription(component?: Component): string;

declare const decorators: ((storyFn: any, context: lib_types_dist.StoryContext<lib_types_dist.Renderer, lib_types_dist.Args>) => any)[];
declare const argTypesEnhancers: (<TRenderer extends lib_types_dist.Renderer>(context: lib_types_dist.StoryContextForEnhancers<TRenderer, lib_types_dist.Args>) => lib_types_dist.StrictArgTypes<lib_types_dist.Args>)[];

declare function renderToCanvas({ storyFn, kind, name, showMain, showError, storyContext, forceRemount, }: RenderContext<SvelteRenderer>, canvasElement: SvelteRenderer['canvasElement']): () => void;
declare const render: ArgsStoryFn<SvelteRenderer>;

declare function decorateStory(storyFn: any, decorators: any[]): any;

declare const parameters: {
    docs: {
        story: {
            inline: boolean;
        };
        extractArgTypes: lib_docs_tools_dist.ArgTypesExtractor;
        extractComponentDescription: typeof extractComponentDescription;
    };
    renderer: "svelte";
};

export { decorateStory as applyDecorators, argTypesEnhancers, decorators, parameters, render, renderToCanvas };
