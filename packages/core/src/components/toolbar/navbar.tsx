import { Component, Element, Prop } from '@stencil/core';
import { createThemedClasses } from '../../utils/theme';
import { Config } from '../../index';


/**
 * @name Navbar
 * @description
 * Navbar acts as the navigational toolbar, which also comes with a back
 * button. A navbar can contain a `ion-title`, any number of buttons,
 * a segment, or a searchbar. Navbars must be placed within an
 * `<ion-header>` in order for them to be placed above the content.
 * It's important to note that navbar's are part of the dynamic navigation
 * stack. If you need a static toolbar, use ion-toolbar.
 *
 * @usage
 * ```html
 * <ion-header>
 *
 *   <ion-navbar>
 *     <ion-button menuToggle>
 *       <ion-icon slot="icon-only" name="menu"></ion-icon>
 *     </ion-button>
 *
 *     <ion-title>
 *       Page Title
 *     </ion-title>
 *
 *     <ion-buttons end>
 *       <ion-button (click)="openModal()">
 *         <ion-icon slot="icon-only" name="options"></ion-icon>
 *       </ion-button>
 *     </ion-buttons>
 *   </ion-navbar>
 *
 * </ion-header>
 * ```
 *
 * @demo /docs/demos/src/navbar/
 * @see {@link ../../toolbar/Toolbar/ Toolbar API Docs}
 */
@Component({
  tag: 'ion-navbar',
  host: {
    theme: 'toolbar'
  }
})
export class Navbar {
  @Element() private el: HTMLElement;
  mode: string;
  color: string;

  @Prop({ context: 'config' }) config: Config;
  @Prop() hideBackButton: boolean = false;
  @Prop() backButtonText: string;
  @Prop() backButtonIcon: string;
  @Prop() hidden: boolean = false;

  backButtonClick(ev: UIEvent) {
    ev.preventDefault();
    ev.stopPropagation();

    console.log('back button click');
  }

  protected ionViewDidLoad() {
    const buttons = this.el.querySelectorAll('ion-button');
    for (var i = 0; i < buttons.length; i++) {
      buttons[i].setAttribute('button-type', 'bar-button');
    }
  }

  hostData() {
    return {
      class: {
        'statusbar-padding': this.config.getBoolean('statusbarPadding')
      }
    };
  }

  protected render() {
    const backButtonIcon = this.backButtonIcon || this.config.get('backButtonText', 'Back');
    const backButtonText = this.backButtonText || this.config.get('backButtonIcon', 'Back');

    const backgroundCss = createThemedClasses(this.mode, this.color, 'toolbar-background');
    const contentCss = createThemedClasses(this.mode, this.color, 'toolbar-content');
    const backButtonCss = createThemedClasses(this.mode, this.color, 'back-button');
    const backButtonIconCss = createThemedClasses(this.mode, this.color, 'back-button-icon');
    const backButtonTextCss = createThemedClasses(this.mode, this.color, 'back-button-text');

    return [
      <div class={backgroundCss}></div>,
      <button onClick={this.backButtonClick.bind(this)} class={backButtonCss} hidden={this.hideBackButton}>
        { backButtonIcon
          ? <ion-icon class={backButtonIconCss} name={backButtonIcon}></ion-icon>
          : null
        }
        <span class={backButtonTextCss}>{backButtonText}</span>
      </button>,
      <slot name='start'></slot>,
      <slot name='mode-start'></slot>,
      <slot name='mode-end'></slot>,
      <slot name='end'></slot>,
      <div class={contentCss}>
        <slot></slot>
      </div>
    ];
  }
}
