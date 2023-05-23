import {
  JupyterFrontEnd,
  JupyterFrontEndPlugin
} from '@jupyterlab/application';

import { IThemeManager } from '@jupyterlab/apputils';

import { ISettingRegistry } from '@jupyterlab/settingregistry';

/**
 * Initialization data for the grundkurs_theme extension.
 */
const plugin: JupyterFrontEndPlugin<void> = {
  id: 'grundkurs_theme:plugin',
  description: 'A JupyterLab extension.',
  autoStart: true,
  requires: [IThemeManager],
  optional: [ISettingRegistry],
  activate: (app: JupyterFrontEnd, manager: IThemeManager, settingRegistry: ISettingRegistry | null) => {
    console.log('JupyterLab extension grundkurs_theme is activated!');
    const style = 'grundkurs_theme/index.css';

    manager.register({
      name: 'grundkurs_theme',
      isLight: true,
      load: () => manager.loadCSS(style),
      unload: () => Promise.resolve(undefined)
    });

    if (settingRegistry) {
      settingRegistry
        .load(plugin.id)
        .then(settings => {
          console.log('grundkurs_theme settings loaded:', settings.composite);
        })
        .catch(reason => {
          console.error('Failed to load settings for grundkurs_theme.', reason);
        });
    }
  }
};

export default plugin;
