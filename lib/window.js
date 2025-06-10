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
import GObject from 'gi://GObject';
import Meta from 'gi://Meta';

// extension
import {Logger} from './logger.js';

export class WindowManager extends GObject.Object {
    static {
        GObject.registerClass(this);
    }

    constructor(ext) {
        super();
        Logger.debug('WindowManager');

        const settings = ext.getSettings('org.gnome.shell.extensions.vertical');
        // convert it to a float 0-1
        this.secondarySplit = settings.get_double('secondary-split');
    }

    enable() {
        Logger.debug('WindowManager:enable');
    }

    disable() {
        Logger.debug('WindowManager:disable');
    }

    place(where) {
        const focused = global.display.get_focus_window();
        Logger.debug('WindowManager:place focused=', focused);
        if (!focused) {
            return;
        }
        const workarea = focused.get_work_area_current_monitor();
        Logger.debug(
            'WindowManager:place workarea',
            workarea.x,
            workarea.y,
            workarea.width,
            workarea.height
        );
        if (!workarea) {
            return;
        }

        const height = workarea.height;
        const halfHeight = height / 2.0;
        const aHeight = height * this.secondarySplit;
        const bHeight = height * (1.0 - this.secondarySplit);
        Logger.debug(
            'WindowManager:place height',
            height,
            ', halfHeight',
            halfHeight,
            ', aHeight',
            aHeight,
            ', bHeight',
            bHeight
        );

        const frame = focused.get_frame_rect();
        Logger.debug(
            'WindowManager:place frame',
            frame.x,
            frame.y,
            frame.width,
            frame.height
        );

        // the default is 1/2 height
        let targetHeight = halfHeight;
        let targetYBottom = halfHeight;
        if (Math.abs(frame.height - halfHeight) < 1.0) {
            // We're already half-height, next is A
            targetHeight = aHeight;
            // and if we are going bottom that means B down
            targetYBottom = bHeight;
        } else if (Math.abs(frame.height - aHeight) < 1.0) {
            // We're already A height, next is B
            targetHeight = bHeight;
            // and if we are going bottom that means A down
            targetYBottom = aHeight;
        }
        Logger.debug(
            'WindowManager:place targetHeight',
            targetHeight,
            ', targetYBottom',
            targetYBottom
        );

        const placement = {
            height: targetHeight,
            width: workarea.width,
            x: workarea.x,
        };
        switch (where) {
            case 'top':
                // We need to exclude any unusable area up top (e.g. the bar)
                placement.y = workarea.y;
                // and we'll round down the top window if heights don't work out to a whole number
                placement.height = Math.floor(targetHeight);
                break;
            case 'bottom':
                // This time we skip over unusable area and the space we allocated to anything we put up top
                placement.y = workarea.y + Math.floor(targetYBottom);
                // and we'll round up the bottom window if heights aren't a whole number
                placement.height = Math.ceil(targetHeight);
                break;
        }

        // No matter what we don't want to be maximized vertically
        focused.unmaximize(Meta.MaximizeFlags.VERTICAL);
        // And we do want to be maximized horizontally
        focused.maximize(Meta.MaximizeFlags.HORIZONTAL);

        focused.move_frame(true, placement.x, placement.y);
        focused.move_resize_frame(
            true,
            placement.x,
            placement.y,
            placement.width,
            placement.height
        );
    }
}
