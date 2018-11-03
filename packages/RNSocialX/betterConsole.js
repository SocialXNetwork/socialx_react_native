if (console && console.log && console.group) {
    const oldConsole = Object.assign({}, console);
    const oldLog = oldConsole.log;

    const pad = (string) => {
        while (string.length < 8) {
            string += ' ';
        }
        return string;
    }

    const empt = (name) => {
        oldLog(pad(name) + ' %cEmpty/Null/Undefined', 'color:grey');
    }

    const styleLog = 'background:#673AB7;color:white;border-radius:99px;padding:0px 6px;';

    const expandObject = (obj) => {
        Object.entries(obj).map(([key, value]) => {
            if (typeof value === 'object') {
                if (value === null) {
                    oldLog(pad(key), value);
                    return;
                }
                console.groupCollapsed(`%c${key}`, styleLog);
                oldLog(value)
                console.groupEnd();
            } else if (typeof value === 'function') {
                console.groupCollapsed(`%c${key}();`, styleLog);
                oldLog(value)
                console.groupEnd();
            } else {
                oldLog(pad(key), value);
            }
        });
    }

    const pif = (...args) => {
        let name = '';
        if (args.length === 1) {
            oldLog(pad(args[0]));
            return;
        }
        if (typeof args[0] === 'string') {
            if (args.length === 1) {
                empt(args[0]);
                return;
            }
            name = args[0];
            args.splice(0, 1);
            console.groupCollapsed('%c' + name, styleLog);
            args.map((arg) => {
                if (typeof arg === 'object') {
                    expandObject(arg);
                } else {
                    oldLog(pad(typeof arg), arg);
                }
            });
            console.groupEnd();
        } else {
            console.groupCollapsed('%cLogger', styleLog);
            args.map((arg) => {
                if (typeof arg === 'object') {
                    expandObject(arg);
                } else {
                    oldLog(pad(typeof arg), arg);
                }
            })
            console.groupEnd();
            // oldLog(args);
        }
    };

    console.log = pif;
}