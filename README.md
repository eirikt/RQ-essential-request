## RQ-essentials-request

[![License](http://img.shields.io/badge/license-MIT-blue.svg?style=flat)](https://github.com/eirikt/RQ-essentials/blob/master/README.md#license)

Some ("essential") HTTP-focused add-ons for Douglas Crockford's excellent [RQ][1] library -
using [request][6], a simplified HTTP request client.

_This library is suited for Node.js only_.
Client-side usage is not recommended.
Also, using this library in a [Service Worker][8] or a [Web Worker][9] context is not compliant, and will fail. 
Instead use requestors wrapping e.g. the [Fetch API][7].


### [License](#license)
The MIT License (MIT)

Copyright (c) 2016 Eirik Torske

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
SOFTWARE.


[1]: https://github.com/douglascrockford/RQ
[2]: http://rq.crockford.com
[3]: https://github.com/eirikt/RQ
[4]: https://github.com/douglascrockford/RQ/pull/7#issuecomment-94266330
[5]: https://github.com/request/request
[6]: https://www.npmjs.com/package/request
[7]: https://developer.mozilla.org/en/docs/Web/API/Fetch_API
[8]: https://developer.mozilla.org/en-US/docs/Web/API/Service_Worker_API/Using_Service_Workers
[9]: https://developer.mozilla.org/en-US/docs/Web/API/Web_Workers_API/Using_web_workers
