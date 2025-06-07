/* window.js
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

// extension
import { Logger } from "./logger.js";

export class WindowManager extends GObject.Object {
  static {
    GObject.registerClass(this);
  }

  constructor(ext) {
    super();
    Logger.debug("WindowManager");
  }

  enable() {
    Logger.debug(`WindowManager:enable`);
  }

  disable() {
    Logger.debug(`WindowManager:disable`);
  }
}
