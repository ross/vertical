/* logging.js
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
 *
 * Potentially useful env vars:
 * export G_MESSAGES_DEBUG=all
 * export MUTTER_DEBUG_DUMMY_MODE_SPECS=1366x768
 * export SHELL_DEBUG=all
 */

// Based on https://github.com/forge-ext/forge/blob/main/lib/shared/logger.js
export class Logger {
    static #settings;

    static LOG_LEVELS = {
        OFF: 0,
        FATAL: 1,
        ERROR: 2,
        WARN: 3,
        INFO: 4,
        DEBUG: 5,
        TRACE: 6,
        ALL: 7,
    };

    static init(settings) {
        this.#settings = settings;
    }

    static get #level() {
        // TODO: remove
        return Logger.LOG_LEVELS.ALL;
        /*
    if (this.#settings?.get_boolean?.("logging-enabled")) {
      return this.#settings?.get_uint?.("log-level") ?? Logger.LOG_LEVELS.OFF;
    }
    return Logger.LOG_LEVELS.OFF;
    */
    }

    static format(msg, ...params) {
        return params.reduce((acc, val) => acc.replace('{}', val), msg);
    }

    static fatal(...args) {
        if (this.#level > Logger.LOG_LEVELS.OFF)
            log(`[vertical-half] [FATAL]`, ...args);
    }

    static error(...args) {
        if (this.#level > Logger.LOG_LEVELS.FATAL)
            log(`[vertical-half] [ERROR]`, ...args);
    }

    static warn(...args) {
        if (this.#level > Logger.LOG_LEVELS.ERROR)
            log(`[vertical-half] [WARN]`, ...args);
    }

    static info(...args) {
        if (this.#level > Logger.LOG_LEVELS.WARN)
            log(`[vertical-half] [INFO]`, ...args);
    }

    static debug(...args) {
        if (this.#level > Logger.LOG_LEVELS.INFO)
            log(`[vertical-half] [DEBUG]`, ...args);
    }

    static trace(...args) {
        if (this.#level > Logger.LOG_LEVELS.DEBUG)
            log(`[vertical-half] [TRACE]`, ...args);
    }

    static log(...args) {
        if (this.#level > Logger.LOG_LEVELS.OFF)
            log(`[vertical-half] [LOG]`, ...args);
    }
}
