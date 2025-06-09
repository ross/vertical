/* extension.js
 *
 * This program is free software: you can redistribute it and/or modify
 * it under the terms of the GNU General Public License as published by
 * the Free Software Foundation, either version 2 of the License, or
 * (at your option) any later version.
 *
 * This program is distributed in the hope that it will be useful,
 * but WITHOUT ANY WARRANTY; without even the implied warranty of
 * MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
 * GNU General Public License for more details.
 *
 * You should have received a copy of the GNU General Public License
 * along with this program.  If not, see <http://www.gnu.org/licenses/>.
 *
 * SPDX-License-Identifier: GPL-2.0-or-later
 */

// Gnome imports
import {Extension} from 'resource:///org/gnome/shell/extensions/extension.js';

// extension
import {Logger} from './lib/logger.js';
import {Keybindings} from './lib/keybindings.js';
import {WindowManager} from './lib/window.js';

export default class VerticalExtension extends Extension {
    enable() {
        this.settings = this.getSettings();
        Logger.init(this.settings);
        Logger.info('enable');

        this.wm = new WindowManager(this);
        this.wm.enable();
        this.kb = new Keybindings(this, this.wm);
        this.kb.enable();
    }

    disable() {
        Logger.info('disable');

        this.kb?.disable();
        this.kb = null;
        this.wm?.disable();
        this.wm = null;
        this.settings = null;
    }
}
