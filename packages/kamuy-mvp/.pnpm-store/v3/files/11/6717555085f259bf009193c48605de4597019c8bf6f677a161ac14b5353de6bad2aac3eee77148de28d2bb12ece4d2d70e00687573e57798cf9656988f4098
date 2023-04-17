import { WebRenderer } from '@storybook/types';
import { SvelteComponentTyped, ComponentEvents, ComponentConstructorOptions } from 'svelte';

type ComponentType<Props extends Record<string, any> = any, Events extends Record<string, any> = any> = new (options: ComponentConstructorOptions<Props>) => {
    [P in keyof SvelteComponentTyped<Props> as P extends `$$${string}` ? never : P]: SvelteComponentTyped<Props, Events>[P];
};
interface SvelteRenderer<C extends SvelteComponentTyped = SvelteComponentTyped> extends WebRenderer {
    component: ComponentType<this['T'] extends Record<string, any> ? this['T'] : any>;
    storyResult: this['T'] extends Record<string, any> ? SvelteStoryResult<this['T'], ComponentEvents<C>> : SvelteStoryResult;
}
interface SvelteStoryResult<Props extends Record<string, any> = any, Events extends Record<string, any> = any> {
    Component?: ComponentType<Props>;
    on?: Record<string, any> extends Events ? Record<string, (event: CustomEvent) => void> : {
        [K in keyof Events as string extends K ? never : K]?: (event: Events[K]) => void;
    };
    props?: Props;
    decorator?: ComponentType<Props>;
}

export { SvelteRenderer as S, SvelteStoryResult as a };
