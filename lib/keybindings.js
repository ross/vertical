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

    this.settings = ext.getSettings("org.gnome.shell.extensions.vertical_half.keybindings");
    this.wm = wm;

    this.buildBindingDefinitions();
  }

  enable() {
    let keybindings = this._bindings;

    for (const key in keybindings) {
      Main.wm.addKeybinding(
        key,
        this.settings,
        Meta.KeyBindingFlags.NONE,
        Shell.ActionMode.NORMAL,
        keybindings[key]
      );
    }

    Logger.debug(`Keybindings:enable`);
  }

  disable() {
    let keybindings = this._bindings;

    for (const key in keybindings) {
      Main.wm.removeKeybinding(key);
    }

    Logger.debug(`Keybindings:disable`);
  }

  buildBindingDefinitions() {
    this._bindings = {
      "toggle-tiled-top": () => {
        this.wm.command({
            name: "Tile",
            direction: "Top",
        });
      },
      "toggle-tiled-bottom": () => {
        this.wm.command({
            name: "Tile",
            direction: "Bottom",
        });
      },
    };
  }
}
