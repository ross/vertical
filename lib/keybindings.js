/* keybindings.js
 *
 * This program is free software: you can redistribute it and/or modify
 * it under the terms of the GNU General Public License as published by
 * the Free Software Foundation, either version 3 of the License, or
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
 */

// Gnome imports
import GObject from "gi://GObject";
import Meta from "gi://Meta";
import Shell from "gi://Shell";

// Gnome Shell imports
import * as Main from "resource:///org/gnome/shell/ui/main.js";

// extension
import { Logger } from "./logger.js";

export class Keybindings extends GObject.Object {
    static {
        GObject.registerClass(this);
    }

    constructor(ext, wm) {
        super();
        Logger.debug("Keybindings");

        this.settings = ext.getSettings("org.gnome.shell.extensions.verticalhalf.keybindings");
        this.wm = wm;

        this._bindings = {
            "toggle-tiled-top": () => {
                Logger.debug("Keybindings:handler toggle-tiled-top");
                this.wm.place("top-half");
            },
            "toggle-tiled-bottom": () => {
                Logger.debug("Keybindings:handler toggle-tiled-bottom");
                this.wm.place("top-half");
            }
        };
    }

    enable() {
        Logger.debug("Keybindings:enable");
        let bindings = this._bindings;

        for (const key in bindings) {
            Logger.debug("Keybindings:enable", key);
            Main.wm.addKeybinding(
                key,
                this.settings,
                Meta.KeyBindingFlags.NONE,
                Shell.ActionMode.NORMAL,
                bindings[key],
            );
        }
    }

    disable() {
        Logger.debug("Keybindings:disable");
        let bindings = this._bindings;

        for (const key in bindings) {
            Logger.debug("Keybindings:disable", key);
            Main.wm.removeKeybinding(key);
        }
    }
}
