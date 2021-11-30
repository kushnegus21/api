/*
 * notion-enhancer core: components
 * (c) 2021 dragonwocky <thedragonring.bod@gmail.com> (https://dragonwocky.me/)
 * (c) 2021 CloudHill <rl.cloudhill@gmail.com> (https://github.com/CloudHill)
 * (https://notion-enhancer.github.io/) under the MIT license
 */

'use strict';

/**
 * shared notion-style elements
 * @module notion-enhancer/api/components/corner-action
 */

import { web } from '../../index.mjs';

web.loadStylesheet('api/client/components/corner-action.css');

const $cornerButtonsContainer = web.html`<div id="enhancer--corner-actions"></div>`;

/**
 * adds a button to notion's bottom right corner
 * @param {string} icon - an svg string
 * @param {function} listener - the function to call when the button is clicked
 * @returns {Element} the appended corner action element
 */
export const addCornerAction = async (icon, listener) => {
  await web.whenReady(['.notion-help-button']);
  const $helpButton = document.querySelector('.notion-help-button'),
    $onboardingButton = document.querySelector('.onboarding-checklist-button');
  if ($onboardingButton) $cornerButtonsContainer.prepend($onboardingButton);
  $cornerButtonsContainer.prepend($helpButton);
  web.render(
    document.querySelector('.notion-app-inner > .notion-cursor-listener'),
    $cornerButtonsContainer
  );

  const $actionButton = web.html`<div class="enhancer--corner-action-button">${icon}</div>`;
  $actionButton.addEventListener('click', listener);
  web.render($cornerButtonsContainer, $actionButton);

  return $actionButton;
};
