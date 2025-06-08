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
import Meta from "gi://Meta";

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
        Logger.debug("WindowManager:enable");
    }

    disable() {
        Logger.debug("WindowManager:disable");
    }

    place(where) {
        let focused = global.display.get_focus_window()
        Logger.debug("WindowManager:place focused=", focused);
        if (!focused) {
            return
        }
        let workarea = focused.get_work_area_current_monitor();
        Logger.debug("WindowManager:place workarea", workarea);
        if (!workarea) {
            return
        }

        let halfHeight = workarea.height / 2.0;
        let placement = {
            height: halfHeight,
            width: workarea.width,
            x: workarea.x,
        };
        switch (where) {
            case "top-half":
                placement.y = workarea.y;
                break;
            case "bottom-half":
                placement.y = workarea.y + halfHeight;
                break;
        }

        focused.unmaximize(Meta.MaximizeFlags.HORIZONTAL);
        focused.unmaximize(Meta.MaximizeFlags.VERTICAL);
        focused.unmaximize(Meta.MaximizeFlags.BOTH);
        focused.move_frame(true, placement.x, placement.y);
        focused.move_resize_frame(true, placement.x, placement.y, placement.width, placement.height);
    }
}
