#!/usr/bin/env node
import checkfile from '../extensions/checkfile';
import build from '../extensions/build';
import serve from '../extensions/serve';

const dev = () => {
    if (checkfile('examples')) {
        build();
        serve();
    }
}

export default dev;
